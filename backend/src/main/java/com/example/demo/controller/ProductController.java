package com.example.demo.controller;

import com.example.demo.dto.ProductDto;
import com.example.demo.model.product;
import com.example.demo.service.productService;
import jakarta.validation.Valid;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/products")
@CrossOrigin(origins = "*")
public class ProductController {

    private final productService productService;

    public ProductController(productService productService) {
        this.productService = productService;
    }

    // Get All Products
    @GetMapping
    public ResponseEntity<List<product>> getAllProducts() {

        return ResponseEntity.ok(productService.getAllProducts());
    }

    // Pagination & Sorting
    @GetMapping("/page")
    public ResponseEntity<Page<product>> getProducts(Pageable pageable) {

        return ResponseEntity.ok(productService.getProducts(pageable));
    }

    // Get Product
    @GetMapping("/{sku}/{storeId}")
    public ResponseEntity<product> getProduct(
            @PathVariable String sku,
            @PathVariable String storeId) {

        return ResponseEntity.ok(productService.getProduct(sku, storeId));
    }

    // Create Product
    @PostMapping
    public ResponseEntity<product> createProduct(
            @Valid @RequestBody ProductDto dto) {

        product createdProduct = productService.createProduct(dto);

        return new ResponseEntity<>(createdProduct, HttpStatus.CREATED);
    }

    // Update Product
    @PutMapping("/{sku}/{storeId}")
    public ResponseEntity<product> updateProduct(
            @PathVariable String sku,
            @PathVariable String storeId,
            @Valid @RequestBody ProductDto dto) {

        product updatedProduct =
                productService.updateProduct(sku, storeId, dto);

        return ResponseEntity.ok(updatedProduct);
    }

    // Delete Product
    @DeleteMapping("/{sku}/{storeId}")
    public ResponseEntity<Void> deleteProduct(
            @PathVariable String sku,
            @PathVariable String storeId) {

        productService.deleteProduct(sku, storeId);

        return ResponseEntity.noContent().build();
    }

    // Search Products
    @GetMapping("/search")
    public ResponseEntity<List<product>> searchProducts(
            @RequestParam String keyword) {

        return ResponseEntity.ok(
                productService.searchProducts(keyword));
    }

}