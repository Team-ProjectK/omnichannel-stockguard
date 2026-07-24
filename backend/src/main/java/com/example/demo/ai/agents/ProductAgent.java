package com.example.demo.ai.agents;

import com.example.demo.assistant.model.ConversationSession;
import com.example.demo.assistant.service.SessionManager;
import com.example.demo.ai.prompts.SystemPrompts;
import com.example.demo.model.Product;
import com.example.demo.service.ProductService;
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
public class ProductAgent implements AIAgent {

    private static final Logger log = LoggerFactory.getLogger(ProductAgent.class);

    private static final List<String> KEYWORDS = Arrays.asList(
            "product", "item", "laptop", "phone", "category", "search product"
    );

    private final ChatLanguageModel chatLanguageModel;
    private final SessionManager sessionManager;
    private final ProductService productService;

    public ProductAgent(ChatLanguageModel chatLanguageModel,
                        SessionManager sessionManager,
                        ProductService productService) {
        this.chatLanguageModel = chatLanguageModel;
        this.sessionManager = sessionManager;
        this.productService = productService;
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
        log.info("ProductAgent selected -> Querying ProductService [sessionId: {}]", sessionId);

        long dbStartTime = System.currentTimeMillis();
        List<Product> productList;
        try {
            productList = productService.getAllProducts();
        } catch (Exception e) {
            log.error("Failed to retrieve product records from ProductService: {}", e.getMessage());
            productList = new ArrayList<>();
        }
        long dbExecutionTime = System.currentTimeMillis() - dbStartTime;
        log.info("ProductService returned {} record(s) in {} ms", productList.size(), dbExecutionTime);

        // Format structured context
        StringBuilder contextBuilder = new StringBuilder("Real-Time Product Catalog Database Context:\n");
        if (productList.isEmpty()) {
            contextBuilder.append("[No product catalog records found in the database.]\n");
        } else {
            for (Product p : productList) {
                contextBuilder.append(String.format("- SKU: %s | Product Name: %s | Store: %s | Current Price: %s | Base Price: %s | Current Stock: %d | Reorder Threshold: %d%n",
                        p.getSku(), p.getProductName(), p.getStoreId(),
                        p.getCurrentPrice() != null ? p.getCurrentPrice().toString() : "N/A",
                        p.getBasePrice() != null ? p.getBasePrice().toString() : "N/A",
                        p.getStock(), p.getReorderThreshold()));
            }
        }

        ConversationSession session = sessionManager.getOrCreateSession(sessionId);

        List<ChatMessage> promptMessages = new ArrayList<>();
        promptMessages.add(SystemMessage.from(SystemPrompts.PRODUCT_PROMPT));

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
        log.info("ProductAgent completed -> Total Time: {} ms (DB: {} ms, LLM: {} ms) | Records Retrieved: {}",
                totalTime, dbExecutionTime, llmExecutionTime, productList.size());

        sessionManager.saveMessage(sessionId, "user", message);
        sessionManager.saveMessage(sessionId, "assistant", aiResponseText);

        return aiResponseText;
    }
}
