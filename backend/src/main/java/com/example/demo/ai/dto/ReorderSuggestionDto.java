package com.example.demo.ai.dto;

import java.util.List;

public class ReorderSuggestionDto {
    private String summary;
    private List<ReorderItemSuggestion> items;

    public ReorderSuggestionDto() {
    }

    public ReorderSuggestionDto(String summary, List<ReorderItemSuggestion> items) {
        this.summary = summary;
        this.items = items;
    }

    public String getSummary() { return summary; }
    public void setSummary(String summary) { this.summary = summary; }

    public List<ReorderItemSuggestion> getItems() { return items; }
    public void setItems(List<ReorderItemSuggestion> items) { this.items = items; }

    public static class ReorderItemSuggestion {
        private String sku;
        private String productName;
        private int currentStock;
        private int recommendedQuantity;
        private String priority;
        private String reason;
        private String estimatedUrgency;

        public ReorderItemSuggestion() {
        }

        public ReorderItemSuggestion(String sku, String productName, int currentStock, int recommendedQuantity, String priority, String reason, String estimatedUrgency) {
            this.sku = sku;
            this.productName = productName;
            this.currentStock = currentStock;
            this.recommendedQuantity = recommendedQuantity;
            this.priority = priority;
            this.reason = reason;
            this.estimatedUrgency = estimatedUrgency;
        }

        public String getSku() { return sku; }
        public void setSku(String sku) { this.sku = sku; }

        public String getProductName() { return productName; }
        public void setProductName(String productName) { this.productName = productName; }

        public int getCurrentStock() { return currentStock; }
        public void setCurrentStock(int currentStock) { this.currentStock = currentStock; }

        public int getRecommendedQuantity() { return recommendedQuantity; }
        public void setRecommendedQuantity(int recommendedQuantity) { this.recommendedQuantity = recommendedQuantity; }

        public String getPriority() { return priority; }
        public void setPriority(String priority) { this.priority = priority; }

        public String getReason() { return reason; }
        public void setReason(String reason) { this.reason = reason; }

        public String getEstimatedUrgency() { return estimatedUrgency; }
        public void setEstimatedUrgency(String estimatedUrgency) { this.estimatedUrgency = estimatedUrgency; }
    }
}
