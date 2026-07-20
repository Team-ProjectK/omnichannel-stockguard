package com.example.demo.service;

import com.example.demo.dto.SupplierDto;
import com.example.demo.exception.ResourceNotFoundException;
import com.example.demo.model.Supplier;
import com.example.demo.repository.SupplierRepository;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;

import java.time.Instant;
import java.util.List;

@Service
public class SupplierService {

    private final SupplierRepository supplierRepo;

    public SupplierService(SupplierRepository supplierRepo) {
        this.supplierRepo = supplierRepo;
    }

    // Get All Suppliers
    public List<Supplier> getAllSuppliers() {
        return supplierRepo.findAll();
    }

    // Pagination & Sorting
    public Page<Supplier> getSuppliers(Pageable pageable) {
        return supplierRepo.findAll(pageable);
    }

    // Get Supplier by Code
    public Supplier getSupplier(String supplierCode) {

        return supplierRepo.findBySupplierCode(supplierCode)
                .orElseThrow(() ->
                        new ResourceNotFoundException("Supplier not found"));
    }

    // Create Supplier
    public Supplier createSupplier(SupplierDto dto) {

        if (supplierRepo.existsBySupplierCode(dto.getSupplierCode())) {
            throw new RuntimeException("Supplier code already exists.");
        }

        if (supplierRepo.existsByEmail(dto.getEmail())) {
            throw new RuntimeException("Email already exists.");
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

        return supplierRepo.save(supplier);
    }

    // Update Supplier
    public Supplier updateSupplier(
            String supplierCode,
            SupplierDto dto) {

        Supplier supplier = supplierRepo.findBySupplierCode(supplierCode)
                .orElseThrow(() ->
                        new ResourceNotFoundException("Supplier not found"));

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

        return supplierRepo.save(supplier);
    }

    // Delete Supplier
    public void deleteSupplier(String supplierCode) {

        Supplier supplier = supplierRepo.findBySupplierCode(supplierCode)
                .orElseThrow(() ->
                        new ResourceNotFoundException("Supplier not found"));

        supplierRepo.delete(supplier);
    }

    // Search Supplier by Name
    public List<Supplier> searchSuppliers(String keyword) {

        return supplierRepo.findBySupplierNameContainingIgnoreCase(keyword);
    }

    // Filter by Status
    public List<Supplier> getSuppliersByStatus(String status) {

        return supplierRepo.findByStatus(status);
    }

}