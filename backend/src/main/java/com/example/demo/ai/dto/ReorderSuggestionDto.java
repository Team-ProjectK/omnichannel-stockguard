package com.example.demo.ai.dto;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.util.List;

@Data
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class ReorderSuggestionDto {
    private String summary;
    private List<ReorderItemSuggestion> items;

    @Data
    @NoArgsConstructor
    @AllArgsConstructor
    @Builder
    public static class ReorderItemSuggestion {
        private String sku;
        private String productName;
        private int currentStock;
        private int recommendedQuantity;
        private String priority; // HIGH, MEDIUM, LOW
        private String reason;
    }
}
