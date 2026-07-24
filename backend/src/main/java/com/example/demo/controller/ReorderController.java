package com.example.demo.controller;

import com.example.demo.dto.ReorderRequestDto;
import com.example.demo.model.ReorderRequest;
import com.example.demo.service.ProductService;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;

@RestController
@RequestMapping("/api/reorder")
@CrossOrigin(origins = "*")
public class ReorderController {

    private final ProductService productService;

    public ReorderController(ProductService productService) {
        this.productService = productService;
    }

    @PostMapping
    public ReorderRequest create(@RequestBody ReorderRequestDto dto) {

        return productService.createReorderRequest(
                dto.getSku(),
                dto.getStoreId(),
                dto.getQuantity(),
                dto.getSupplier(),
                dto.getDraftDocText()
        );
    }

    @GetMapping
    public List<ReorderRequest> getAll() {
        return productService.getReorderRequests();
    }
}