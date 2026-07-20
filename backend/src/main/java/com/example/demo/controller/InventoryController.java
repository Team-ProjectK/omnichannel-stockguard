package com.example.demo.controller;

import com.example.demo.dto.InventoryDto;
import com.example.demo.model.Inventory;
import com.example.demo.service.InventoryService;
import jakarta.validation.Valid;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/inventory")
@CrossOrigin(origins = "*")
public class InventoryController {

    private final InventoryService inventoryService;

    public InventoryController(InventoryService inventoryService) {
        this.inventoryService = inventoryService;
    }

    // Get all inventory
    @GetMapping
    public ResponseEntity<List<Inventory>> getAllInventory() {

        return ResponseEntity.ok(inventoryService.getAllInventory());
    }

    // Pagination & Sorting
    @GetMapping("/page")
    public ResponseEntity<Page<Inventory>> getInventory(Pageable pageable) {

        return ResponseEntity.ok(inventoryService.getInventory(pageable));
    }

    // Get inventory by SKU and Store
    @GetMapping("/{sku}/{storeId}")
    public ResponseEntity<Inventory> getInventory(
            @PathVariable String sku,
            @PathVariable String storeId) {

        return ResponseEntity.ok(
                inventoryService.getInventory(sku, storeId));
    }

    // Create inventory
    @PostMapping
    public ResponseEntity<Inventory> createInventory(
            @Valid @RequestBody InventoryDto dto) {

        Inventory inventory = inventoryService.createInventory(dto);

        return new ResponseEntity<>(inventory, HttpStatus.CREATED);
    }

    // Update inventory
    @PutMapping("/{sku}/{storeId}")
    public ResponseEntity<Inventory> updateInventory(
            @PathVariable String sku,
            @PathVariable String storeId,
            @Valid @RequestBody InventoryDto dto) {

        Inventory inventory =
                inventoryService.updateInventory(sku, storeId, dto);

        return ResponseEntity.ok(inventory);
    }

    // Delete inventory
    @DeleteMapping("/{sku}/{storeId}")
    public ResponseEntity<Void> deleteInventory(
            @PathVariable String sku,
            @PathVariable String storeId) {

        inventoryService.deleteInventory(sku, storeId);

        return ResponseEntity.noContent().build();
    }

    // Inventory by Store
    @GetMapping("/store/{storeId}")
    public ResponseEntity<List<Inventory>> getInventoryByStore(
            @PathVariable String storeId) {

        return ResponseEntity.ok(
                inventoryService.getInventoryByStore(storeId));
    }

    // Inventory by SKU
    @GetMapping("/sku/{sku}")
    public ResponseEntity<List<Inventory>> getInventoryBySku(
            @PathVariable String sku) {

        return ResponseEntity.ok(
                inventoryService.getInventoryBySku(sku));
    }

    // Low Stock
    @GetMapping("/low-stock")
    public ResponseEntity<List<Inventory>> getLowStockItems(
            @RequestParam Integer threshold) {

        return ResponseEntity.ok(
                inventoryService.getLowStockItems(threshold));
    }

}