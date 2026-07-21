package com.example.demo.ai.dto;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.util.List;

@Data
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class PriceRecommendationDto {
    private String executiveSummary;
    private List<PriceRecommendationItem> recommendations;

    @Data
    @NoArgsConstructor
    @AllArgsConstructor
    @Builder
    public static class PriceRecommendationItem {
        private String sku;
        private String productName;
        private double currentPrice;
        private double suggestedPrice;
        private String recommendation; // INCREASE, DECREASE, MAINTAIN
        private String reasoning;
        private String demandSignal;
    }
}
