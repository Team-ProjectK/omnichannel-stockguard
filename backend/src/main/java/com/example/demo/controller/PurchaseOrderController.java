package com.example.demo.controller;

import com.example.demo.dto.PurchaseOrderDto;
import com.example.demo.model.PurchaseOrder;
import com.example.demo.service.PurchaseOrderService;
import jakarta.validation.Valid;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/purchase-orders")
@CrossOrigin(origins = "*")
public class PurchaseOrderController {

    private final PurchaseOrderService purchaseOrderService;

    public PurchaseOrderController(PurchaseOrderService purchaseOrderService) {
        this.purchaseOrderService = purchaseOrderService;
    }

    // Get All Purchase Orders
    @GetMapping
    public ResponseEntity<List<PurchaseOrder>> getAllPurchaseOrders() {

        return ResponseEntity.ok(
                purchaseOrderService.getAllPurchaseOrders());
    }

    // Pagination & Sorting
    @GetMapping("/page")
    public ResponseEntity<Page<PurchaseOrder>> getPurchaseOrders(
            Pageable pageable) {

        return ResponseEntity.ok(
                purchaseOrderService.getPurchaseOrders(pageable));
    }

    // Get Purchase Order By PO Number
    @GetMapping("/{purchaseOrderNo}")
    public ResponseEntity<PurchaseOrder> getPurchaseOrder(
            @PathVariable String purchaseOrderNo) {

        return ResponseEntity.ok(
                purchaseOrderService.getPurchaseOrder(purchaseOrderNo));
    }

    // Create Purchase Order
    @PostMapping
    public ResponseEntity<PurchaseOrder> createPurchaseOrder(
            @Valid @RequestBody PurchaseOrderDto dto) {

        PurchaseOrder order =
                purchaseOrderService.createPurchaseOrder(dto);

        return new ResponseEntity<>(order, HttpStatus.CREATED);
    }

    // Update Purchase Order
    @PutMapping("/{purchaseOrderNo}")
    public ResponseEntity<PurchaseOrder> updatePurchaseOrder(
            @PathVariable String purchaseOrderNo,
            @Valid @RequestBody PurchaseOrderDto dto) {

        PurchaseOrder order =
                purchaseOrderService.updatePurchaseOrder(
                        purchaseOrderNo,
                        dto);

        return ResponseEntity.ok(order);
    }

    // Delete Purchase Order
    @DeleteMapping("/{purchaseOrderNo}")
    public ResponseEntity<Void> deletePurchaseOrder(
            @PathVariable String purchaseOrderNo) {

        purchaseOrderService.deletePurchaseOrder(purchaseOrderNo);

        return ResponseEntity.noContent().build();
    }

    // Get Orders by Supplier
    @GetMapping("/supplier/{supplierCode}")
    public ResponseEntity<List<PurchaseOrder>> getOrdersBySupplier(
            @PathVariable String supplierCode) {

        return ResponseEntity.ok(
                purchaseOrderService.getPurchaseOrdersBySupplier(supplierCode));
    }

    // Get Orders by SKU
    @GetMapping("/sku/{sku}")
    public ResponseEntity<List<PurchaseOrder>> getOrdersBySku(
            @PathVariable String sku) {

        return ResponseEntity.ok(
                purchaseOrderService.getPurchaseOrdersBySku(sku));
    }

    // Get Orders by Store
    @GetMapping("/store/{storeId}")
    public ResponseEntity<List<PurchaseOrder>> getOrdersByStore(
            @PathVariable String storeId) {

        return ResponseEntity.ok(
                purchaseOrderService.getPurchaseOrdersByStore(storeId));
    }

    // Get Orders by Status
    @GetMapping("/status/{status}")
    public ResponseEntity<List<PurchaseOrder>> getOrdersByStatus(
            @PathVariable String status) {

        return ResponseEntity.ok(
                purchaseOrderService.getPurchaseOrdersByStatus(status));
    }
}