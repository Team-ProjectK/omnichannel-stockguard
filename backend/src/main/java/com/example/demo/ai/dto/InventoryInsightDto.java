package com.example.demo.ai.dto;

import java.time.LocalDateTime;
import java.util.List;

public class InventoryInsightDto {
    private String overallHealthStatus;
    private int totalProductsAnalyzed;
    private int lowStockItemCount;
    private int criticalStockItemCount;
    private int overstockItemCount;
    private List<String> fastMovingItems;
    private List<String> slowMovingItems;
    private String aiAnalysisSummary;
    private List<String> keyRecommendations;
    private LocalDateTime generatedAt;

    public InventoryInsightDto() {
    }

    public InventoryInsightDto(String overallHealthStatus, int totalProductsAnalyzed, int lowStockItemCount, int criticalStockItemCount, int overstockItemCount, List<String> fastMovingItems, List<String> slowMovingItems, String aiAnalysisSummary, List<String> keyRecommendations, LocalDateTime generatedAt) {
        this.overallHealthStatus = overallHealthStatus;
        this.totalProductsAnalyzed = totalProductsAnalyzed;
        this.lowStockItemCount = lowStockItemCount;
        this.criticalStockItemCount = criticalStockItemCount;
        this.overstockItemCount = overstockItemCount;
        this.fastMovingItems = fastMovingItems;
        this.slowMovingItems = slowMovingItems;
        this.aiAnalysisSummary = aiAnalysisSummary;
        this.keyRecommendations = keyRecommendations;
        this.generatedAt = generatedAt;
    }

    public String getOverallHealthStatus() { return overallHealthStatus; }
    public void setOverallHealthStatus(String overallHealthStatus) { this.overallHealthStatus = overallHealthStatus; }

    public int getTotalProductsAnalyzed() { return totalProductsAnalyzed; }
    public void setTotalProductsAnalyzed(int totalProductsAnalyzed) { this.totalProductsAnalyzed = totalProductsAnalyzed; }

    public int getLowStockItemCount() { return lowStockItemCount; }
    public void setLowStockItemCount(int lowStockItemCount) { this.lowStockItemCount = lowStockItemCount; }

    public int getCriticalStockItemCount() { return criticalStockItemCount; }
    public void setCriticalStockItemCount(int criticalStockItemCount) { this.criticalStockItemCount = criticalStockItemCount; }

    public int getOverstockItemCount() { return overstockItemCount; }
    public void setOverstockItemCount(int overstockItemCount) { this.overstockItemCount = overstockItemCount; }

    public List<String> getFastMovingItems() { return fastMovingItems; }
    public void setFastMovingItems(List<String> fastMovingItems) { this.fastMovingItems = fastMovingItems; }

    public List<String> getSlowMovingItems() { return slowMovingItems; }
    public void setSlowMovingItems(List<String> slowMovingItems) { this.slowMovingItems = slowMovingItems; }

    public String getAiAnalysisSummary() { return aiAnalysisSummary; }
    public void setAiAnalysisSummary(String aiAnalysisSummary) { this.aiAnalysisSummary = aiAnalysisSummary; }

    public List<String> getKeyRecommendations() { return keyRecommendations; }
    public void setKeyRecommendations(List<String> keyRecommendations) { this.keyRecommendations = keyRecommendations; }

    public LocalDateTime getGeneratedAt() { return generatedAt; }
    public void setGeneratedAt(LocalDateTime generatedAt) { this.generatedAt = generatedAt; }
}
