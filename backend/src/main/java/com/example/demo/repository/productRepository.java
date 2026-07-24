package com.example.demo.repository;

import com.example.demo.model.Product;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;
import java.util.Optional;

public interface ProductRepository extends JpaRepository<Product, Long> {

    // Find product using SKU and Store ID
    Optional<Product> findBySkuAndStoreId(String sku, String storeId);

    // Check duplicate SKU in a store
    boolean existsBySkuAndStoreId(String sku, String storeId);

    // Search by product name
    List<Product> findByProductNameContainingIgnoreCase(String productName);

    // Search by SKU
    List<Product> findBySkuContainingIgnoreCase(String sku);

    // Search by Store
    List<Product> findByStoreId(String storeId);
}
