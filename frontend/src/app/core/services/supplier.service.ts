import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Supplier, SupplierDto } from '../../shared/models/supplier';

@Injectable({
  providedIn: 'root'
})
export class SupplierService {

  private apiUrl = 'http://localhost:8081/api/suppliers';

  constructor(private http: HttpClient) {}

  getSuppliers(): Observable<Supplier[]> {
    return this.http.get<Supplier[]>(this.apiUrl);
  }

  getSupplierByCode(supplierCode: string): Observable<Supplier> {
    return this.http.get<Supplier>(`${this.apiUrl}/${supplierCode}`);
  }

  addSupplier(dto: SupplierDto | Supplier): Observable<Supplier> {
    return this.http.post<Supplier>(this.apiUrl, dto);
  }

  updateSupplier(supplierCode: string, dto: SupplierDto | Supplier): Observable<Supplier> {
    return this.http.put<Supplier>(`${this.apiUrl}/${supplierCode}`, dto);
  }

  deleteSupplier(supplierCode: string): Observable<void> {
    return this.http.delete<void>(`${this.apiUrl}/${supplierCode}`);
  }

  searchSuppliers(keyword: string): Observable<Supplier[]> {
    const params = new HttpParams().set('keyword', keyword);
    return this.http.get<Supplier[]>(`${this.apiUrl}/search`, { params });
  }

  getSuppliersByStatus(status: string): Observable<Supplier[]> {
    return this.http.get<Supplier[]>(`${this.apiUrl}/status/${status}`);
  }
}
