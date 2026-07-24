package com.example.demo.dto;

import jakarta.validation.constraints.DecimalMin;
import jakarta.validation.constraints.Future;
import jakarta.validation.constraints.Min;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;
import jakarta.validation.constraints.Pattern;

import java.math.BigDecimal;
import java.time.Instant;

public class SalesOrderDto {

    @NotBlank(message = "Sales Order Number is required")
    private String salesOrderNo;

    @NotBlank(message = "Customer ID is required")
    private String customerId;

    @NotBlank(message = "SKU is required")
    private String sku;

    @NotBlank(message = "Store ID is required")
    private String storeId;

    @NotNull(message = "Quantity is required")
    @Min(value = 1, message = "Quantity must be at least 1")
    private Integer quantity;

    @NotNull(message = "Selling Price is required")
    @DecimalMin(value = "0.01", message = "Selling Price must be greater than zero")
    private BigDecimal sellingPrice;

    @NotBlank(message = "Payment Method is required")
    @Pattern(
            regexp = "CASH|CARD|UPI|NET_BANKING|WALLET",
            message = "Payment Method must be CASH, CARD, UPI, NET_BANKING, or WALLET"
    )
    private String paymentMethod;

    @NotBlank(message = "Order Status is required")
    @Pattern(
            regexp = "CREATED|PAID|SHIPPED|DELIVERED|CANCELLED",
            message = "Order Status must be CREATED, PAID, SHIPPED, DELIVERED, or CANCELLED"
    )
    private String orderStatus;

    @Future(message = "Delivery Date must be in the future")
    private Instant deliveryDate;

    public SalesOrderDto() {
        // Default constructor required for framework serialization
    }

    public String getSalesOrderNo() {
        return salesOrderNo;
    }

    public void setSalesOrderNo(String salesOrderNo) {
        this.salesOrderNo = salesOrderNo;
    }

    public String getCustomerId() {
        return customerId;
    }

    public void setCustomerId(String customerId) {
        this.customerId = customerId;
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

    public BigDecimal getSellingPrice() {
        return sellingPrice;
    }

    public void setSellingPrice(BigDecimal sellingPrice) {
        this.sellingPrice = sellingPrice;
    }

    public String getPaymentMethod() {
        return paymentMethod;
    }

    public void setPaymentMethod(String paymentMethod) {
        this.paymentMethod = paymentMethod;
    }

    public String getOrderStatus() {
        return orderStatus;
    }

    public void setOrderStatus(String orderStatus) {
        this.orderStatus = orderStatus;
    }

    public Instant getDeliveryDate() {
        return deliveryDate;
    }

    public void setDeliveryDate(Instant deliveryDate) {
        this.deliveryDate = deliveryDate;
    }
}