package com.example.demo.ai.rule;

import com.example.demo.model.product;
import com.example.demo.repository.productRepository;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.stereotype.Component;

import java.util.HashMap;
import java.util.List;
import java.util.Map;

@Component
public class IntentRouter {

    private static final Logger log = LoggerFactory.getLogger(IntentRouter.class);

    private final IntentDetector intentDetector;
    private final ChatContextMemory contextMemory;
    private final productRepository productRepo;
    private final Map<IntentType, IntentHandler> handlerMap = new HashMap<>();

    public IntentRouter(IntentDetector intentDetector,
                        ChatContextMemory contextMemory,
                        productRepository productRepo,
                        List<IntentHandler> handlers) {
        this.intentDetector = intentDetector;
        this.contextMemory = contextMemory;
        this.productRepo = productRepo;
        for (IntentHandler handler : handlers) {
            this.handlerMap.put(handler.getIntentType(), handler);
        }
    }

    public String routeAndExecute(String userMessage, String sessionId) {
        long startTime = System.currentTimeMillis();

        List<product> products;
        long dbStartTime = System.currentTimeMillis();
        try {
            products = productRepo.findAll();
        } catch (Exception e) {
            log.error("Failed fetching products for AI rule engine: {}", e.getMessage());
            products = List.of();
        }
        long dbQueryTime = System.currentTimeMillis() - dbStartTime;

        ChatContextMemory.SessionState sessionState = contextMemory.getSession(sessionId);

        IntentConfidence confidenceResult = intentDetector.detectIntentWithConfidence(userMessage, products, sessionState);
        IntentType detectedIntent = confidenceResult.getIntentType();
        double confidenceScore = confidenceResult.getScore();

        log.info("Rule Engine Execution Metrics -> Intent Detected: [{}], Confidence: [{}] Query: '{}', DB Query Time: {}ms",
                detectedIntent, String.format("%.2f", confidenceScore), userMessage, dbQueryTime);

        // Update session context memory for follow-up resolution
        contextMemory.updateSession(sessionId, detectedIntent, products, userMessage);

        IntentHandler handler = handlerMap.get(detectedIntent);
        if (handler == null) {
            handler = handlerMap.get(IntentType.UNKNOWN);
        }

        String result = handler.handle(userMessage, products);

        long totalExecutionTime = System.currentTimeMillis() - startTime;
        log.info("Rule Engine Completed -> Intent: [{}], Handler: [{}], Total Execution Time: {}ms",
                detectedIntent, handler.getClass().getSimpleName(), totalExecutionTime);

        return result;
    }
}
