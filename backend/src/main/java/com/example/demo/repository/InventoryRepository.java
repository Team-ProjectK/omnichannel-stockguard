package com.example.demo.repository;

import com.example.demo.model.Inventory;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;
import java.util.Optional;

public interface InventoryRepository extends JpaRepository<Inventory, Long> {

    // Find inventory by SKU and Store
    Optional<Inventory> findBySkuAndStoreId(String sku, String storeId);

    // Check duplicate inventory
    boolean existsBySkuAndStoreId(String sku, String storeId);

    // Get all inventory for a store
    List<Inventory> findByStoreId(String storeId);

    // Get inventory for a SKU
    List<Inventory> findBySku(String sku);

    // Low stock alert
    List<Inventory> findByAvailableStockLessThanEqual(Integer stock);

}