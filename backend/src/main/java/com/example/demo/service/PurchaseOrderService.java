package com.example.demo.service;

import com.example.demo.dto.PurchaseOrderDto;
import com.example.demo.exception.ResourceNotFoundException;
import com.example.demo.model.PurchaseOrder;
import com.example.demo.repository.PurchaseOrderRepository;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;

import java.math.BigDecimal;
import java.time.Instant;
import java.util.List;

@Service
public class PurchaseOrderService {

    private final PurchaseOrderRepository purchaseOrderRepo;

    public PurchaseOrderService(PurchaseOrderRepository purchaseOrderRepo) {
        this.purchaseOrderRepo = purchaseOrderRepo;
    }

    // Get All Purchase Orders
    public List<PurchaseOrder> getAllPurchaseOrders() {
        return purchaseOrderRepo.findAll();
    }

    // Pagination & Sorting
    public Page<PurchaseOrder> getPurchaseOrders(Pageable pageable) {
        return purchaseOrderRepo.findAll(pageable);
    }

    // Get Purchase Order by PO Number
    public PurchaseOrder getPurchaseOrder(String purchaseOrderNo) {

        return purchaseOrderRepo.findByPurchaseOrderNo(purchaseOrderNo)
                .orElseThrow(() ->
                        new ResourceNotFoundException("Purchase Order not found"));
    }

    // Create Purchase Order
    public PurchaseOrder createPurchaseOrder(PurchaseOrderDto dto) {

        if (purchaseOrderRepo.existsByPurchaseOrderNo(dto.getPurchaseOrderNo())) {
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

        return purchaseOrderRepo.save(order);
    }

    // Update Purchase Order
    public PurchaseOrder updatePurchaseOrder(
            String purchaseOrderNo,
            PurchaseOrderDto dto) {

        PurchaseOrder order = purchaseOrderRepo.findByPurchaseOrderNo(purchaseOrderNo)
                .orElseThrow(() ->
                        new ResourceNotFoundException("Purchase Order not found"));

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

        return purchaseOrderRepo.save(order);
    }

    // Delete Purchase Order
    public void deletePurchaseOrder(String purchaseOrderNo) {

        PurchaseOrder order = purchaseOrderRepo.findByPurchaseOrderNo(purchaseOrderNo)
                .orElseThrow(() ->
                        new ResourceNotFoundException("Purchase Order not found"));

        purchaseOrderRepo.delete(order);
    }

    // Search by Supplier
    public List<PurchaseOrder> getPurchaseOrdersBySupplier(String supplierCode) {

        return purchaseOrderRepo.findBySupplierCode(supplierCode);
    }

    // Search by SKU
    public List<PurchaseOrder> getPurchaseOrdersBySku(String sku) {

        return purchaseOrderRepo.findBySku(sku);
    }

    // Search by Store
    public List<PurchaseOrder> getPurchaseOrdersByStore(String storeId) {

        return purchaseOrderRepo.findByStoreId(storeId);
    }

    // Filter by Status
    public List<PurchaseOrder> getPurchaseOrdersByStatus(String status) {

        return purchaseOrderRepo.findByStatus(status);
    }

}