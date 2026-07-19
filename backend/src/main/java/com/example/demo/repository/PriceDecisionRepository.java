package com.example.demo.repository;

import com.example.demo.model.PriceDecision;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface PriceDecisionRepository extends JpaRepository<PriceDecision, Long> {

    List<PriceDecision> findBySkuAndStoreIdOrderByTimestampAsc(String sku, String storeId);

}