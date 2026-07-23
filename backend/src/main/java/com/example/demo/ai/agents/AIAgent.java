package com.example.demo.ai.agents;

public interface AIAgent {

    /**
     * Determines whether this AI Agent handles the given user prompt message.
     *
     * @param message User prompt message
     * @return true if this agent supports the prompt intent, false otherwise
     */
    boolean supports(String message);

    /**
     * Processes the prompt using this agent's domain system prompt and context.
     *
     * @param sessionId Active conversation session ID
     * @param message   User prompt message
     * @return Generated AI response text
     */
    String process(String sessionId, String message);
}
