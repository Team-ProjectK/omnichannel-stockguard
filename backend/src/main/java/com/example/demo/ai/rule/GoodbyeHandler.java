package com.example.demo.ai.rule;

import com.example.demo.model.product;
import org.springframework.stereotype.Component;

import java.util.List;

@Component
public class GoodbyeHandler implements IntentHandler {

    @Override
    public IntentType getIntentType() {
        return IntentType.GOODBYE;
    }

    @Override
    public String handle(String userMessage, List<product> products) {
        return """
                Goodbye! 👋

                Thank you for using StockGuard AI Assistant.

                Have a wonderful day!

                Feel free to return anytime for inventory insights, analytics, pricing recommendations, or stock monitoring.""";
    }
}
