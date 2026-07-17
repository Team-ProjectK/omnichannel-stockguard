import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Product } from '../models/product';
import { PriceDecision } from '../models/price-decision';
import { ReorderRequest } from '../models/reorder-request';

const API_BASE = 'http://localhost:8080/api';

export interface AlertsResponse {
  lowStockProducts: Product[];
  pendingReorders: ReorderRequest[];
}

@Injectable({ providedIn: 'root' })
export class ProductService {
  constructor(private http: HttpClient) {}

  getAllProducts(): Observable<Product[]> {
    return this.http.get<Product[]>(`${API_BASE}/products`);
  }

  getPriceHistory(storeId: string, sku: string): Observable<PriceDecision[]> {
    return this.http.get<PriceDecision[]>(`${API_BASE}/products/${storeId}/${sku}/history`);
  }

  getAlerts(): Observable<AlertsResponse> {
    return this.http.get<AlertsResponse>(`${API_BASE}/alerts`);
  }

  getReorderRequests(): Observable<ReorderRequest[]> {
    return this.http.get<ReorderRequest[]>(`${API_BASE}/reorder`);
  }
}