import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Product, ProductDto } from '../../shared/models/product';

@Injectable({
  providedIn: 'root'
})
export class ProductService {

  private apiUrl = 'http://localhost:8081/api/products';

  constructor(private http: HttpClient) {}

  getProducts(): Observable<Product[]> {
    return this.http.get<Product[]>(this.apiUrl);
  }

  getProduct(sku: string, storeId: string): Observable<Product> {
    return this.http.get<Product>(`${this.apiUrl}/${sku}/${storeId}`);
  }

  addProduct(product: ProductDto | Product): Observable<Product> {
    return this.http.post<Product>(this.apiUrl, product);
  }

  updateProduct(sku: string, storeId: string, product: ProductDto | Product): Observable<Product> {
    return this.http.put<Product>(`${this.apiUrl}/${sku}/${storeId}`, product);
  }

  deleteProduct(sku: string, storeId: string): Observable<void> {
    return this.http.delete<void>(`${this.apiUrl}/${sku}/${storeId}`);
  }

  searchProducts(keyword: string): Observable<Product[]> {
    const params = new HttpParams().set('keyword', keyword);
    return this.http.get<Product[]>(`${this.apiUrl}/search`, { params });
  }

}