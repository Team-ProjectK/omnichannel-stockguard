import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

export interface ChatMessage {
  sender: 'user' | 'ai';
  text: string;
  timestamp: Date;
  status?: string;
  errorMessage?: string;
}

export interface ChatResponse {
  response: string;
  timestamp: string;
  status: string;
  modelUsed: string;
  errorMessage?: string;
}

export interface InventoryInsight {
  overallHealthStatus: string;
  totalProductsAnalyzed: number;
  lowStockItemCount: number;
  fastMovingItems: string[];
  slowMovingItems: string[];
  aiAnalysisSummary: string;
  keyRecommendations: string[];
  generatedAt: string;
}

export interface ReorderItemSuggestion {
  sku: string;
  productName: string;
  currentStock: number;
  recommendedQuantity: number;
  priority: string;
  reason: string;
}

export interface ReorderSuggestion {
  summary: string;
  items: ReorderItemSuggestion[];
}

export interface PriceRecommendationItem {
  sku: string;
  productName: string;
  currentPrice: number;
  suggestedPrice: number;
  recommendation: string;
  reasoning: string;
  demandSignal: string;
}

export interface PriceRecommendation {
  executiveSummary: string;
  recommendations: PriceRecommendationItem[];
}

export interface ProductForecastItem {
  sku: string;
  productName: string;
  currentStock: number;
  projected30DaysDemand: number;
  trendDirection: string;
  riskLevel: string;
  rationale: string;
}

export interface DemandForecast {
  forecastOverview: string;
  forecastModelType: string;
  forecasts: ProductForecastItem[];
}

@Injectable({
  providedIn: 'root'
})
export class AiService {
  private apiUrl = 'http://localhost:8081/api/ai';

  constructor(private http: HttpClient) {}

  sendChatMessage(message: string): Observable<ChatResponse> {
    return this.http.post<ChatResponse>(`${this.apiUrl}/chat`, { message });
  }

  getInventoryInsights(): Observable<InventoryInsight> {
    return this.http.post<InventoryInsight>(`${this.apiUrl}/inventory-insights`, {});
  }

  getReorderSuggestions(): Observable<ReorderSuggestion> {
    return this.http.post<ReorderSuggestion>(`${this.apiUrl}/reorder-suggestions`, {});
  }

  getPriceRecommendations(): Observable<PriceRecommendation> {
    return this.http.post<PriceRecommendation>(`${this.apiUrl}/price-recommendations`, {});
  }

  getDemandForecast(): Observable<DemandForecast> {
    return this.http.post<DemandForecast>(`${this.apiUrl}/demand-forecast`, {});
  }
}
