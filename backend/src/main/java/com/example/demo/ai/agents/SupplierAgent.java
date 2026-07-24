package com.example.demo.ai.agents;

import com.example.demo.assistant.model.ConversationSession;
import com.example.demo.assistant.service.SessionManager;
import com.example.demo.ai.prompts.SystemPrompts;
import com.example.demo.model.Supplier;
import com.example.demo.service.SupplierService;
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
public class SupplierAgent implements AIAgent {

    private static final Logger log = LoggerFactory.getLogger(SupplierAgent.class);

    private static final List<String> KEYWORDS = Arrays.asList(
            "supplier", "vendor", "manufacturer", "delivery", "purchase supplier"
    );

    private final ChatLanguageModel chatLanguageModel;
    private final SessionManager sessionManager;
    private final SupplierService supplierService;

    public SupplierAgent(ChatLanguageModel chatLanguageModel,
                         SessionManager sessionManager,
                         SupplierService supplierService) {
        this.chatLanguageModel = chatLanguageModel;
        this.sessionManager = sessionManager;
        this.supplierService = supplierService;
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
        log.info("SupplierAgent selected -> Querying SupplierService [sessionId: {}]", sessionId);

        long dbStartTime = System.currentTimeMillis();
        List<Supplier> supplierList;
        try {
            supplierList = supplierService.getAllSuppliers();
        } catch (Exception e) {
            log.error("Failed to retrieve supplier records from SupplierService: {}", e.getMessage());
            supplierList = new ArrayList<>();
        }
        long dbExecutionTime = System.currentTimeMillis() - dbStartTime;
        log.info("SupplierService returned {} record(s) in {} ms", supplierList.size(), dbExecutionTime);

        String context = buildContext(supplierList);
        ConversationSession session = sessionManager.getOrCreateSession(sessionId);
        List<ChatMessage> promptMessages = buildPromptMessages(session, context, message);

        long llmStartTime = System.currentTimeMillis();
        Response<AiMessage> response = chatLanguageModel.generate(promptMessages);
        String aiResponseText = response.content().text();
        long llmExecutionTime = System.currentTimeMillis() - llmStartTime;

        long totalTime = System.currentTimeMillis() - startTime;
        log.info("SupplierAgent completed -> Total Time: {} ms (DB: {} ms, LLM: {} ms) | Records Retrieved: {}",
                totalTime, dbExecutionTime, llmExecutionTime, supplierList.size());

        sessionManager.saveMessage(sessionId, "user", message);
        sessionManager.saveMessage(sessionId, "assistant", aiResponseText);

        return aiResponseText;
    }

    private String buildContext(List<Supplier> supplierList) {
        StringBuilder contextBuilder = new StringBuilder("Real-Time Supplier & Vendor Database Context:\n");
        if (supplierList.isEmpty()) {
            contextBuilder.append("[No supplier records found in the database.]\n");
        } else {
            for (Supplier s : supplierList) {
                contextBuilder.append(String.format("- Supplier Code: %s | Supplier Name: %s | Contact: %s | Email: %s | Phone: %s | City: %s | Status: %s%n",
                        s.getSupplierCode(), s.getSupplierName(),
                        s.getContactPerson() != null ? s.getContactPerson() : "N/A",
                        s.getEmail() != null ? s.getEmail() : "N/A",
                        s.getPhone() != null ? s.getPhone() : "N/A",
                        s.getCity() != null ? s.getCity() : "N/A",
                        s.getStatus() != null ? s.getStatus() : "ACTIVE"));
            }
        }
        return contextBuilder.toString();
    }

    private List<ChatMessage> buildPromptMessages(ConversationSession session, String context, String message) {
        List<ChatMessage> promptMessages = new ArrayList<>();
        promptMessages.add(SystemMessage.from(SystemPrompts.SUPPLIER_PROMPT));

        synchronized (session.getMessages()) {
            for (com.example.demo.assistant.model.ChatMessage msg : session.getMessages()) {
                if ("user".equalsIgnoreCase(msg.getRole())) {
                    promptMessages.add(UserMessage.from(msg.getContent()));
                } else if ("assistant".equalsIgnoreCase(msg.getRole())) {
                    promptMessages.add(AiMessage.from(msg.getContent()));
                }
            }
        }

        String fullUserPrompt = context + "\nUser Query: " + message;
        promptMessages.add(UserMessage.from(fullUserPrompt));
        return promptMessages;
    }
}
