import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

export interface PricingDecisionRequest {
  sku: string;
  storeId: string;
  newPrice: number;
  justification: string;
  competitorPriceRef: string;
  demandSignal: string;
}

export interface PriceDecision {
  id?: number;
  sku: string;
  storeId: string;
  timestamp?: string;
  oldPrice?: number;
  newPrice: number;
  demandSignal: string;
  competitorPriceRef: string;
  justification: string;
}

@Injectable({
  providedIn: 'root'
})
export class PricingService {

  private apiUrl = 'http://localhost:8081/api/pricing/decision';

  constructor(private http: HttpClient) { }

  applyDecision(request: PricingDecisionRequest): Observable<PriceDecision> {
    return this.http.post<PriceDecision>(this.apiUrl, request);
  }
}
