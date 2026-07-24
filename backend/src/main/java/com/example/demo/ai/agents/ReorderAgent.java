package com.example.demo.ai.agents;

import com.example.demo.assistant.model.ConversationSession;
import com.example.demo.assistant.service.SessionManager;
import com.example.demo.ai.prompts.SystemPrompts;
import com.example.demo.model.Inventory;
import com.example.demo.model.PurchaseOrder;
import com.example.demo.service.InventoryService;
import com.example.demo.service.PurchaseOrderService;
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
public class ReorderAgent implements AIAgent {

    private static final Logger log = LoggerFactory.getLogger(ReorderAgent.class);

    private static final List<String> KEYWORDS = Arrays.asList(
            "reorder", "restock", "purchase order", "buy more", "minimum stock"
    );

    private final ChatLanguageModel chatLanguageModel;
    private final SessionManager sessionManager;
    private final InventoryService inventoryService;
    private final PurchaseOrderService purchaseOrderService;

    public ReorderAgent(ChatLanguageModel chatLanguageModel,
                        SessionManager sessionManager,
                        InventoryService inventoryService,
                        PurchaseOrderService purchaseOrderService) {
        this.chatLanguageModel = chatLanguageModel;
        this.sessionManager = sessionManager;
        this.inventoryService = inventoryService;
        this.purchaseOrderService = purchaseOrderService;
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
        log.info("ReorderAgent selected -> Querying InventoryService & PurchaseOrderService [sessionId: {}]", sessionId);

        long dbStartTime = System.currentTimeMillis();
        List<Inventory> lowStockItems = new ArrayList<>();
        List<PurchaseOrder> activeOrders = new ArrayList<>();

        try {
            lowStockItems = inventoryService.getLowStockItems(15);
        } catch (Exception e) {
            log.error("Failed to retrieve low stock items for reordering: {}", e.getMessage());
        }

        try {
            activeOrders = purchaseOrderService.getAllPurchaseOrders();
        } catch (Exception e) {
            log.error("Failed to retrieve purchase orders for reordering: {}", e.getMessage());
        }

        long dbExecutionTime = System.currentTimeMillis() - dbStartTime;
        log.info("Reorder database query completed -> Found {} low stock item(s) and {} active purchase order(s) in {} ms",
                lowStockItems.size(), activeOrders.size(), dbExecutionTime);

        // Format structured context
        StringBuilder contextBuilder = new StringBuilder("Real-Time Reorder & Replenishment Database Context:\n");

        if (lowStockItems.isEmpty()) {
            contextBuilder.append("- Stock Status: All items currently above safety threshold.\n");
        } else {
            contextBuilder.append("- Low Stock Items Needing Reorder:\n");
            for (Inventory item : lowStockItems) {
                int suggestedReorderQty = Math.max(20, 50 - item.getAvailableStock());
                contextBuilder.append(String.format("  * SKU: %s | Store: %s | Current Stock: %d | Suggested Reorder Qty: %d | Priority: HIGH%n",
                        item.getSku(), item.getStoreId(), item.getAvailableStock(), suggestedReorderQty));
            }
        }

        if (!activeOrders.isEmpty()) {
            contextBuilder.append("- Active Purchase Orders in Pipeline:\n");
            for (PurchaseOrder po : activeOrders) {
                contextBuilder.append(String.format("  * PO#: %s | SKU: %s | Qty: %d | Status: %s | Supplier: %s%n",
                        po.getPurchaseOrderNo(), po.getSku(), po.getQuantity(), po.getStatus(), po.getSupplierCode()));
            }
        }

        ConversationSession session = sessionManager.getOrCreateSession(sessionId);

        List<ChatMessage> promptMessages = new ArrayList<>();
        promptMessages.add(SystemMessage.from(SystemPrompts.REORDER_PROMPT));

        synchronized (session.getMessages()) {
            for (com.example.demo.assistant.model.ChatMessage msg : session.getMessages()) {
                if ("user".equalsIgnoreCase(msg.getRole())) {
                    promptMessages.add(UserMessage.from(msg.getContent()));
                } else if ("assistant".equalsIgnoreCase(msg.getRole())) {
                    promptMessages.add(AiMessage.from(msg.getContent()));
                }
            }
        }

        String fullUserPrompt = contextBuilder.toString() + "\nUser Query: " + message;
        promptMessages.add(UserMessage.from(fullUserPrompt));

        long llmStartTime = System.currentTimeMillis();
        Response<AiMessage> response = chatLanguageModel.generate(promptMessages);
        String aiResponseText = response.content().text();
        long llmExecutionTime = System.currentTimeMillis() - llmStartTime;

        long totalTime = System.currentTimeMillis() - startTime;
        log.info("ReorderAgent completed -> Total Time: {} ms (DB: {} ms, LLM: {} ms) | Reorder Candidates: {}",
                totalTime, dbExecutionTime, llmExecutionTime, lowStockItems.size());

        sessionManager.saveMessage(sessionId, "user", message);
        sessionManager.saveMessage(sessionId, "assistant", aiResponseText);

        return aiResponseText;
    }
}
