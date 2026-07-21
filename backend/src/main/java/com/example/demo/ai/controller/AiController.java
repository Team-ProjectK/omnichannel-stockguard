package com.example.demo.ai.controller;

import com.example.demo.ai.dto.*;
import com.example.demo.ai.service.ChatService;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/ai")
@CrossOrigin(origins = "*")
public class AiController {

    private final ChatService chatService;

    public AiController(ChatService chatService) {
        this.chatService = chatService;
    }

    @PostMapping("/chat")
    public ResponseEntity<ChatResponseDto> chat(@RequestBody ChatMessageDto request) {
        ChatResponseDto response = chatService.processChat(request);
        return ResponseEntity.ok(response);
    }

    @PostMapping("/inventory-insights")
    public ResponseEntity<InventoryInsightDto> getInventoryInsights() {
        InventoryInsightDto insights = chatService.getInventoryInsights();
        return ResponseEntity.ok(insights);
    }

    @PostMapping("/reorder-suggestions")
    public ResponseEntity<ReorderSuggestionDto> getReorderSuggestions() {
        ReorderSuggestionDto suggestions = chatService.getReorderSuggestions();
        return ResponseEntity.ok(suggestions);
    }

    @PostMapping("/price-recommendations")
    public ResponseEntity<PriceRecommendationDto> getPriceRecommendations() {
        PriceRecommendationDto recommendations = chatService.getPriceRecommendations();
        return ResponseEntity.ok(recommendations);
    }

    @PostMapping("/demand-forecast")
    public ResponseEntity<DemandForecastDto> getDemandForecast() {
        DemandForecastDto forecast = chatService.getDemandForecast();
        return ResponseEntity.ok(forecast);
    }
}
