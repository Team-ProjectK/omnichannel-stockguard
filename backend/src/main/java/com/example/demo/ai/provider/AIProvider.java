package com.example.demo.ai.provider;

public interface AIProvider {
    /**
     * Generates completion from AI model given system context and user prompt.
     * @param systemPrompt System instructions and live database context
     * @param userMessage User message or specific analysis instruction
     * @return Raw text response from AI model
     */
    String generateResponse(String systemPrompt, String userMessage);
}
