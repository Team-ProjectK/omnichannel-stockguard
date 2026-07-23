import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Observable, BehaviorSubject, throwError } from 'rxjs';
import { catchError, map, tap } from 'rxjs/operators';
import { ChatRequest, ChatResponse, ChatMessage, ConversationSummary, ConversationMessageDto } from '../models/assistant.model';

@Injectable({
  providedIn: 'root'
})
export class AssistantService {
  private baseUrl = 'http://localhost:8081/api/assistant';
  private apiUrl = `${this.baseUrl}/chat`;
  private sessionIdKey = 'stockguard_ai_session_id';

  private currentSessionIdSubject = new BehaviorSubject<string | null>(this.getStoredSessionId());
  public currentSessionId$ = this.currentSessionIdSubject.asObservable();

  constructor(private http: HttpClient) {}

  public getStoredSessionId(): string | null {
    return localStorage.getItem(this.sessionIdKey);
  }

  public setSessionId(sessionId: string): void {
    localStorage.setItem(this.sessionIdKey, sessionId);
    this.currentSessionIdSubject.next(sessionId);
  }

  public clearSession(): void {
    localStorage.removeItem(this.sessionIdKey);
    this.currentSessionIdSubject.next(null);
  }

  public sendMessage(message: string): Observable<ChatResponse> {
    const sessionId = this.getStoredSessionId() || undefined;
    const payload: ChatRequest = {
      sessionId: sessionId ? sessionId : undefined,
      message: message
    };

    return this.http.post<ChatResponse>(this.apiUrl, payload).pipe(
      tap(res => {
        if (res && res.sessionId) {
          this.setSessionId(res.sessionId);
        }
      }),
      catchError(this.handleError)
    );
  }

  public getConversations(): Observable<ConversationSummary[]> {
    return this.http.get<ConversationSummary[]>(`${this.baseUrl}/conversations`).pipe(
      catchError(this.handleError)
    );
  }

  public getConversationMessages(sessionId: string): Observable<ChatMessage[]> {
    return this.http.get<ConversationMessageDto[]>(`${this.baseUrl}/conversations/${sessionId}`).pipe(
      map(dtos => dtos.map(dto => ({
        id: 'db_' + dto.id,
        sender: (dto.role === 'user' ? 'user' : 'assistant') as 'user' | 'assistant',
        text: dto.message,
        timestamp: new Date(dto.timestamp)
      }))),
      catchError(this.handleError)
    );
  }

  public renameConversation(sessionId: string, newTitle: string): Observable<ConversationSummary> {
    return this.http.put<ConversationSummary>(`${this.baseUrl}/conversations/${sessionId}/title`, { title: newTitle }).pipe(
      catchError(this.handleError)
    );
  }

  public deleteConversation(sessionId: string): Observable<void> {
    if (this.getStoredSessionId() === sessionId) {
      this.clearSession();
    }
    return this.http.delete<void>(`${this.baseUrl}/conversations/${sessionId}`).pipe(
      catchError(this.handleError)
    );
  }

  private handleError(error: HttpErrorResponse): Observable<never> {
    let errorMessage = 'An unexpected error occurred while communicating with AI Assistant.';
    if (error.status === 0) {
      errorMessage = 'Unable to connect to backend server. Please check your network connection.';
    } else if (error.status === 503) {
      errorMessage = 'Ollama AI server is currently offline or unreachable.';
    } else if (error.status === 504) {
      errorMessage = 'Ollama AI server request timed out. Please try again.';
    } else if (error.error && error.error.message) {
      errorMessage = error.error.message;
    }
    return throwError(() => new Error(errorMessage));
  }
}
