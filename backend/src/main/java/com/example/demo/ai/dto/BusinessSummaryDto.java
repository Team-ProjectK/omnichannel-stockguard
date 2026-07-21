package com.example.demo.ai.dto;

import java.util.List;

public class BusinessSummaryDto {
    private String executiveSummary;
    private String todayOverview;
    private String inventoryStatusSummary;
    private String salesOverviewSummary;
    private String purchaseOverviewSummary;
    private List<String> activeAlertsSummary;
    private List<String> strategicRecommendations;
    private String generatedAt;

    public BusinessSummaryDto() {
    }

    public BusinessSummaryDto(String executiveSummary, String todayOverview, String inventoryStatusSummary, String salesOverviewSummary, String purchaseOverviewSummary, List<String> activeAlertsSummary, List<String> strategicRecommendations, String generatedAt) {
        this.executiveSummary = executiveSummary;
        this.todayOverview = todayOverview;
        this.inventoryStatusSummary = inventoryStatusSummary;
        this.salesOverviewSummary = salesOverviewSummary;
        this.purchaseOverviewSummary = purchaseOverviewSummary;
        this.activeAlertsSummary = activeAlertsSummary;
        this.strategicRecommendations = strategicRecommendations;
        this.generatedAt = generatedAt;
    }

    public String getExecutiveSummary() { return executiveSummary; }
    public void setExecutiveSummary(String executiveSummary) { this.executiveSummary = executiveSummary; }

    public String getTodayOverview() { return todayOverview; }
    public void setTodayOverview(String todayOverview) { this.todayOverview = todayOverview; }

    public String getInventoryStatusSummary() { return inventoryStatusSummary; }
    public void setInventoryStatusSummary(String inventoryStatusSummary) { this.inventoryStatusSummary = inventoryStatusSummary; }

    public String getSalesOverviewSummary() { return salesOverviewSummary; }
    public void setSalesOverviewSummary(String salesOverviewSummary) { this.salesOverviewSummary = salesOverviewSummary; }

    public String getPurchaseOverviewSummary() { return purchaseOverviewSummary; }
    public void setPurchaseOverviewSummary(String purchaseOverviewSummary) { this.purchaseOverviewSummary = purchaseOverviewSummary; }

    public List<String> getActiveAlertsSummary() { return activeAlertsSummary; }
    public void setActiveAlertsSummary(List<String> activeAlertsSummary) { this.activeAlertsSummary = activeAlertsSummary; }

    public List<String> getStrategicRecommendations() { return strategicRecommendations; }
    public void setStrategicRecommendations(List<String> strategicRecommendations) { this.strategicRecommendations = strategicRecommendations; }

    public String getGeneratedAt() { return generatedAt; }
    public void setGeneratedAt(String generatedAt) { this.generatedAt = generatedAt; }
}
