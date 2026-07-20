import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Product } from '../../shared/models/product';

@Injectable({
  providedIn: 'root'
})
export class AlertService {

  private apiUrl = 'http://localhost:8081/api/alerts/low-stock';

  constructor(private http: HttpClient) { }

  getLowStockAlerts(): Observable<Product[]> {
    return this.http.get<Product[]>(this.apiUrl);
  }
}
