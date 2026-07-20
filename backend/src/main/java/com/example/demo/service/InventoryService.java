package com.example.demo.service;

import com.example.demo.dto.InventoryDto;
import com.example.demo.exception.ResourceNotFoundException;
import com.example.demo.model.Inventory;
import com.example.demo.repository.InventoryRepository;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;

import java.time.Instant;
import java.util.List;

@Service
public class InventoryService {

    private static final Logger logger = LoggerFactory.getLogger(InventoryService.class);

    private final InventoryRepository inventoryRepo;

    public InventoryService(InventoryRepository inventoryRepo) {
        this.inventoryRepo = inventoryRepo;
    }

    // Get All Inventory
    public List<Inventory> getAllInventory() {

        logger.info("Fetching all inventory records");

        return inventoryRepo.findAll();
    }

    // Pagination
    public Page<Inventory> getInventory(Pageable pageable) {

        logger.info("Fetching inventory records with pagination");

        return inventoryRepo.findAll(pageable);
    }

    // Get Inventory by SKU & Store
    public Inventory getInventory(String sku, String storeId) {

        logger.info("Fetching inventory for SKU: {} and Store ID: {}", sku, storeId);

        return inventoryRepo.findBySkuAndStoreId(sku, storeId)
                .orElseThrow(() -> {
                    logger.warn("Inventory not found. SKU: {}, Store ID: {}", sku, storeId);
                    return new ResourceNotFoundException("Inventory not found");
                });
    }

    // Create Inventory
    public Inventory createInventory(InventoryDto dto) {

        logger.info("Creating inventory for SKU: {} at Store ID: {}",
                dto.getSku(), dto.getStoreId());

        if (inventoryRepo.existsBySkuAndStoreId(dto.getSku(), dto.getStoreId())) {

            logger.warn("Inventory already exists. SKU: {}, Store ID: {}",
                    dto.getSku(), dto.getStoreId());

            throw new RuntimeException("Inventory already exists.");
        }

        Inventory inventory = new Inventory();

        inventory.setSku(dto.getSku());
        inventory.setStoreId(dto.getStoreId());
        inventory.setAvailableStock(dto.getAvailableStock());
        inventory.setReservedStock(dto.getReservedStock());
        inventory.setDamagedStock(dto.getDamagedStock());
        inventory.setLastUpdated(Instant.now());

        Inventory savedInventory = inventoryRepo.save(inventory);

        logger.info("Inventory created successfully. SKU: {}, Store ID: {}",
                savedInventory.getSku(), savedInventory.getStoreId());

        return savedInventory;
    }

    // Update Inventory
    public Inventory updateInventory(
            String sku,
            String storeId,
            InventoryDto dto) {

        logger.info("Updating inventory. SKU: {}, Store ID: {}", sku, storeId);

        Inventory inventory = inventoryRepo.findBySkuAndStoreId(sku, storeId)
                .orElseThrow(() -> {
                    logger.warn("Inventory not found for update. SKU: {}, Store ID: {}",
                            sku, storeId);
                    return new ResourceNotFoundException("Inventory not found");
                });

        inventory.setAvailableStock(dto.getAvailableStock());
        inventory.setReservedStock(dto.getReservedStock());
        inventory.setDamagedStock(dto.getDamagedStock());
        inventory.setLastUpdated(Instant.now());

        Inventory updatedInventory = inventoryRepo.save(inventory);

        logger.info("Inventory updated successfully. SKU: {}, Store ID: {}",
                sku, storeId);

        return updatedInventory;
    }

    // Delete Inventory
    public void deleteInventory(String sku, String storeId) {

        logger.info("Deleting inventory. SKU: {}, Store ID: {}", sku, storeId);

        Inventory inventory = inventoryRepo.findBySkuAndStoreId(sku, storeId)
                .orElseThrow(() -> {
                    logger.warn("Inventory not found for deletion. SKU: {}, Store ID: {}",
                            sku, storeId);
                    return new ResourceNotFoundException("Inventory not found");
                });

        inventoryRepo.delete(inventory);

        logger.info("Inventory deleted successfully. SKU: {}, Store ID: {}",
                sku, storeId);
    }

    // Search by Store
    public List<Inventory> getInventoryByStore(String storeId) {

        logger.info("Fetching inventory for Store ID: {}", storeId);

        return inventoryRepo.findByStoreId(storeId);
    }

    // Search by SKU
    public List<Inventory> getInventoryBySku(String sku) {

        logger.info("Fetching inventory for SKU: {}", sku);

        return inventoryRepo.findBySku(sku);
    }

    // Low Stock
    public List<Inventory> getLowStockItems(Integer threshold) {

        logger.info("Fetching low stock items with threshold: {}", threshold);

        List<Inventory> lowStockItems =
                inventoryRepo.findByAvailableStockLessThanEqual(threshold);

        logger.info("Found {} low stock item(s)", lowStockItems.size());

        return lowStockItems;
    }
}