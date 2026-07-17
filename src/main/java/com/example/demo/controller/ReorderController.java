package com.example.demo.controller;

import com.example.demo.dto.ReorderRequestDto;
import com.example.demo.model.ReorderRequest;
import com.example.demo.service.productService;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/reorder")
@CrossOrigin(origins = "*")
public class ReorderController {

    private final productService productService;

    public ReorderController(productService productService) {
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