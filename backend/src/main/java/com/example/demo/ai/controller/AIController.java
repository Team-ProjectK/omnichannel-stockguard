package com.example.demo.ai.controller;

import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.HashMap;
import java.util.Map;

@RestController
@RequestMapping("/api/ai")
@CrossOrigin(origins = "*")
public class AIController {

    private Map<String, Object> unavailableResponse() {
        Map<String, Object> response = new HashMap<>();
        response.put("status", "success");
        response.put("message", "AI Assistant is temporarily unavailable.");
        return response;
    }

    @PostMapping("/chat")
    public ResponseEntity<Map<String, Object>> chat(@RequestBody(required = false) Object request) {
        return ResponseEntity.ok(unavailableResponse());
    }

    @PostMapping("/dashboard-summary")
    public ResponseEntity<Map<String, Object>> getDashboardSummary() {
        return ResponseEntity.ok(unavailableResponse());
    }

    @PostMapping("/inventory-insights")
    public ResponseEntity<Map<String, Object>> getInventoryInsights() {
        return ResponseEntity.ok(unavailableResponse());
    }

    @PostMapping("/reorder-suggestions")
    public ResponseEntity<Map<String, Object>> getReorderSuggestions() {
        return ResponseEntity.ok(unavailableResponse());
    }

    @PostMapping("/price-recommendations")
    public ResponseEntity<Map<String, Object>> getPriceRecommendations() {
        return ResponseEntity.ok(unavailableResponse());
    }

    @PostMapping("/demand-forecast")
    public ResponseEntity<Map<String, Object>> getDemandForecast() {
        return ResponseEntity.ok(unavailableResponse());
    }

    @PostMapping("/business-summary")
    public ResponseEntity<Map<String, Object>> getBusinessSummary() {
        return ResponseEntity.ok(unavailableResponse());
    }
}

