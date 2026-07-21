package com.example.demo.ai.controller;

import com.example.demo.ai.dto.*;
import com.example.demo.ai.service.AIService;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/ai")
@CrossOrigin(origins = "*")
public class AIController {

    private final AIService aiService;

    public AIController(AIService aiService) {
        this.aiService = aiService;
    }

    @PostMapping("/chat")
    public ResponseEntity<ChatResponse> chat(@RequestBody ChatRequest request) {
        ChatResponse response = aiService.processChat(request);
        return ResponseEntity.ok(response);
    }

    @PostMapping("/dashboard-summary")
    public ResponseEntity<DashboardSummaryDto> getDashboardSummary() {
        DashboardSummaryDto summary = aiService.getDashboardSummary();
        return ResponseEntity.ok(summary);
    }

    @PostMapping("/inventory-insights")
    public ResponseEntity<InventoryInsightDto> getInventoryInsights() {
        InventoryInsightDto insights = aiService.getInventoryInsights();
        return ResponseEntity.ok(insights);
    }

    @PostMapping("/reorder-suggestions")
    public ResponseEntity<ReorderSuggestionDto> getReorderSuggestions() {
        ReorderSuggestionDto suggestions = aiService.getReorderSuggestions();
        return ResponseEntity.ok(suggestions);
    }

    @PostMapping("/price-recommendations")
    public ResponseEntity<PriceRecommendationDto> getPriceRecommendations() {
        PriceRecommendationDto recommendations = aiService.getPriceRecommendations();
        return ResponseEntity.ok(recommendations);
    }

    @PostMapping("/demand-forecast")
    public ResponseEntity<DemandForecastDto> getDemandForecast() {
        DemandForecastDto forecast = aiService.getDemandForecast();
        return ResponseEntity.ok(forecast);
    }

    @PostMapping("/business-summary")
    public ResponseEntity<BusinessSummaryDto> getBusinessSummary() {
        BusinessSummaryDto summary = aiService.getBusinessSummary();
        return ResponseEntity.ok(summary);
    }
}
