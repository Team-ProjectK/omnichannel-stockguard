package com.example.demo.ai.dto;

import java.util.List;

public class DemandForecastDto {
    private String forecastOverview;
    private String forecastModelType;
    private List<ProductForecastItem> forecasts;

    public DemandForecastDto() {
    }

    public DemandForecastDto(String forecastOverview, String forecastModelType, List<ProductForecastItem> forecasts) {
        this.forecastOverview = forecastOverview;
        this.forecastModelType = forecastModelType;
        this.forecasts = forecasts;
    }

    public String getForecastOverview() { return forecastOverview; }
    public void setForecastOverview(String forecastOverview) { this.forecastOverview = forecastOverview; }

    public String getForecastModelType() { return forecastModelType; }
    public void setForecastModelType(String forecastModelType) { this.forecastModelType = forecastModelType; }

    public List<ProductForecastItem> getForecasts() { return forecasts; }
    public void setForecasts(List<ProductForecastItem> forecasts) { this.forecasts = forecasts; }

    public static class ProductForecastItem {
        private String sku;
        private String productName;
        private int currentStock;
        private int projected30DaysDemand;
        private String trendDirection;
        private String riskLevel;
        private String rationale;

        public ProductForecastItem() {
        }

        public ProductForecastItem(String sku, String productName, int currentStock, int projected30DaysDemand, String trendDirection, String riskLevel, String rationale) {
            this.sku = sku;
            this.productName = productName;
            this.currentStock = currentStock;
            this.projected30DaysDemand = projected30DaysDemand;
            this.trendDirection = trendDirection;
            this.riskLevel = riskLevel;
            this.rationale = rationale;
        }

        public String getSku() { return sku; }
        public void setSku(String sku) { this.sku = sku; }

        public String getProductName() { return productName; }
        public void setProductName(String productName) { this.productName = productName; }

        public int getCurrentStock() { return currentStock; }
        public void setCurrentStock(int currentStock) { this.currentStock = currentStock; }

        public int getProjected30DaysDemand() { return projected30DaysDemand; }
        public void setProjected30DaysDemand(int projected30DaysDemand) { this.projected30DaysDemand = projected30DaysDemand; }

        public String getTrendDirection() { return trendDirection; }
        public void setTrendDirection(String trendDirection) { this.trendDirection = trendDirection; }

        public String getRiskLevel() { return riskLevel; }
        public void setRiskLevel(String riskLevel) { this.riskLevel = riskLevel; }

        public String getRationale() { return rationale; }
        public void setRationale(String rationale) { this.rationale = rationale; }
    }
}
