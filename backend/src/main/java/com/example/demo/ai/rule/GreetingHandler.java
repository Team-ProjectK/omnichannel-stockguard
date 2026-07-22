package com.example.demo.ai.rule;

import com.example.demo.model.product;
import org.springframework.stereotype.Component;

import java.util.List;

@Component
public class GreetingHandler implements IntentHandler {

    @Override
    public IntentType getIntentType() {
        return IntentType.GREETING;
    }

    @Override
    public String handle(String userMessage, List<product> products) {
        return """
                Hello 👋

                Welcome to StockGuard AI Assistant.

                I can help you with:

                • Current Inventory
                • Low Stock Alerts
                • Product Availability
                • Pricing
                • Reorder Suggestions
                • Inventory Analytics
                • Stock Health Reports

                How can I help you today?""";
    }
}
