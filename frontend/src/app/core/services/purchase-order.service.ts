import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';
import { PurchaseOrder, PurchaseOrderDto } from '../../shared/models/purchase-order';

@Injectable({
  providedIn: 'root'
})
export class PurchaseOrderService {

  private apiUrl = 'http://localhost:8081/api/purchase-orders';

  constructor(private http: HttpClient) {}

  getPurchaseOrders(): Observable<PurchaseOrder[]> {
    return this.http.get<PurchaseOrder[]>(this.apiUrl);
  }

  getPurchaseOrder(purchaseOrderNo: string): Observable<PurchaseOrder> {
    return this.http.get<PurchaseOrder>(`${this.apiUrl}/${purchaseOrderNo}`);
  }

  createPurchaseOrder(dto: PurchaseOrderDto | PurchaseOrder): Observable<PurchaseOrder> {
    return this.http.post<PurchaseOrder>(this.apiUrl, dto);
  }

  updatePurchaseOrder(purchaseOrderNo: string, dto: PurchaseOrderDto | PurchaseOrder): Observable<PurchaseOrder> {
    return this.http.put<PurchaseOrder>(`${this.apiUrl}/${purchaseOrderNo}`, dto);
  }

  deletePurchaseOrder(purchaseOrderNo: string): Observable<void> {
    return this.http.delete<void>(`${this.apiUrl}/${purchaseOrderNo}`);
  }

  getOrdersBySupplier(supplierCode: string): Observable<PurchaseOrder[]> {
    return this.http.get<PurchaseOrder[]>(`${this.apiUrl}/supplier/${supplierCode}`);
  }

  getOrdersBySku(sku: string): Observable<PurchaseOrder[]> {
    return this.http.get<PurchaseOrder[]>(`${this.apiUrl}/sku/${sku}`);
  }

  getOrdersByStore(storeId: string): Observable<PurchaseOrder[]> {
    return this.http.get<PurchaseOrder[]>(`${this.apiUrl}/store/${storeId}`);
  }

  getOrdersByStatus(status: string): Observable<PurchaseOrder[]> {
    return this.http.get<PurchaseOrder[]>(`${this.apiUrl}/status/${status}`);
  }
}
