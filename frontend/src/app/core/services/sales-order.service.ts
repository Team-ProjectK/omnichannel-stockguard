import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';
import { SalesOrder, SalesOrderDto } from '../../shared/models/sales-order';

@Injectable({
  providedIn: 'root'
})
export class SalesOrderService {

  private apiUrl = 'http://localhost:8081/api/sales-orders';

  constructor(private http: HttpClient) {}

  getSalesOrders(): Observable<SalesOrder[]> {
    return this.http.get<SalesOrder[]>(this.apiUrl);
  }

  getSalesOrder(salesOrderNo: string): Observable<SalesOrder> {
    return this.http.get<SalesOrder>(`${this.apiUrl}/${salesOrderNo}`);
  }

  createSalesOrder(dto: SalesOrderDto | SalesOrder): Observable<SalesOrder> {
    return this.http.post<SalesOrder>(this.apiUrl, dto);
  }

  updateSalesOrder(salesOrderNo: string, dto: SalesOrderDto | SalesOrder): Observable<SalesOrder> {
    return this.http.put<SalesOrder>(`${this.apiUrl}/${salesOrderNo}`, dto);
  }

  deleteSalesOrder(salesOrderNo: string): Observable<void> {
    return this.http.delete<void>(`${this.apiUrl}/${salesOrderNo}`);
  }

  getOrdersByCustomer(customerId: string): Observable<SalesOrder[]> {
    return this.http.get<SalesOrder[]>(`${this.apiUrl}/customer/${customerId}`);
  }

  getOrdersBySku(sku: string): Observable<SalesOrder[]> {
    return this.http.get<SalesOrder[]>(`${this.apiUrl}/sku/${sku}`);
  }

  getOrdersByStore(storeId: string): Observable<SalesOrder[]> {
    return this.http.get<SalesOrder[]>(`${this.apiUrl}/store/${storeId}`);
  }

  getOrdersByStatus(status: string): Observable<SalesOrder[]> {
    return this.http.get<SalesOrder[]>(`${this.apiUrl}/status/${status}`);
  }
}
