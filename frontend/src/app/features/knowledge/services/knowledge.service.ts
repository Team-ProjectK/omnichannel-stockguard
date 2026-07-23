import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { KnowledgeDocument, KnowledgeChunk } from '../models/knowledge.model';

@Injectable({
  providedIn: 'root'
})
export class KnowledgeService {
  private apiUrl = 'http://localhost:8081/api/knowledge';

  constructor(private http: HttpClient) {}

  public uploadDocument(file: File): Observable<KnowledgeDocument> {
    const formData = new FormData();
    formData.append('file', file);
    return this.http.post<KnowledgeDocument>(`${this.apiUrl}/upload`, formData).pipe(
      catchError(this.handleError)
    );
  }

  public getAllDocuments(): Observable<KnowledgeDocument[]> {
    return this.http.get<KnowledgeDocument[]>(this.apiUrl).pipe(
      catchError(this.handleError)
    );
  }

  public deleteDocument(id: number): Observable<void> {
    return this.http.delete<void>(`${this.apiUrl}/${id}`).pipe(
      catchError(this.handleError)
    );
  }

  public searchKnowledge(query: string): Observable<KnowledgeChunk[]> {
    return this.http.get<KnowledgeChunk[]>(`${this.apiUrl}/search`, {
      params: { q: query }
    }).pipe(
      catchError(this.handleError)
    );
  }

  private handleError(error: HttpErrorResponse): Observable<never> {
    let errorMessage = 'Error performing knowledge base operation.';
    if (error.status === 0) {
      errorMessage = 'Unable to connect to server. Please check your network connection.';
    } else if (error.error && error.error.message) {
      errorMessage = error.error.message;
    }
    return throwError(() => new Error(errorMessage));
  }
}
