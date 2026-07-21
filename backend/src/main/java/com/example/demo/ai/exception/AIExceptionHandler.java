package com.example.demo.ai.exception;

import com.example.demo.ai.dto.ChatResponse;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.ExceptionHandler;
import org.springframework.web.bind.annotation.RestControllerAdvice;

import java.time.LocalDateTime;

@RestControllerAdvice(basePackages = "com.example.demo.ai")
public class AIExceptionHandler {

    private static final Logger log = LoggerFactory.getLogger(AIExceptionHandler.class);

    @ExceptionHandler(AIException.class)
    public ResponseEntity<ChatResponse> handleAIException(AIException ex) {
        log.error("AI Exception caught: {}", ex.getMessage());
        ChatResponse errorResponse = new ChatResponse(
                "AI processing error: " + ex.getMessage(),
                LocalDateTime.now(),
                "ERROR",
                "None",
                ex.getMessage()
        );
        return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body(errorResponse);
    }

    @ExceptionHandler(Exception.class)
    public ResponseEntity<ChatResponse> handleGenericException(Exception ex) {
        log.error("Unhandled exception in AI module: {}", ex.getMessage(), ex);
        ChatResponse errorResponse = new ChatResponse(
                "An unexpected error occurred in the AI service.",
                LocalDateTime.now(),
                "ERROR",
                "None",
                ex.getMessage()
        );
        return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body(errorResponse);
    }
}
