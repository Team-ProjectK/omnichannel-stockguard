import { Component, OnInit, OnDestroy, ViewChild, ElementRef, AfterViewChecked } from '@angular/core';
import { Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { AssistantService } from '../../services/assistant.service';
import { ChatMessage } from '../../models/assistant.model';

@Component({
  selector: 'app-floating-ai-widget',
  templateUrl: './floating-ai-widget.component.html',
  styleUrls: ['./floating-ai-widget.component.scss']
})
export class FloatingAiWidgetComponent implements OnInit, OnDestroy, AfterViewChecked {
  @ViewChild('scrollContainer') private scrollContainer!: ElementRef;

  isOpen: boolean = false;
  messages: ChatMessage[] = [];
  messageText: string = '';
  isLoading: boolean = false;
  currentSessionId: string | null = null;
  private shouldScroll: boolean = false;

  private subscriptions: Subscription = new Subscription();

  constructor(
    public assistantService: AssistantService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.subscriptions.add(
      this.assistantService.currentSessionId$.subscribe(sid => {
        this.currentSessionId = sid;
        if (sid) {
          this.loadSessionMessages(sid);
        }
      })
    );
  }

  ngAfterViewChecked(): void {
    if (this.shouldScroll) {
      this.scrollToBottom();
      this.shouldScroll = false;
    }
  }

  ngOnDestroy(): void {
    this.subscriptions.unsubscribe();
  }

  loadSessionMessages(sessionId: string): void {
    this.assistantService.getConversationMessages(sessionId).subscribe({
      next: (msgs) => {
        this.messages = msgs;
        this.shouldScroll = true;
      },
      error: () => {}
    });
  }

  toggleWidget(): void {
    this.isOpen = !this.isOpen;
    if (this.isOpen) {
      if (this.currentSessionId && this.messages.length === 0) {
        this.loadSessionMessages(this.currentSessionId);
      }
      this.shouldScroll = true;
    }
  }

  onClearChat(): void {
    if (this.currentSessionId) {
      this.assistantService.deleteConversation(this.currentSessionId).subscribe({
        next: () => {
          this.messages = [];
          this.assistantService.clearSession();
        },
        error: () => {
          this.messages = [];
          this.assistantService.clearSession();
        }
      });
    } else {
      this.messages = [];
      this.assistantService.clearSession();
    }
  }

  getPageContextName(): string {
    const url = this.router.url.split('?')[0];
    if (url.includes('/inventory')) return 'Inventory Stock Management';
    if (url.includes('/products')) return 'Product Catalog';
    if (url.includes('/suppliers')) return 'Supplier Management';
    if (url.includes('/purchase-orders')) return 'Purchase Orders';
    if (url.includes('/sales-orders')) return 'Sales Orders';
    if (url.includes('/reorder')) return 'Stock Reorder & Replenishment';
    if (url.includes('/analytics')) return 'Analytics & Reports';
    if (url.includes('/knowledge')) return 'Knowledge Base (RAG)';
    if (url.includes('/dashboard') || url === '/' || url === '/home') return 'Dashboard Overview';
    return 'StockGuard Workspace';
  }

  onSelectPrompt(prompt: string): void {
    this.messageText = prompt;
    this.onSend();
  }

  onSend(): void {
    if (!this.messageText || !this.messageText.trim() || this.isLoading) {
      return;
    }

    const rawText = this.messageText.trim();
    const contextName = this.getPageContextName();
    
    let fullPrompt = rawText;
    if (!rawText.toLowerCase().includes(contextName.toLowerCase())) {
      fullPrompt = `[Context: Viewing ${contextName}] ${rawText}`;
    }

    const userMessage: ChatMessage = {
      id: Date.now().toString(),
      sender: 'user',
      text: rawText,
      timestamp: new Date()
    };

    this.messages.push(userMessage);
    this.messageText = '';
    this.isLoading = true;
    this.shouldScroll = true;

    this.assistantService.sendMessage(fullPrompt).subscribe({
      next: (res) => {
        const aiMessage: ChatMessage = {
          id: (Date.now() + 1).toString(),
          sender: 'assistant',
          text: res.response,
          timestamp: new Date()
        };
        this.messages.push(aiMessage);
        this.isLoading = false;
        this.shouldScroll = true;
      },
      error: (err) => {
        const errorMessage: ChatMessage = {
          id: (Date.now() + 1).toString(),
          sender: 'assistant',
          text: err.message || 'Error communicating with AI Assistant.',
          timestamp: new Date(),
          isError: true
        };
        this.messages.push(errorMessage);
        this.isLoading = false;
        this.shouldScroll = true;
      }
    });
  }

  onKeyDown(event: KeyboardEvent): void {
    if (event.key === 'Enter' && !event.shiftKey) {
      event.preventDefault();
      this.onSend();
    }
  }

  private scrollToBottom(): void {
    try {
      if (this.scrollContainer) {
        this.scrollContainer.nativeElement.scrollTop = this.scrollContainer.nativeElement.scrollHeight;
      }
    } catch (err) {}
  }
}
