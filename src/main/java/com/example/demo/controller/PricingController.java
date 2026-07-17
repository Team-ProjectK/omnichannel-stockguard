package com.example.demo.controller;

import com.example.demo.dto.PricingDecisionRequest;
import com.example.demo.model.PriceDecision;
import com.example.demo.service.productService;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/pricing")
@CrossOrigin(origins = "*")
public class PricingController {

    private final productService productService;

    public PricingController(productService productService) {
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