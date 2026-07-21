package com.example.demo.ai.rule;

import com.example.demo.model.product;

import java.util.List;

public interface IntentHandler {

    IntentType getIntentType();

    String handle(String userMessage, List<product> products);
}
