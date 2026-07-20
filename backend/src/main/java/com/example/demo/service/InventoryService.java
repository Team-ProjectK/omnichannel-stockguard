package com.example.demo.service;

import com.example.demo.dto.InventoryDto;
import com.example.demo.exception.ResourceNotFoundException;
import com.example.demo.model.Inventory;
import com.example.demo.repository.InventoryRepository;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;

import java.time.Instant;
import java.util.List;

@Service
public class InventoryService {

    private final InventoryRepository inventoryRepo;

    public InventoryService(InventoryRepository inventoryRepo) {
        this.inventoryRepo = inventoryRepo;
    }

    // Get All Inventory
    public List<Inventory> getAllInventory() {
        return inventoryRepo.findAll();
    }

    // Pagination
    public Page<Inventory> getInventory(Pageable pageable) {
        return inventoryRepo.findAll(pageable);
    }

    // Get Inventory by SKU & Store
    public Inventory getInventory(String sku, String storeId) {

        return inventoryRepo.findBySkuAndStoreId(sku, storeId)
                .orElseThrow(() ->
                        new ResourceNotFoundException("Inventory not found"));
    }

    // Create Inventory
    public Inventory createInventory(InventoryDto dto) {

        if (inventoryRepo.existsBySkuAndStoreId(dto.getSku(), dto.getStoreId())) {
            throw new RuntimeException("Inventory already exists.");
        }

        Inventory inventory = new Inventory();

        inventory.setSku(dto.getSku());
        inventory.setStoreId(dto.getStoreId());
        inventory.setAvailableStock(dto.getAvailableStock());
        inventory.setReservedStock(dto.getReservedStock());
        inventory.setDamagedStock(dto.getDamagedStock());
        inventory.setLastUpdated(Instant.now());

        return inventoryRepo.save(inventory);
    }

    // Update Inventory
    public Inventory updateInventory(
            String sku,
            String storeId,
            InventoryDto dto) {

        Inventory inventory = inventoryRepo.findBySkuAndStoreId(sku, storeId)
                .orElseThrow(() ->
                        new ResourceNotFoundException("Inventory not found"));

        inventory.setAvailableStock(dto.getAvailableStock());
        inventory.setReservedStock(dto.getReservedStock());
        inventory.setDamagedStock(dto.getDamagedStock());
        inventory.setLastUpdated(Instant.now());

        return inventoryRepo.save(inventory);
    }

    // Delete Inventory
    public void deleteInventory(String sku, String storeId) {

        Inventory inventory = inventoryRepo.findBySkuAndStoreId(sku, storeId)
                .orElseThrow(() ->
                        new ResourceNotFoundException("Inventory not found"));

        inventoryRepo.delete(inventory);
    }

    // Search by Store
    public List<Inventory> getInventoryByStore(String storeId) {
        return inventoryRepo.findByStoreId(storeId);
    }

    // Search by SKU
    public List<Inventory> getInventoryBySku(String sku) {
        return inventoryRepo.findBySku(sku);
    }

    // Low Stock
    public List<Inventory> getLowStockItems(Integer threshold) {
        return inventoryRepo.findByAvailableStockLessThanEqual(threshold);
    }

}