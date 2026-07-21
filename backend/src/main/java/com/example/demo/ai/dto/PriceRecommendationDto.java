package com.example.demo.ai.dto;

import java.util.List;

public class PriceRecommendationDto {
    private String executiveSummary;
    private List<PriceRecommendationItem> recommendations;

    public PriceRecommendationDto() {
    }

    public PriceRecommendationDto(String executiveSummary, List<PriceRecommendationItem> recommendations) {
        this.executiveSummary = executiveSummary;
        this.recommendations = recommendations;
    }

    public String getExecutiveSummary() { return executiveSummary; }
    public void setExecutiveSummary(String executiveSummary) { this.executiveSummary = executiveSummary; }

    public List<PriceRecommendationItem> getRecommendations() { return recommendations; }
    public void setRecommendations(List<PriceRecommendationItem> recommendations) { this.recommendations = recommendations; }

    public static class PriceRecommendationItem {
        private String sku;
        private String productName;
        private double currentPrice;
        private double suggestedPrice;
        private String recommendation;
        private String reasoning;
        private String demandSignal;

        public PriceRecommendationItem() {
        }

        public PriceRecommendationItem(String sku, String productName, double currentPrice, double suggestedPrice, String recommendation, String reasoning, String demandSignal) {
            this.sku = sku;
            this.productName = productName;
            this.currentPrice = currentPrice;
            this.suggestedPrice = suggestedPrice;
            this.recommendation = recommendation;
            this.reasoning = reasoning;
            this.demandSignal = demandSignal;
        }

        public String getSku() { return sku; }
        public void setSku(String sku) { this.sku = sku; }

        public String getProductName() { return productName; }
        public void setProductName(String productName) { this.productName = productName; }

        public double getCurrentPrice() { return currentPrice; }
        public void setCurrentPrice(double currentPrice) { this.currentPrice = currentPrice; }

        public double getSuggestedPrice() { return suggestedPrice; }
        public void setSuggestedPrice(double suggestedPrice) { this.suggestedPrice = suggestedPrice; }

        public String getRecommendation() { return recommendation; }
        public void setRecommendation(String recommendation) { this.recommendation = recommendation; }

        public String getReasoning() { return reasoning; }
        public void setReasoning(String reasoning) { this.reasoning = reasoning; }

        public String getDemandSignal() { return demandSignal; }
        public void setDemandSignal(String demandSignal) { this.demandSignal = demandSignal; }
    }
}
