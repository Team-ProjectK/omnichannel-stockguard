package com.example.demo.controller;

import com.example.demo.dto.ProductDto;
import com.example.demo.model.Product;
import com.example.demo.service.ProductService;
import jakarta.validation.Valid;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;

@RestController
@RequestMapping("/api/products")
@CrossOrigin(origins = "*")
public class ProductController {

    private final ProductService productService;

    public ProductController(ProductService productService) {
        this.productService = productService;
    }

    // Get All Products
    @GetMapping
    public ResponseEntity<List<Product>> getAllProducts() {

        return ResponseEntity.ok(productService.getAllProducts());
    }

    // Pagination & Sorting
    @GetMapping("/page")
    public ResponseEntity<Page<Product>> getProducts(Pageable pageable) {

        return ResponseEntity.ok(productService.getProducts(pageable));
    }

    // Get Product
    @GetMapping("/{sku}/{storeId}")
    public ResponseEntity<Product> getProduct(
            @PathVariable String sku,
            @PathVariable String storeId) {

        return ResponseEntity.ok(productService.getProduct(sku, storeId));
    }

    // Create Product
    @PostMapping
    public ResponseEntity<Product> createProduct(
            @Valid @RequestBody ProductDto dto) {

        Product createdProduct = productService.createProduct(dto);

        return new ResponseEntity<>(createdProduct, HttpStatus.CREATED);
    }

    // Update Product
    @PutMapping("/{sku}/{storeId}")
    public ResponseEntity<Product> updateProduct(
            @PathVariable String sku,
            @PathVariable String storeId,
            @Valid @RequestBody ProductDto dto) {

        Product updatedProduct =
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
    public ResponseEntity<List<Product>> searchProducts(
            @RequestParam String keyword) {

        return ResponseEntity.ok(
                productService.searchProducts(keyword));
    }

}