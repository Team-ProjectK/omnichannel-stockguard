package com.example.demo.controller;

import com.example.demo.dto.SalesOrderDto;
import com.example.demo.model.SalesOrder;
import com.example.demo.service.SalesOrderService;
import jakarta.validation.Valid;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/sales-orders")
@CrossOrigin(origins = "*")
public class SalesOrderController {

    private final SalesOrderService salesOrderService;

    public SalesOrderController(SalesOrderService salesOrderService) {
        this.salesOrderService = salesOrderService;
    }

    // Get All Sales Orders
    @GetMapping
    public ResponseEntity<List<SalesOrder>> getAllSalesOrders() {
        return ResponseEntity.ok(
                salesOrderService.getAllSalesOrders());
    }

    // Pagination & Sorting
    @GetMapping("/page")
    public ResponseEntity<Page<SalesOrder>> getSalesOrders(
            Pageable pageable) {

        return ResponseEntity.ok(
                salesOrderService.getSalesOrders(pageable));
    }

    // Get Sales Order by Order Number
    @GetMapping("/{salesOrderNo}")
    public ResponseEntity<SalesOrder> getSalesOrder(
            @PathVariable String salesOrderNo) {

        return ResponseEntity.ok(
                salesOrderService.getSalesOrder(salesOrderNo));
    }

    // Create Sales Order
    @PostMapping
    public ResponseEntity<SalesOrder> createSalesOrder(
            @Valid @RequestBody SalesOrderDto dto) {

        SalesOrder order =
                salesOrderService.createSalesOrder(dto);

        return new ResponseEntity<>(order, HttpStatus.CREATED);
    }

    // Update Sales Order
    @PutMapping("/{salesOrderNo}")
    public ResponseEntity<SalesOrder> updateSalesOrder(
            @PathVariable String salesOrderNo,
            @Valid @RequestBody SalesOrderDto dto) {

        SalesOrder order =
                salesOrderService.updateSalesOrder(
                        salesOrderNo,
                        dto);

        return ResponseEntity.ok(order);
    }

    // Delete Sales Order
    @DeleteMapping("/{salesOrderNo}")
    public ResponseEntity<Void> deleteSalesOrder(
            @PathVariable String salesOrderNo) {

        salesOrderService.deleteSalesOrder(salesOrderNo);

        return ResponseEntity.noContent().build();
    }

    // Orders by Customer
    @GetMapping("/customer/{customerId}")
    public ResponseEntity<List<SalesOrder>> getOrdersByCustomer(
            @PathVariable String customerId) {

        return ResponseEntity.ok(
                salesOrderService.getOrdersByCustomer(customerId));
    }

    // Orders by SKU
    @GetMapping("/sku/{sku}")
    public ResponseEntity<List<SalesOrder>> getOrdersBySku(
            @PathVariable String sku) {

        return ResponseEntity.ok(
                salesOrderService.getOrdersBySku(sku));
    }

    // Orders by Store
    @GetMapping("/store/{storeId}")
    public ResponseEntity<List<SalesOrder>> getOrdersByStore(
            @PathVariable String storeId) {

        return ResponseEntity.ok(
                salesOrderService.getOrdersByStore(storeId));
    }

    // Orders by Status
    @GetMapping("/status/{status}")
    public ResponseEntity<List<SalesOrder>> getOrdersByStatus(
            @PathVariable String status) {

        return ResponseEntity.ok(
                salesOrderService.getOrdersByStatus(status));
    }
}