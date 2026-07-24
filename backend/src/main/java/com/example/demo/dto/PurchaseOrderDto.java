package com.example.demo.dto;

import jakarta.validation.constraints.DecimalMin;
import jakarta.validation.constraints.Future;
import jakarta.validation.constraints.Min;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;
import jakarta.validation.constraints.Pattern;

import java.math.BigDecimal;
import java.time.Instant;

public class PurchaseOrderDto {

    @NotBlank(message = "Purchase Order Number is required")
    private String purchaseOrderNo;

    @NotBlank(message = "Supplier Code is required")
    private String supplierCode;

    @NotBlank(message = "SKU is required")
    private String sku;

    @NotBlank(message = "Store ID is required")
    private String storeId;

    @NotNull(message = "Quantity is required")
    @Min(value = 1, message = "Quantity must be at least 1")
    private Integer quantity;

    @NotNull(message = "Unit Price is required")
    @DecimalMin(value = "0.01", message = "Unit Price must be greater than zero")
    private BigDecimal unitPrice;

    @NotNull(message = "Expected Delivery Date is required")
    @Future(message = "Expected Delivery Date must be in the future")
    private Instant expectedDeliveryDate;

    @NotBlank(message = "Status is required")
    @Pattern(
            regexp = "CREATED|APPROVED|SHIPPED|RECEIVED|CANCELLED",
            message = "Status must be CREATED, APPROVED, SHIPPED, RECEIVED, or CANCELLED"
    )
    private String status;

    public PurchaseOrderDto() {
        // Default constructor required for framework serialization
    }

    public String getPurchaseOrderNo() {
        return purchaseOrderNo;
    }

    public void setPurchaseOrderNo(String purchaseOrderNo) {
        this.purchaseOrderNo = purchaseOrderNo;
    }

    public String getSupplierCode() {
        return supplierCode;
    }

    public void setSupplierCode(String supplierCode) {
        this.supplierCode = supplierCode;
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

    public Integer getQuantity() {
        return quantity;
    }

    public void setQuantity(Integer quantity) {
        this.quantity = quantity;
    }

    public BigDecimal getUnitPrice() {
        return unitPrice;
    }

    public void setUnitPrice(BigDecimal unitPrice) {
        this.unitPrice = unitPrice;
    }

    public Instant getExpectedDeliveryDate() {
        return expectedDeliveryDate;
    }

    public void setExpectedDeliveryDate(Instant expectedDeliveryDate) {
        this.expectedDeliveryDate = expectedDeliveryDate;
    }

    public String getStatus() {
        return status;
    }

    public void setStatus(String status) {
        this.status = status;
    }
}