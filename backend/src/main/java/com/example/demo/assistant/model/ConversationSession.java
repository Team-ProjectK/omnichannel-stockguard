package com.example.demo.assistant.model;

import java.time.LocalDateTime;
import java.util.ArrayList;
import java.util.Collections;
import java.util.List;

public class ConversationSession {

    private String sessionId;
    private List<ChatMessage> messages;
    private LocalDateTime createdAt;
    private LocalDateTime lastUpdatedAt;

    public ConversationSession() {
        this.messages = Collections.synchronizedList(new ArrayList<>());
        this.createdAt = LocalDateTime.now();
        this.lastUpdatedAt = LocalDateTime.now();
    }

    public ConversationSession(String sessionId) {
        this.sessionId = sessionId;
        this.messages = Collections.synchronizedList(new ArrayList<>());
        this.createdAt = LocalDateTime.now();
        this.lastUpdatedAt = LocalDateTime.now();
    }

    public synchronized void addMessage(String role, String content) {
        this.messages.add(new ChatMessage(role, content));
        this.lastUpdatedAt = LocalDateTime.now();
    }

    public String getSessionId() {
        return sessionId;
    }

    public void setSessionId(String sessionId) {
        this.sessionId = sessionId;
    }

    public List<ChatMessage> getMessages() {
        return messages;
    }

    public void setMessages(List<ChatMessage> messages) {
        this.messages = Collections.synchronizedList(messages);
    }

    public LocalDateTime getCreatedAt() {
        return createdAt;
    }

    public void setCreatedAt(LocalDateTime createdAt) {
        this.createdAt = createdAt;
    }

    public LocalDateTime getLastUpdatedAt() {
        return lastUpdatedAt;
    }

    public void setLastUpdatedAt(LocalDateTime lastUpdatedAt) {
        this.lastUpdatedAt = lastUpdatedAt;
    }
}
