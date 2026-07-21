package com.example.demo.ai.dto;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.time.LocalDateTime;
import java.util.List;

@Data
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class InventoryInsightDto {
    private String overallHealthStatus;
    private int totalProductsAnalyzed;
    private int lowStockItemCount;
    private List<String> fastMovingItems;
    private List<String> slowMovingItems;
    private String aiAnalysisSummary;
    private List<String> keyRecommendations;
    private LocalDateTime generatedAt;
}
