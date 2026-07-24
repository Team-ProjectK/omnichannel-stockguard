package com.example.demo.ai.agents;

import com.example.demo.assistant.model.ConversationSession;
import com.example.demo.assistant.service.SessionManager;
import com.example.demo.ai.prompts.SystemPrompts;
import com.example.demo.model.Inventory;
import com.example.demo.service.InventoryService;
import dev.langchain4j.data.message.AiMessage;
import dev.langchain4j.data.message.ChatMessage;
import dev.langchain4j.data.message.SystemMessage;
import dev.langchain4j.data.message.UserMessage;
import dev.langchain4j.model.chat.ChatLanguageModel;
import dev.langchain4j.model.output.Response;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.stereotype.Component;

import java.util.ArrayList;
import java.util.Arrays;
import java.util.List;

@Component
public class InventoryAgent implements AIAgent {

    private static final Logger log = LoggerFactory.getLogger(InventoryAgent.class);

    private static final List<String> KEYWORDS = Arrays.asList(
            "inventory", "stock", "warehouse", "low stock", "out of stock", "quantity"
    );

    private final ChatLanguageModel chatLanguageModel;
    private final SessionManager sessionManager;
    private final InventoryService inventoryService;

    public InventoryAgent(ChatLanguageModel chatLanguageModel,
                          SessionManager sessionManager,
                          InventoryService inventoryService) {
        this.chatLanguageModel = chatLanguageModel;
        this.sessionManager = sessionManager;
        this.inventoryService = inventoryService;
    }

    @Override
    public boolean supports(String message) {
        if (message == null || message.trim().isEmpty()) {
            return false;
        }
        String lower = message.toLowerCase();
        return KEYWORDS.stream().anyMatch(lower::contains);
    }

    @Override
    public String process(String sessionId, String message) {
        long startTime = System.currentTimeMillis();
        log.info("InventoryAgent selected -> Querying InventoryService [sessionId: {}]", sessionId);

        // Fetch real database records from InventoryService
        long dbStartTime = System.currentTimeMillis();
        List<Inventory> inventoryList;
        try {
            if (message.toLowerCase().contains("low stock") || message.toLowerCase().contains("out of stock")) {
                inventoryList = inventoryService.getLowStockItems(10);
            } else {
                inventoryList = inventoryService.getAllInventory();
            }
        } catch (Exception e) {
            log.error("Failed to retrieve inventory records from InventoryService: {}", e.getMessage());
            inventoryList = new ArrayList<>();
        }
        long dbExecutionTime = System.currentTimeMillis() - dbStartTime;
        log.info("InventoryService returned {} record(s) in {} ms", inventoryList.size(), dbExecutionTime);

        // Format structured context
        StringBuilder contextBuilder = new StringBuilder("Real-Time Inventory Database Context:\n");
        if (inventoryList.isEmpty()) {
            contextBuilder.append("[No inventory records found in the database.]\n");
        } else {
            for (Inventory item : inventoryList) {
                contextBuilder.append(String.format("- SKU: %s | Store: %s | Available Stock: %d | Reserved Stock: %d | Damaged Stock: %d%n",
                        item.getSku(), item.getStoreId(), item.getAvailableStock(), item.getReservedStock(), item.getDamagedStock()));
            }
        }

        ConversationSession session = sessionManager.getOrCreateSession(sessionId);

        List<ChatMessage> promptMessages = new ArrayList<>();
        promptMessages.add(SystemMessage.from(SystemPrompts.INVENTORY_PROMPT));

        synchronized (session.getMessages()) {
            for (com.example.demo.assistant.model.ChatMessage msg : session.getMessages()) {
                if ("user".equalsIgnoreCase(msg.getRole())) {
                    promptMessages.add(UserMessage.from(msg.getContent()));
                } else if ("assistant".equalsIgnoreCase(msg.getRole())) {
                    promptMessages.add(AiMessage.from(msg.getContent()));
                }
            }
        }

        // Add structured context alongside current user prompt
        String fullUserPrompt = contextBuilder.toString() + "\nUser Query: " + message;
        promptMessages.add(UserMessage.from(fullUserPrompt));

        long llmStartTime = System.currentTimeMillis();
        Response<AiMessage> response = chatLanguageModel.generate(promptMessages);
        String aiResponseText = response.content().text();
        long llmExecutionTime = System.currentTimeMillis() - llmStartTime;

        long totalTime = System.currentTimeMillis() - startTime;
        log.info("InventoryAgent completed -> Total Time: {} ms (DB: {} ms, LLM: {} ms) | Records Retrieved: {}",
                totalTime, dbExecutionTime, llmExecutionTime, inventoryList.size());

        sessionManager.saveMessage(sessionId, "user", message);
        sessionManager.saveMessage(sessionId, "assistant", aiResponseText);

        return aiResponseText;
    }
}
