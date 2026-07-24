package com.example.demo.controller;

import com.example.demo.dto.PricingDecisionRequest;
import com.example.demo.model.PriceDecision;
import com.example.demo.service.ProductService;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/api/pricing")
@CrossOrigin(origins = "*")
public class PricingController {

    private final ProductService productService;

    public PricingController(ProductService productService) {
        this.productService = productService;
    }

    @PostMapping("/decision")
    public PriceDecision applyDecision(@RequestBody PricingDecisionRequest request) {

        return productService.applyPriceDecision(
                request.getSku(),
                request.getStoreId(),
                request.getNewPrice(),
                request.getJustification(),
                request.getCompetitorPriceRef(),
                request.getDemandSignal()
        );
    }
}