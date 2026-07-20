package com.example.demo.repository;

import com.example.demo.model.product;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;
import java.util.Optional;

public interface productRepository extends JpaRepository<product, Long> {

    // Find product using SKU and Store ID
    Optional<product> findBySkuAndStoreId(String sku, String storeId);

    // Check duplicate SKU in a store
    boolean existsBySkuAndStoreId(String sku, String storeId);

    // Search by product name
    List<product> findByProductNameContainingIgnoreCase(String productName);

    // Search by SKU
    List<product> findBySkuContainingIgnoreCase(String sku);

    // Search by Store
    List<product> findByStoreId(String storeId);

}