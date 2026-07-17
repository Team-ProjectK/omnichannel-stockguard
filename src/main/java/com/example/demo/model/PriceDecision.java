package com.example.demo.model;

import jakarta.persistence.*;
import java.math.BigDecimal;
import java.time.Instant;

@Entity
@Table(name = "price_decisions")
public class PriceDecision {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    private String sku;
    private String storeId;
    private Instant timestamp;
    private BigDecimal oldPrice;
    private BigDecimal newPrice;
    private String demandSignal;
    private String competitorPriceRef;

    @Column(length = 1000)
    private String justification;

    public PriceDecision() {
    }

    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

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

    public Instant getTimestamp() {
        return timestamp;
    }

    public void setTimestamp(Instant timestamp) {
        this.timestamp = timestamp;
    }

    public BigDecimal getOldPrice() {
        return oldPrice;
    }

    public void setOldPrice(BigDecimal oldPrice) {
        this.oldPrice = oldPrice;
    }

    public BigDecimal getNewPrice() {
        return newPrice;
    }

    public void setNewPrice(BigDecimal newPrice) {
        this.newPrice = newPrice;
    }

    public String getDemandSignal() {
        return demandSignal;
    }

    public void setDemandSignal(String demandSignal) {
        this.demandSignal = demandSignal;
    }

    public String getCompetitorPriceRef() {
        return competitorPriceRef;
    }

    public void setCompetitorPriceRef(String competitorPriceRef) {
        this.competitorPriceRef = competitorPriceRef;
    }

    public String getJustification() {
        return justification;
    }

    public void setJustification(String justification) {
        this.justification = justification;
    }
}