package com.example.demo.service;

import com.example.demo.dto.SupplierDto;
import com.example.demo.exception.ResourceNotFoundException;
import com.example.demo.exception.ServiceOperationException;
import com.example.demo.model.Supplier;
import com.example.demo.repository.SupplierRepository;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;

import java.time.Instant;
import java.util.List;

@Service
public class SupplierService {

    private static final Logger logger = LoggerFactory.getLogger(SupplierService.class);
    private static final String SUPPLIER_NOT_FOUND = "Supplier not found";

    private final SupplierRepository supplierRepo;

    public SupplierService(SupplierRepository supplierRepo) {
        this.supplierRepo = supplierRepo;
    }

    // Get All Suppliers
    public List<Supplier> getAllSuppliers() {

        logger.info("Fetching all suppliers");

        return supplierRepo.findAll();
    }

    // Pagination & Sorting
    public Page<Supplier> getSuppliers(Pageable pageable) {

        logger.info("Fetching suppliers with pagination");

        return supplierRepo.findAll(pageable);
    }

    // Get Supplier by Code
    public Supplier getSupplier(String supplierCode) {

        logger.info("Fetching supplier with Code: {}", supplierCode);

        return supplierRepo.findBySupplierCode(supplierCode)
                .orElseThrow(() -> {
                    logger.warn("Supplier not found. Code: {}", supplierCode);
                    return new ResourceNotFoundException(SUPPLIER_NOT_FOUND);
                });
    }

    // Create Supplier
    public Supplier createSupplier(SupplierDto dto) {

        logger.info("Creating supplier with Code: {}", dto.getSupplierCode());

        if (supplierRepo.existsBySupplierCode(dto.getSupplierCode())) {

            logger.warn("Supplier code already exists: {}", dto.getSupplierCode());

            throw new ServiceOperationException("Supplier code already exists.");
        }

        if (supplierRepo.existsByEmail(dto.getEmail())) {

            logger.warn("Supplier email already exists: {}", dto.getEmail());

            throw new ServiceOperationException("Email already exists.");
        }

        Supplier supplier = new Supplier();

        supplier.setSupplierCode(dto.getSupplierCode());
        supplier.setSupplierName(dto.getSupplierName());
        supplier.setContactPerson(dto.getContactPerson());
        supplier.setEmail(dto.getEmail());
        supplier.setPhone(dto.getPhone());
        supplier.setAddress(dto.getAddress());
        supplier.setCity(dto.getCity());
        supplier.setState(dto.getState());
        supplier.setCountry(dto.getCountry());
        supplier.setStatus(dto.getStatus());

        supplier.setCreatedAt(Instant.now());
        supplier.setUpdatedAt(Instant.now());

        Supplier savedSupplier = supplierRepo.save(supplier);

        logger.info("Supplier created successfully. Code: {}", savedSupplier.getSupplierCode());

        return savedSupplier;
    }

    // Update Supplier
    public Supplier updateSupplier(
            String supplierCode,
            SupplierDto dto) {

        logger.info("Updating supplier with Code: {}", supplierCode);

        Supplier supplier = supplierRepo.findBySupplierCode(supplierCode)
                .orElseThrow(() -> {
                    logger.warn("Supplier not found for update. Code: {}", supplierCode);
                    return new ResourceNotFoundException(SUPPLIER_NOT_FOUND);
                });

        supplier.setSupplierName(dto.getSupplierName());
        supplier.setContactPerson(dto.getContactPerson());
        supplier.setEmail(dto.getEmail());
        supplier.setPhone(dto.getPhone());
        supplier.setAddress(dto.getAddress());
        supplier.setCity(dto.getCity());
        supplier.setState(dto.getState());
        supplier.setCountry(dto.getCountry());
        supplier.setStatus(dto.getStatus());

        supplier.setUpdatedAt(Instant.now());

        Supplier updatedSupplier = supplierRepo.save(supplier);

        logger.info("Supplier updated successfully. Code: {}", updatedSupplier.getSupplierCode());

        return updatedSupplier;
    }

    // Delete Supplier
    public void deleteSupplier(String supplierCode) {

        logger.info("Deleting supplier with Code: {}", supplierCode);

        Supplier supplier = supplierRepo.findBySupplierCode(supplierCode)
                .orElseThrow(() -> {
                    logger.warn("Supplier not found for deletion. Code: {}", supplierCode);
                    return new ResourceNotFoundException(SUPPLIER_NOT_FOUND);
                });

        supplierRepo.delete(supplier);

        logger.info("Supplier deleted successfully. Code: {}", supplierCode);
    }

    // Search Supplier by Name
    public List<Supplier> searchSuppliers(String keyword) {

        logger.info("Searching suppliers with keyword: {}", keyword);

        return supplierRepo.findBySupplierNameContainingIgnoreCase(keyword);
    }

    // Filter by Status
    public List<Supplier> getSuppliersByStatus(String status) {

        logger.info("Fetching suppliers with status: {}", status);

        return supplierRepo.findByStatus(status);
    }
}