package com.example.demo.controller;

import com.example.demo.dto.SupplierDto;
import com.example.demo.model.Supplier;
import com.example.demo.service.SupplierService;
import jakarta.validation.Valid;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/suppliers")
@CrossOrigin(origins = "*")
public class SupplierController {

    private final SupplierService supplierService;

    public SupplierController(SupplierService supplierService) {
        this.supplierService = supplierService;
    }

    // Get All Suppliers
    @GetMapping
    public ResponseEntity<List<Supplier>> getAllSuppliers() {

        return ResponseEntity.ok(supplierService.getAllSuppliers());
    }

    // Pagination & Sorting
    @GetMapping("/page")
    public ResponseEntity<Page<Supplier>> getSuppliers(Pageable pageable) {

        return ResponseEntity.ok(supplierService.getSuppliers(pageable));
    }

    // Get Supplier By Code
    @GetMapping("/{supplierCode}")
    public ResponseEntity<Supplier> getSupplier(
            @PathVariable String supplierCode) {

        return ResponseEntity.ok(
                supplierService.getSupplier(supplierCode));
    }

    // Create Supplier
    @PostMapping
    public ResponseEntity<Supplier> createSupplier(
            @Valid @RequestBody SupplierDto dto) {

        Supplier supplier = supplierService.createSupplier(dto);

        return new ResponseEntity<>(supplier, HttpStatus.CREATED);
    }

    // Update Supplier
    @PutMapping("/{supplierCode}")
    public ResponseEntity<Supplier> updateSupplier(
            @PathVariable String supplierCode,
            @Valid @RequestBody SupplierDto dto) {

        Supplier supplier =
                supplierService.updateSupplier(supplierCode, dto);

        return ResponseEntity.ok(supplier);
    }

    // Delete Supplier
    @DeleteMapping("/{supplierCode}")
    public ResponseEntity<Void> deleteSupplier(
            @PathVariable String supplierCode) {

        supplierService.deleteSupplier(supplierCode);

        return ResponseEntity.noContent().build();
    }

    // Search Supplier
    @GetMapping("/search")
    public ResponseEntity<List<Supplier>> searchSuppliers(
            @RequestParam String keyword) {

        return ResponseEntity.ok(
                supplierService.searchSuppliers(keyword));
    }

    // Filter by Status
    @GetMapping("/status/{status}")
    public ResponseEntity<List<Supplier>> getSuppliersByStatus(
            @PathVariable String status) {

        return ResponseEntity.ok(
                supplierService.getSuppliersByStatus(status));
    }

}