package com.example.demo.ai.agents;

import com.example.demo.assistant.model.ConversationSession;
import com.example.demo.assistant.service.SessionManager;
import com.example.demo.ai.prompts.SystemPrompts;
import com.example.demo.model.Inventory;
import com.example.demo.model.SalesOrder;
import com.example.demo.model.product;
import com.example.demo.service.InventoryService;
import com.example.demo.service.SalesOrderService;
import com.example.demo.service.productService;
import dev.langchain4j.data.message.AiMessage;
import dev.langchain4j.data.message.ChatMessage;
import dev.langchain4j.data.message.SystemMessage;
import dev.langchain4j.data.message.UserMessage;
import dev.langchain4j.model.chat.ChatLanguageModel;
import dev.langchain4j.model.output.Response;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.stereotype.Component;

import java.math.BigDecimal;
import java.util.ArrayList;
import java.util.Arrays;
import java.util.List;
import java.util.Objects;

@Component
public class AnalyticsAgent implements AIAgent {

    private static final Logger log = LoggerFactory.getLogger(AnalyticsAgent.class);

    private static final List<String> KEYWORDS = Arrays.asList(
            "sales", "analytics", "dashboard", "profit", "revenue", "graph", "chart", "report", "health", "metrics", "summary", "insight", "overstock"
    );

    private final ChatLanguageModel chatLanguageModel;
    private final SessionManager sessionManager;
    private final SalesOrderService salesOrderService;
    private final productService productService;
    private final InventoryService inventoryService;

    public AnalyticsAgent(ChatLanguageModel chatLanguageModel,
                          SessionManager sessionManager,
                          SalesOrderService salesOrderService,
                          productService productService,
                          InventoryService inventoryService) {
        this.chatLanguageModel = chatLanguageModel;
        this.sessionManager = sessionManager;
        this.salesOrderService = salesOrderService;
        this.productService = productService;
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

    private String getHealthStatusLabel(int score) {
        if (score > 80) {
            return "Optimal";
        }
        if (score > 60) {
            return "Moderate Risk";
        }
        return "Critical Attention Required";
    }

    @Override
    public String process(String sessionId, String message) {
        long startTime = System.currentTimeMillis();
        log.info("AnalyticsAgent selected -> Querying SalesOrderService, productService, and InventoryService [sessionId: {}]", sessionId);

        long dbStartTime = System.currentTimeMillis();
        List<SalesOrder> salesOrders = new ArrayList<>();
        List<product> products = new ArrayList<>();
        List<Inventory> lowStockItems = new ArrayList<>();
        List<Inventory> allInventory = new ArrayList<>();

        try {
            salesOrders = salesOrderService.getAllSalesOrders();
        } catch (Exception e) {
            log.error("Failed fetching sales orders for analytics: {}", e.getMessage());
        }

        try {
            products = productService.getAllProducts();
        } catch (Exception e) {
            log.error("Failed fetching products for analytics: {}", e.getMessage());
        }

        try {
            lowStockItems = inventoryService.getLowStockItems(10);
            allInventory = inventoryService.getAllInventory();
        } catch (Exception e) {
            log.error("Failed fetching inventory for analytics: {}", e.getMessage());
        }

        long dbExecutionTime = System.currentTimeMillis() - dbStartTime;

        // Calculate aggregated metrics & Inventory Health Score
        BigDecimal totalRevenue = salesOrders.stream()
                .map(SalesOrder::getTotalAmount)
                .filter(Objects::nonNull)
                .reduce(BigDecimal.ZERO, BigDecimal::add);

        int totalSalesCount = salesOrders.size();
        int totalCatalogProducts = products.size();
        int lowStockAlertCount = lowStockItems.size();

        long overstockCount = allInventory.stream()
                .filter(i -> i.getAvailableStock() != null && i.getAvailableStock() > 50)
                .count();

        long outOfStockCount = allInventory.stream()
                .filter(i -> i.getAvailableStock() != null && i.getAvailableStock() == 0)
                .count();

        // Calculate Inventory Health Score (0 to 100)
        int healthDeduction = (int) ((lowStockAlertCount * 5) + (outOfStockCount * 10) + (overstockCount * 3));
        int inventoryHealthScore = Math.max(0, Math.min(100, 100 - healthDeduction));

        log.info("Analytics aggregated metrics -> Health Score: {}, Revenue: {}, Sales Count: {}, Catalog Products: {}, Low Stock: {}, Overstock: {} (DB Time: {} ms)",
                inventoryHealthScore, totalRevenue, totalSalesCount, totalCatalogProducts, lowStockAlertCount, overstockCount, dbExecutionTime);

        // Format structured context with platform-independent line separators
        StringBuilder contextBuilder = new StringBuilder("Real-Time Business Analytics & Executive Dashboard Context:%n".formatted());
        contextBuilder.append(String.format("- Calculated Inventory Health Score: %d/100 (%s)%n",
                inventoryHealthScore, getHealthStatusLabel(inventoryHealthScore)));
        contextBuilder.append(String.format("- Total Sales Revenue: ₹%s%n", totalRevenue.toPlainString()));
        contextBuilder.append(String.format("- Total Sales Orders Executed: %d%n", totalSalesCount));
        contextBuilder.append(String.format("- Total Product Catalog SKUs: %d%n", totalCatalogProducts));
        contextBuilder.append(String.format("- Active Low Stock Items: %d%n", lowStockAlertCount));
        contextBuilder.append(String.format("- Critical Out of Stock Items: %d%n", outOfStockCount));
        contextBuilder.append(String.format("- Overstock Items (Stock > 50 units): %d%n", overstockCount));

        if (!lowStockItems.isEmpty()) {
            contextBuilder.append("  Low Stock Items Requiring Immediate Attention:%n".formatted());
            for (Inventory item : lowStockItems) {
                contextBuilder.append(String.format("  * SKU: %s (Available: %d)%n", item.getSku(), item.getAvailableStock()));
            }
        }

        ConversationSession session = sessionManager.getOrCreateSession(sessionId);

        List<ChatMessage> promptMessages = new ArrayList<>();
        promptMessages.add(SystemMessage.from(SystemPrompts.ANALYTICS_PROMPT));

        synchronized (session.getMessages()) {
            for (com.example.demo.assistant.model.ChatMessage msg : session.getMessages()) {
                if ("user".equalsIgnoreCase(msg.getRole())) {
                    promptMessages.add(UserMessage.from(msg.getContent()));
                } else if ("assistant".equalsIgnoreCase(msg.getRole())) {
                    promptMessages.add(AiMessage.from(msg.getContent()));
                }
            }
        }

        String fullUserPrompt = contextBuilder.toString() + System.lineSeparator() + "User Query: " + message;
        promptMessages.add(UserMessage.from(fullUserPrompt));

        long llmStartTime = System.currentTimeMillis();
        Response<AiMessage> response = chatLanguageModel.generate(promptMessages);
        String aiResponseText = response.content().text();
        long llmExecutionTime = System.currentTimeMillis() - llmStartTime;

        long totalTime = System.currentTimeMillis() - startTime;
        log.info("AnalyticsAgent completed -> Total Time: {} ms (DB: {} ms, LLM: {} ms) | Orders Analyzed: {}",
                totalTime, dbExecutionTime, llmExecutionTime, totalSalesCount);

        sessionManager.saveMessage(sessionId, "user", message);
        sessionManager.saveMessage(sessionId, "assistant", aiResponseText);

        return aiResponseText;
    }
}
