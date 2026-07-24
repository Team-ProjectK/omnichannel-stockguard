package com.example.demo.service;

import com.example.demo.dto.SalesOrderDto;
import com.example.demo.exception.ResourceNotFoundException;
import com.example.demo.exception.ServiceOperationException;
import com.example.demo.model.Inventory;
import com.example.demo.model.SalesOrder;
import com.example.demo.repository.InventoryRepository;
import com.example.demo.repository.SalesOrderRepository;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;

import java.math.BigDecimal;
import java.time.Instant;
import java.util.List;

@Service
public class SalesOrderService {

    private static final Logger logger = LoggerFactory.getLogger(SalesOrderService.class);
    private static final String SO_NOT_FOUND = "Sales Order not found";

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

        logger.info("Fetching all sales orders");

        return salesOrderRepo.findAll();
    }

    // Pagination
    public Page<SalesOrder> getSalesOrders(Pageable pageable) {

        logger.info("Fetching sales orders with pagination");

        return salesOrderRepo.findAll(pageable);
    }

    // Get Sales Order
    public SalesOrder getSalesOrder(String salesOrderNo) {

        logger.info("Fetching sales order with Order No: {}", salesOrderNo);

        return salesOrderRepo.findBySalesOrderNo(salesOrderNo)
                .orElseThrow(() -> {
                    logger.warn("Sales Order not found. Order No: {}", salesOrderNo);
                    return new ResourceNotFoundException(SO_NOT_FOUND);
                });
    }

    // Create Sales Order
    public SalesOrder createSalesOrder(SalesOrderDto dto) {

        logger.info("Creating sales order with Order No: {}", dto.getSalesOrderNo());

        if (salesOrderRepo.existsBySalesOrderNo(dto.getSalesOrderNo())) {

            logger.warn("Sales Order already exists. Order No: {}", dto.getSalesOrderNo());

            throw new ServiceOperationException("Sales Order already exists.");
        }

        Inventory inventory = inventoryRepo
                .findBySkuAndStoreId(dto.getSku(), dto.getStoreId())
                .orElseThrow(() -> {
                    logger.warn("Inventory not found. SKU: {}, Store: {}",
                            dto.getSku(), dto.getStoreId());
                    return new ResourceNotFoundException("Inventory not found");
                });

        if (inventory.getAvailableStock() < dto.getQuantity()) {

            logger.warn(
                    "Insufficient stock. SKU: {}, Available: {}, Requested: {}",
                    dto.getSku(),
                    inventory.getAvailableStock(),
                    dto.getQuantity());

            throw new ServiceOperationException("Insufficient stock available.");
        }

        inventory.setAvailableStock(
                inventory.getAvailableStock() - dto.getQuantity());

        inventoryRepo.save(inventory);

        logger.info("Inventory updated successfully. Remaining Stock: {}",
                inventory.getAvailableStock());

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

        SalesOrder savedOrder = salesOrderRepo.save(order);

        logger.info("Sales Order created successfully. Order No: {}",
                savedOrder.getSalesOrderNo());

        return savedOrder;
    }

    // Update Sales Order
    public SalesOrder updateSalesOrder(
            String salesOrderNo,
            SalesOrderDto dto) {

        logger.info("Updating Sales Order. Order No: {}", salesOrderNo);

        SalesOrder order = salesOrderRepo.findBySalesOrderNo(salesOrderNo)
                .orElseThrow(() -> {
                    logger.warn("Sales Order not found for update. Order No: {}",
                            salesOrderNo);
                    return new ResourceNotFoundException(SO_NOT_FOUND);
                });

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

        SalesOrder updatedOrder = salesOrderRepo.save(order);

        logger.info("Sales Order updated successfully. Order No: {}",
                updatedOrder.getSalesOrderNo());

        return updatedOrder;
    }

    // Delete Sales Order
    public void deleteSalesOrder(String salesOrderNo) {

        logger.info("Deleting Sales Order. Order No: {}", salesOrderNo);

        SalesOrder order = salesOrderRepo.findBySalesOrderNo(salesOrderNo)
                .orElseThrow(() -> {
                    logger.warn("Sales Order not found for deletion. Order No: {}",
                            salesOrderNo);
                    return new ResourceNotFoundException(SO_NOT_FOUND);
                });

        salesOrderRepo.delete(order);

        logger.info("Sales Order deleted successfully. Order No: {}", salesOrderNo);
    }

    // Orders by Customer
    public List<SalesOrder> getOrdersByCustomer(String customerId) {

        logger.info("Fetching sales orders for Customer ID: {}", customerId);

        return salesOrderRepo.findByCustomerId(customerId);
    }

    // Orders by SKU
    public List<SalesOrder> getOrdersBySku(String sku) {

        logger.info("Fetching sales orders for SKU: {}", sku);

        return salesOrderRepo.findBySku(sku);
    }

    // Orders by Store
    public List<SalesOrder> getOrdersByStore(String storeId) {

        logger.info("Fetching sales orders for Store ID: {}", storeId);

        return salesOrderRepo.findByStoreId(storeId);
    }

    // Orders by Status
    public List<SalesOrder> getOrdersByStatus(String status) {

        logger.info("Fetching sales orders with Status: {}", status);

        return salesOrderRepo.findByOrderStatus(status);
    }
}