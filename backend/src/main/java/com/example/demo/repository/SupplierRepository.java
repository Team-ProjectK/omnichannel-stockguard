package com.example.demo.repository;

import com.example.demo.model.Supplier;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;
import java.util.Optional;

public interface SupplierRepository extends JpaRepository<Supplier, Long> {

    // Find supplier by supplier code
    Optional<Supplier> findBySupplierCode(String supplierCode);

    // Check duplicate supplier code
    boolean existsBySupplierCode(String supplierCode);

    // Check duplicate email
    boolean existsByEmail(String email);

    // Search supplier by name
    List<Supplier> findBySupplierNameContainingIgnoreCase(String supplierName);

    // Filter suppliers by status
    List<Supplier> findByStatus(String status);

}