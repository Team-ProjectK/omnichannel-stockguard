package com.example.demo.service;

import com.example.demo.dto.SalesOrderDto;
import com.example.demo.exception.ResourceNotFoundException;
import com.example.demo.model.Inventory;
import com.example.demo.model.SalesOrder;
import com.example.demo.repository.InventoryRepository;
import com.example.demo.repository.SalesOrderRepository;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;

import java.math.BigDecimal;
import java.time.Instant;
import java.util.List;

@Service
public class SalesOrderService {

    private final SalesOrderRepository salesOrderRepo;
    private final InventoryRepository inventoryRepo;

    public SalesOrderService(
            SalesOrderRepository salesOrderRepo,
            InventoryRepository inventoryRepo) {

        this.salesOrderRepo = salesOrderRepo;
        this.inventoryRepo = inventoryRepo;
    }

    // Get All Sales Orders
    public List<SalesOrder> getAllSalesOrders() {
        return salesOrderRepo.findAll();
    }

    // Pagination
    public Page<SalesOrder> getSalesOrders(Pageable pageable) {
        return salesOrderRepo.findAll(pageable);
    }

    // Get Sales Order
    public SalesOrder getSalesOrder(String salesOrderNo) {

        return salesOrderRepo.findBySalesOrderNo(salesOrderNo)
                .orElseThrow(() ->
                        new ResourceNotFoundException("Sales Order not found"));
    }

    // Create Sales Order
    public SalesOrder createSalesOrder(SalesOrderDto dto) {

        if (salesOrderRepo.existsBySalesOrderNo(dto.getSalesOrderNo())) {
            throw new RuntimeException("Sales Order already exists.");
        }

        Inventory inventory = inventoryRepo
                .findBySkuAndStoreId(dto.getSku(), dto.getStoreId())
                .orElseThrow(() ->
                        new ResourceNotFoundException("Inventory not found"));

        if (inventory.getAvailableStock() < dto.getQuantity()) {
            throw new RuntimeException("Insufficient stock available.");
        }

        inventory.setAvailableStock(
                inventory.getAvailableStock() - dto.getQuantity());

        inventoryRepo.save(inventory);

        SalesOrder order = new SalesOrder();

        order.setSalesOrderNo(dto.getSalesOrderNo());
        order.setCustomerId(dto.getCustomerId());
        order.setSku(dto.getSku());
        order.setStoreId(dto.getStoreId());
        order.setQuantity(dto.getQuantity());
        order.setSellingPrice(dto.getSellingPrice());

        BigDecimal totalAmount = dto.getSellingPrice()
                .multiply(BigDecimal.valueOf(dto.getQuantity()));

        order.setTotalAmount(totalAmount);

        order.setPaymentMethod(dto.getPaymentMethod());
        order.setOrderStatus(dto.getOrderStatus());
        order.setOrderDate(Instant.now());
        order.setDeliveryDate(dto.getDeliveryDate());

        return salesOrderRepo.save(order);
    }

    // Update Sales Order
    public SalesOrder updateSalesOrder(
            String salesOrderNo,
            SalesOrderDto dto) {

        SalesOrder order = salesOrderRepo.findBySalesOrderNo(salesOrderNo)
                .orElseThrow(() ->
                        new ResourceNotFoundException("Sales Order not found"));

        order.setCustomerId(dto.getCustomerId());
        order.setSku(dto.getSku());
        order.setStoreId(dto.getStoreId());
        order.setQuantity(dto.getQuantity());
        order.setSellingPrice(dto.getSellingPrice());

        BigDecimal totalAmount = dto.getSellingPrice()
                .multiply(BigDecimal.valueOf(dto.getQuantity()));

        order.setTotalAmount(totalAmount);

        order.setPaymentMethod(dto.getPaymentMethod());
        order.setOrderStatus(dto.getOrderStatus());
        order.setDeliveryDate(dto.getDeliveryDate());

        return salesOrderRepo.save(order);
    }

    // Delete Sales Order
    public void deleteSalesOrder(String salesOrderNo) {

        SalesOrder order = salesOrderRepo.findBySalesOrderNo(salesOrderNo)
                .orElseThrow(() ->
                        new ResourceNotFoundException("Sales Order not found"));

        salesOrderRepo.delete(order);
    }

    // Orders by Customer
    public List<SalesOrder> getOrdersByCustomer(String customerId) {
        return salesOrderRepo.findByCustomerId(customerId);
    }

    // Orders by SKU
    public List<SalesOrder> getOrdersBySku(String sku) {
        return salesOrderRepo.findBySku(sku);
    }

    // Orders by Store
    public List<SalesOrder> getOrdersByStore(String storeId) {
        return salesOrderRepo.findByStoreId(storeId);
    }

    // Orders by Status
    public List<SalesOrder> getOrdersByStatus(String status) {
        return salesOrderRepo.findByOrderStatus(status);
    }

}