package com.example.demo.ai.service;

import com.example.demo.ai.dto.*;

public interface AIService {
    ChatResponse processChat(ChatRequest request);
    DashboardSummaryDto getDashboardSummary();
    InventoryInsightDto getInventoryInsights();
    ReorderSuggestionDto getReorderSuggestions();
    PriceRecommendationDto getPriceRecommendations();
    DemandForecastDto getDemandForecast();
    BusinessSummaryDto getBusinessSummary();
}
