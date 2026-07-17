package com.example.demo.controller;

import com.example.demo.model.product;
import com.example.demo.service.productService;
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

    @GetMapping
    public List<product> getAllProducts() {
        return productService.getAllProducts();
    }

    @GetMapping("/{sku}/{storeId}")
    public product getProduct(@PathVariable String sku,
                              @PathVariable String storeId) {
        return productService.getProduct(sku, storeId);
    }
}