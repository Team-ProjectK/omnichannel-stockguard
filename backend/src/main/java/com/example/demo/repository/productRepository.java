package com.example.demo.repository;

import com.example.demo.model.product;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.Optional;

public interface productRepository extends JpaRepository<product, Long> {

    Optional<product> findBySkuAndStoreId(String sku, String storeId);

}