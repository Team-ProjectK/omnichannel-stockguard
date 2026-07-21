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
public class DemandForecastDto {
    private String forecastOverview;
    private String forecastModelType; // RULE_BASED or HISTORICAL_ML
    private List<ProductForecastItem> forecasts;

    @Data
    @NoArgsConstructor
    @AllArgsConstructor
    @Builder
    public static class ProductForecastItem {
        private String sku;
        private String productName;
        private int currentStock;
        private int projected30DaysDemand;
        private String trendDirection; // UPWARD, STABLE, DOWNWARD
        private String riskLevel; // CRITICAL_STOCKOUT, SAFE, OVERSTOCK
        private String rationale;
    }
}
