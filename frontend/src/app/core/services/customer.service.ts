import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Customer, CustomerDto } from '../../shared/models/customer';

@Injectable({
  providedIn: 'root'
})
export class CustomerService {

  private apiUrl = 'http://localhost:8081/api/customers';

  constructor(private http: HttpClient) {}

  getCustomers(): Observable<Customer[]> {
    return this.http.get<Customer[]>(this.apiUrl);
  }

  getCustomerById(customerId: string): Observable<Customer> {
    return this.http.get<Customer>(`${this.apiUrl}/${customerId}`);
  }

  addCustomer(dto: CustomerDto | Customer): Observable<Customer> {
    return this.http.post<Customer>(this.apiUrl, dto);
  }

  updateCustomer(customerId: string, dto: CustomerDto | Customer): Observable<Customer> {
    return this.http.put<Customer>(`${this.apiUrl}/${customerId}`, dto);
  }

  deleteCustomer(customerId: string): Observable<void> {
    return this.http.delete<void>(`${this.apiUrl}/${customerId}`);
  }

  searchCustomers(keyword: string): Observable<Customer[]> {
    const params = new HttpParams().set('keyword', keyword);
    return this.http.get<Customer[]>(`${this.apiUrl}/search`, { params });
  }

  getCustomersByType(customerType: string): Observable<Customer[]> {
    return this.http.get<Customer[]>(`${this.apiUrl}/type/${customerType}`);
  }

  getCustomersByActive(active: boolean): Observable<Customer[]> {
    return this.http.get<Customer[]>(`${this.apiUrl}/active/${active}`);
  }
}
