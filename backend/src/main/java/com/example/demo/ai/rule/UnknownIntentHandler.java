package com.example.demo.ai.rule;

import com.example.demo.model.product;
import org.springframework.stereotype.Component;

import java.util.List;

@Component
public class UnknownIntentHandler implements IntentHandler {

    private final EnterpriseResponseBuilder responseBuilder;

    public UnknownIntentHandler(EnterpriseResponseBuilder responseBuilder) {
        this.responseBuilder = responseBuilder;
    }

    @Override
    public IntentType getIntentType() {
        return IntentType.UNKNOWN;
    }

    @Override
    public String handle(String userMessage, List<product> products) {
        String body = """
                I couldn't understand your request.

                Try asking questions like:

                • Show inventory
                • Current stock
                • Product price
                • Low stock
                • Inventory statistics
                • Reorder recommendations
                • Inventory health""";

        return responseBuilder.buildResponse("StockGuard Assistant Guidance",
                null, body, null);
    }
}
