package com.example.demo.ai.dto;

import java.util.List;

public class DashboardSummaryDto {
    private String executiveSummary;
    private String inventoryHealthScore;
    private String riskLevel;
    private List<String> keyInsights;
    private List<String> quickRecommendations;
    private String generatedAt;

    public DashboardSummaryDto() {
    }

    public DashboardSummaryDto(String executiveSummary, String inventoryHealthScore, String riskLevel, List<String> keyInsights, List<String> quickRecommendations, String generatedAt) {
        this.executiveSummary = executiveSummary;
        this.inventoryHealthScore = inventoryHealthScore;
        this.riskLevel = riskLevel;
        this.keyInsights = keyInsights;
        this.quickRecommendations = quickRecommendations;
        this.generatedAt = generatedAt;
    }

    public String getExecutiveSummary() { return executiveSummary; }
    public void setExecutiveSummary(String executiveSummary) { this.executiveSummary = executiveSummary; }

    public String getInventoryHealthScore() { return inventoryHealthScore; }
    public void setInventoryHealthScore(String inventoryHealthScore) { this.inventoryHealthScore = inventoryHealthScore; }

    public String getRiskLevel() { return riskLevel; }
    public void setRiskLevel(String riskLevel) { this.riskLevel = riskLevel; }

    public List<String> getKeyInsights() { return keyInsights; }
    public void setKeyInsights(List<String> keyInsights) { this.keyInsights = keyInsights; }

    public List<String> getQuickRecommendations() { return quickRecommendations; }
    public void setQuickRecommendations(List<String> quickRecommendations) { this.quickRecommendations = quickRecommendations; }

    public String getGeneratedAt() { return generatedAt; }
    public void setGeneratedAt(String generatedAt) { this.generatedAt = generatedAt; }
}
