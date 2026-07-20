import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

export interface ReorderItem {
  id?: number;
  sku: string;
  storeId: string;
  quantity: number;
  supplier: string;
  draftDocText?: string;
  status?: string;
  timestamp?: string;
}

export interface ReorderRequestDto {
  sku: string;
  storeId: string;
  quantity: number;
  supplier: string;
  draftDocText?: string;
}

@Injectable({
  providedIn: 'root'
})
export class ReorderService {

  private apiUrl = 'http://localhost:8081/api/reorder';

  constructor(private http: HttpClient) {}

  getReorderRequests(): Observable<ReorderItem[]> {
    return this.http.get<ReorderItem[]>(this.apiUrl);
  }

  createReorderRequest(dto: ReorderRequestDto): Observable<ReorderItem> {
    return this.http.post<ReorderItem>(this.apiUrl, dto);
  }
}
