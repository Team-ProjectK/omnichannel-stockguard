package com.example.demo.controller;

import com.example.demo.model.Product;
import com.example.demo.service.ProductService;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;

@RestController
@RequestMapping("/api/alerts")
@CrossOrigin(origins = "*")
public class AlertController {

    private final ProductService productService;

    public AlertController(ProductService productService) {
        this.productService = productService;
    }

    @GetMapping("/low-stock")
    public List<Product> getLowStockProducts() {

        return productService.getAllProducts()
                .stream()
                .filter(productService::isLowStock)
                .toList();
    }
}