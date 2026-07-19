import { Injectable } from '@angular/core';
import { DemandPrediction, PriceRecommendation } from '../../shared/models/ai-prediction';

@Injectable({
  providedIn: 'root'
})
export class AiPredictionService {
  getDemandPredictions(): DemandPrediction[] {
    return [
      {
        id: 1,
        productName: 'Dell XPS 15 Laptop',
        sku: 'ELE-LAP-001',
        category: 'Electronics',
        currentStock: 25,
        predictedDemandNext30Days: 48,
        recommendedReorderQty: 30,
        confidenceScore: 94,
        trend: 'Upward',
        riskLevel: 'High'
      },
      {
        id: 2,
        productName: 'Logitech MX Master 3S',
        sku: 'ACC-MOU-002',
        category: 'Accessories',
        currentStock: 18,
        predictedDemandNext30Days: 35,
        recommendedReorderQty: 25,
        confidenceScore: 89,
        trend: 'Upward',
        riskLevel: 'Medium'
      },
      {
        id: 3,
        productName: 'Ergonomic Standing Desk',
        sku: 'FUR-DES-005',
        category: 'Furniture',
        currentStock: 45,
        predictedDemandNext30Days: 20,
        recommendedReorderQty: 0,
        confidenceScore: 91,
        trend: 'Stable',
        riskLevel: 'Low'
      },
      {
        id: 4,
        productName: 'Keychron K2 Mechanical Keyboard',
        sku: 'ACC-KEY-004',
        category: 'Accessories',
        currentStock: 240,
        predictedDemandNext30Days: 30,
        recommendedReorderQty: 0,
        confidenceScore: 96,
        trend: 'Downward',
        riskLevel: 'Low'
      }
    ];
  }

  getPriceRecommendations(): PriceRecommendation[] {
    return [
      {
        id: 1,
        productName: 'Dell XPS 15 Laptop',
        sku: 'ELE-LAP-001',
        currentPrice: 65000,
        recommendedPrice: 68500,
        projectedRevenueIncreasePct: 5.4,
        competitorAvgPrice: 69999,
        demandElasticity: 'Low',
        confidenceScore: 92
      },
      {
        id: 2,
        productName: 'Logitech MX Master 3S',
        sku: 'ACC-MOU-002',
        currentPrice: 8500,
        recommendedPrice: 7999,
        projectedRevenueIncreasePct: 12.1,
        competitorAvgPrice: 8200,
        demandElasticity: 'High',
        confidenceScore: 88
      },
      {
        id: 3,
        productName: 'Samsung 27" 4K Monitor',
        sku: 'ELE-MON-003',
        currentPrice: 28000,
        recommendedPrice: 29500,
        projectedRevenueIncreasePct: 4.2,
        competitorAvgPrice: 30000,
        demandElasticity: 'Moderate',
        confidenceScore: 90
      }
    ];
  }
}
