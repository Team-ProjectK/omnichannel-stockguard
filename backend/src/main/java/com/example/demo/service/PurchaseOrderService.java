package com.example.demo.service;

import com.example.demo.dto.PurchaseOrderDto;
import com.example.demo.exception.ResourceNotFoundException;
import com.example.demo.model.PurchaseOrder;
import com.example.demo.repository.PurchaseOrderRepository;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;

import java.math.BigDecimal;
import java.time.Instant;
import java.util.List;

@Service
public class PurchaseOrderService {

    private static final Logger logger = LoggerFactory.getLogger(PurchaseOrderService.class);

    private final PurchaseOrderRepository purchaseOrderRepo;

    public PurchaseOrderService(PurchaseOrderRepository purchaseOrderRepo) {
        this.purchaseOrderRepo = purchaseOrderRepo;
    }

    // Get All Purchase Orders
    public List<PurchaseOrder> getAllPurchaseOrders() {

        logger.info("Fetching all purchase orders");

        return purchaseOrderRepo.findAll();
    }

    // Pagination & Sorting
    public Page<PurchaseOrder> getPurchaseOrders(Pageable pageable) {

        logger.info("Fetching purchase orders with pagination");

        return purchaseOrderRepo.findAll(pageable);
    }

    // Get Purchase Order by PO Number
    public PurchaseOrder getPurchaseOrder(String purchaseOrderNo) {

        logger.info("Fetching purchase order with PO Number: {}", purchaseOrderNo);

        return purchaseOrderRepo.findByPurchaseOrderNo(purchaseOrderNo)
                .orElseThrow(() -> {
                    logger.warn("Purchase Order not found. PO Number: {}", purchaseOrderNo);
                    return new ResourceNotFoundException("Purchase Order not found");
                });
    }

    // Create Purchase Order
    public PurchaseOrder createPurchaseOrder(PurchaseOrderDto dto) {

        logger.info("Creating purchase order with PO Number: {}", dto.getPurchaseOrderNo());

        if (purchaseOrderRepo.existsByPurchaseOrderNo(dto.getPurchaseOrderNo())) {

            logger.warn("Purchase Order already exists. PO Number: {}", dto.getPurchaseOrderNo());

            throw new RuntimeException("Purchase Order already exists.");
        }

        PurchaseOrder order = new PurchaseOrder();

        order.setPurchaseOrderNo(dto.getPurchaseOrderNo());
        order.setSupplierCode(dto.getSupplierCode());
        order.setSku(dto.getSku());
        order.setStoreId(dto.getStoreId());
        order.setQuantity(dto.getQuantity());
        order.setUnitPrice(dto.getUnitPrice());

        // Auto Calculate Total Amount
        BigDecimal totalAmount = dto.getUnitPrice()
                .multiply(BigDecimal.valueOf(dto.getQuantity()));

        order.setTotalAmount(totalAmount);

        order.setStatus(dto.getStatus());
        order.setOrderDate(Instant.now());
        order.setExpectedDeliveryDate(dto.getExpectedDeliveryDate());

        PurchaseOrder savedOrder = purchaseOrderRepo.save(order);

        logger.info("Purchase Order created successfully. PO Number: {}",
                savedOrder.getPurchaseOrderNo());

        return savedOrder;
    }

    // Update Purchase Order
    public PurchaseOrder updatePurchaseOrder(
            String purchaseOrderNo,
            PurchaseOrderDto dto) {

        logger.info("Updating Purchase Order. PO Number: {}", purchaseOrderNo);

        PurchaseOrder order = purchaseOrderRepo.findByPurchaseOrderNo(purchaseOrderNo)
                .orElseThrow(() -> {
                    logger.warn("Purchase Order not found for update. PO Number: {}",
                            purchaseOrderNo);
                    return new ResourceNotFoundException("Purchase Order not found");
                });

        order.setSupplierCode(dto.getSupplierCode());
        order.setSku(dto.getSku());
        order.setStoreId(dto.getStoreId());
        order.setQuantity(dto.getQuantity());
        order.setUnitPrice(dto.getUnitPrice());

        // Recalculate Total Amount
        BigDecimal totalAmount = dto.getUnitPrice()
                .multiply(BigDecimal.valueOf(dto.getQuantity()));

        order.setTotalAmount(totalAmount);

        order.setStatus(dto.getStatus());
        order.setExpectedDeliveryDate(dto.getExpectedDeliveryDate());

        PurchaseOrder updatedOrder = purchaseOrderRepo.save(order);

        logger.info("Purchase Order updated successfully. PO Number: {}",
                updatedOrder.getPurchaseOrderNo());

        return updatedOrder;
    }

    // Delete Purchase Order
    public void deletePurchaseOrder(String purchaseOrderNo) {

        logger.info("Deleting Purchase Order. PO Number: {}", purchaseOrderNo);

        PurchaseOrder order = purchaseOrderRepo.findByPurchaseOrderNo(purchaseOrderNo)
                .orElseThrow(() -> {
                    logger.warn("Purchase Order not found for deletion. PO Number: {}",
                            purchaseOrderNo);
                    return new ResourceNotFoundException("Purchase Order not found");
                });

        purchaseOrderRepo.delete(order);

        logger.info("Purchase Order deleted successfully. PO Number: {}", purchaseOrderNo);
    }

    // Search by Supplier
    public List<PurchaseOrder> getPurchaseOrdersBySupplier(String supplierCode) {

        logger.info("Fetching purchase orders for Supplier Code: {}", supplierCode);

        return purchaseOrderRepo.findBySupplierCode(supplierCode);
    }

    // Search by SKU
    public List<PurchaseOrder> getPurchaseOrdersBySku(String sku) {

        logger.info("Fetching purchase orders for SKU: {}", sku);

        return purchaseOrderRepo.findBySku(sku);
    }

    // Search by Store
    public List<PurchaseOrder> getPurchaseOrdersByStore(String storeId) {

        logger.info("Fetching purchase orders for Store ID: {}", storeId);

        return purchaseOrderRepo.findByStoreId(storeId);
    }

    // Filter by Status
    public List<PurchaseOrder> getPurchaseOrdersByStatus(String status) {

        logger.info("Fetching purchase orders with status: {}", status);

        return purchaseOrderRepo.findByStatus(status);
    }

}