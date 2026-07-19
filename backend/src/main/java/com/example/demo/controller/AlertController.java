package com.example.demo.controller;

import com.example.demo.model.product;
import com.example.demo.service.productService;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.stream.Collectors;

@RestController
@RequestMapping("/api/alerts")
@CrossOrigin(origins = "*")
public class AlertController {

    private final productService productService;

    public AlertController(productService productService) {
        this.productService = productService;
    }

    @GetMapping("/low-stock")
    public List<product> getLowStockProducts() {

        return productService.getAllProducts()
                .stream()
                .filter(productService::isLowStock)
                .collect(Collectors.toList());
    }
}