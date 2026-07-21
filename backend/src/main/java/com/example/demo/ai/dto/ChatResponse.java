package com.example.demo.ai.dto;

import java.time.LocalDateTime;

public class ChatResponse {
    private String response;
    private LocalDateTime timestamp;
    private String status;
    private String modelUsed;
    private String errorMessage;

    public ChatResponse() {
    }

    public ChatResponse(String response, LocalDateTime timestamp, String status, String modelUsed, String errorMessage) {
        this.response = response;
        this.timestamp = timestamp;
        this.status = status;
        this.modelUsed = modelUsed;
        this.errorMessage = errorMessage;
    }

    public String getResponse() { return response; }
    public void setResponse(String response) { this.response = response; }

    public LocalDateTime getTimestamp() { return timestamp; }
    public void setTimestamp(LocalDateTime timestamp) { this.timestamp = timestamp; }

    public String getStatus() { return status; }
    public void setStatus(String status) { this.status = status; }

    public String getModelUsed() { return modelUsed; }
    public void setModelUsed(String modelUsed) { this.modelUsed = modelUsed; }

    public String getErrorMessage() { return errorMessage; }
    public void setErrorMessage(String errorMessage) { this.errorMessage = errorMessage; }
}
