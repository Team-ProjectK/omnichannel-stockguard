package com.example.demo.dto;

import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;
import jakarta.validation.constraints.Positive;

import java.math.BigDecimal;

public class PricingDecisionRequest {

    @NotBlank
    private String sku;

    @NotBlank
    private String storeId;

    @NotNull
    @Positive
    private BigDecimal newPrice;

    @NotBlank
    private String justification;

    private String competitorPriceRef;

    private String demandSignal;

    // Getters and Setters

    public String getSku() {
        return sku;
    }

    public void setSku(String sku) {
        this.sku = sku;
    }

    public String getStoreId() {
        return storeId;
    }

    public void setStoreId(String storeId) {
        this.storeId = storeId;
    }

    public BigDecimal getNewPrice() {
        return newPrice;
    }

    public void setNewPrice(BigDecimal newPrice) {
        this.newPrice = newPrice;
    }

    public String getJustification() {
        return justification;
    }

    public void setJustification(String justification) {
        this.justification = justification;
    }

    public String getCompetitorPriceRef() {
        return competitorPriceRef;
    }

    public void setCompetitorPriceRef(String competitorPriceRef) {
        this.competitorPriceRef = competitorPriceRef;
    }

    public String getDemandSignal() {
        return demandSignal;
    }

    public void setDemandSignal(String demandSignal) {
        this.demandSignal = demandSignal;
    }
}