package com.example.demo.assistant.dto;

import java.time.LocalDateTime;
import java.time.format.DateTimeFormatter;

public class ChatResponse {

    private String sessionId;
    private String response;
    private String timestamp;

    public ChatResponse() {
        this.timestamp = LocalDateTime.now().format(DateTimeFormatter.ISO_LOCAL_DATE_TIME);
    }

    public ChatResponse(String sessionId, String response) {
        this.sessionId = sessionId;
        this.response = response;
        this.timestamp = LocalDateTime.now().format(DateTimeFormatter.ISO_LOCAL_DATE_TIME);
    }

    public ChatResponse(String sessionId, String response, String timestamp) {
        this.sessionId = sessionId;
        this.response = response;
        this.timestamp = timestamp;
    }

    public String getSessionId() {
        return sessionId;
    }

    public void setSessionId(String sessionId) {
        this.sessionId = sessionId;
    }

    public String getResponse() {
        return response;
    }

    public void setResponse(String response) {
        this.response = response;
    }

    public String getTimestamp() {
        return timestamp;
    }

    public void setTimestamp(String timestamp) {
        this.timestamp = timestamp;
    }
}
