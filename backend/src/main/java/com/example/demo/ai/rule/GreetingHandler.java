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
        return "Hello 👋\n\n" +
                "Welcome to StockGuard AI Assistant.\n\n" +
                "I can help you with:\n\n" +
                "• Current Inventory\n" +
                "• Low Stock Alerts\n" +
                "• Product Availability\n" +
                "• Pricing\n" +
                "• Reorder Suggestions\n" +
                "• Inventory Analytics\n" +
                "• Stock Health Reports\n\n" +
                "How can I help you today?";
    }
}
