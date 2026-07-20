package com.example.demo.dto;

import jakarta.validation.constraints.Min;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;

public class InventoryDto {

    @NotBlank(message = "SKU is required")
    private String sku;

    @NotBlank(message = "Store ID is required")
    private String storeId;

    @NotNull(message = "Available stock is required")
    @Min(value = 0, message = "Available stock cannot be negative")
    private Integer availableStock;

    @NotNull(message = "Reserved stock is required")
    @Min(value = 0, message = "Reserved stock cannot be negative")
    private Integer reservedStock;

    @NotNull(message = "Damaged stock is required")
    @Min(value = 0, message = "Damaged stock cannot be negative")
    private Integer damagedStock;

    public InventoryDto() {
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

    public Integer getAvailableStock() {
        return availableStock;
    }

    public void setAvailableStock(Integer availableStock) {
        this.availableStock = availableStock;
    }

    public Integer getReservedStock() {
        return reservedStock;
    }

    public void setReservedStock(Integer reservedStock) {
        this.reservedStock = reservedStock;
    }

    public Integer getDamagedStock() {
        return damagedStock;
    }

    public void setDamagedStock(Integer damagedStock) {
        this.damagedStock = damagedStock;
    }
}