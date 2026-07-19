export interface DemandPrediction {
  id: number;
  productName: string;
  sku: string;
  category: string;
  currentStock: number;
  predictedDemandNext30Days: number;
  recommendedReorderQty: number;
  confidenceScore: number;
  trend: 'Upward' | 'Stable' | 'Downward';
  riskLevel: 'Low' | 'Medium' | 'High';
}

export interface PriceRecommendation {
  id: number;
  productName: string;
  sku: string;
  currentPrice: number;
  recommendedPrice: number;
  projectedRevenueIncreasePct: number;
  competitorAvgPrice: number;
  demandElasticity: 'High' | 'Moderate' | 'Low';
  confidenceScore: number;
}
