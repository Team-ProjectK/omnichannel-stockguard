package com.example.demo.repository;

import com.example.demo.model.PurchaseOrder;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;
import java.util.Optional;

public interface PurchaseOrderRepository extends JpaRepository<PurchaseOrder, Long> {

    // Find Purchase Order by PO Number
    Optional<PurchaseOrder> findByPurchaseOrderNo(String purchaseOrderNo);

    // Check duplicate PO Number
    boolean existsByPurchaseOrderNo(String purchaseOrderNo);

    // Purchase Orders by Supplier
    List<PurchaseOrder> findBySupplierCode(String supplierCode);

    // Purchase Orders by SKU
    List<PurchaseOrder> findBySku(String sku);

    // Purchase Orders by Store
    List<PurchaseOrder> findByStoreId(String storeId);

    // Purchase Orders by Status
    List<PurchaseOrder> findByStatus(String status);

}