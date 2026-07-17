package com.example.demo.dto;

import jakarta.validation.constraints.Min;
import jakarta.validation.constraints.NotBlank;

public class ReorderRequestDto {

    @NotBlank
    private String sku;

    @NotBlank
    private String storeId;

    @Min(1)
    private int quantity;

    @NotBlank
    private String supplier;

    private String draftDocText;

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

    public int getQuantity() {
        return quantity;
    }

    public void setQuantity(int quantity) {
        this.quantity = quantity;
    }

    public String getSupplier() {
        return supplier;
    }

    public void setSupplier(String supplier) {
        this.supplier = supplier;
    }

    public String getDraftDocText() {
        return draftDocText;
    }

    public void setDraftDocText(String draftDocText) {
        this.draftDocText = draftDocText;
    }
}