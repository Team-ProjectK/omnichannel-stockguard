package com.example.demo.repository;

import com.example.demo.model.SalesOrder;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;
import java.util.Optional;

public interface SalesOrderRepository extends JpaRepository<SalesOrder, Long> {

    // Find by Sales Order Number
    Optional<SalesOrder> findBySalesOrderNo(String salesOrderNo);

    // Duplicate Check
    boolean existsBySalesOrderNo(String salesOrderNo);

    // Orders by Customer
    List<SalesOrder> findByCustomerId(String customerId);

    // Orders by Product
    List<SalesOrder> findBySku(String sku);

    // Orders by Store
    List<SalesOrder> findByStoreId(String storeId);

    // Orders by Status
    List<SalesOrder> findByOrderStatus(String orderStatus);

}