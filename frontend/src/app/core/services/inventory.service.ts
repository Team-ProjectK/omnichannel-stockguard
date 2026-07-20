import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';
import { InventoryItem, InventoryDto } from '../../shared/models/inventory';

@Injectable({
  providedIn: 'root'
})
export class InventoryService {

  private apiUrl = 'http://localhost:8081/api/inventory';

  constructor(private http: HttpClient) {}

  getInventory(): Observable<InventoryItem[]> {
    return this.http.get<InventoryItem[]>(this.apiUrl);
  }

  getInventoryBySkuAndStore(sku: string, storeId: string): Observable<InventoryItem> {
    return this.http.get<InventoryItem>(`${this.apiUrl}/${sku}/${storeId}`);
  }

  createInventory(dto: InventoryDto): Observable<InventoryItem> {
    return this.http.post<InventoryItem>(this.apiUrl, dto);
  }

  updateInventory(sku: string, storeId: string, dto: InventoryDto): Observable<InventoryItem> {
    return this.http.put<InventoryItem>(`${this.apiUrl}/${sku}/${storeId}`, dto);
  }

  deleteInventory(sku: string, storeId: string): Observable<void> {
    return this.http.delete<void>(`${this.apiUrl}/${sku}/${storeId}`);
  }

  getInventoryByStore(storeId: string): Observable<InventoryItem[]> {
    return this.http.get<InventoryItem[]>(`${this.apiUrl}/store/${storeId}`);
  }

  getInventoryBySku(sku: string): Observable<InventoryItem[]> {
    return this.http.get<InventoryItem[]>(`${this.apiUrl}/sku/${sku}`);
  }

  getLowStockItems(threshold: number): Observable<InventoryItem[]> {
    const params = new HttpParams().set('threshold', threshold);
    return this.http.get<InventoryItem[]>(`${this.apiUrl}/low-stock`, { params });
  }
}
