import { Component, ElementRef, ViewChild, AfterViewChecked, OnInit } from '@angular/core';
import { AiService, ChatMessage } from '../../../features/ai/services/ai.service';

@Component({
  selector: 'app-floating-ai-chat',
  templateUrl: './floating-ai-chat.component.html',
  styleUrls: ['./floating-ai-chat.component.scss']
})
export class FloatingAiChatComponent implements OnInit, AfterViewChecked {
  @ViewChild('chatScrollContainer') private chatScrollContainer!: ElementRef;

  isOpen = false;
  userInput = '';
  isLoading = false;
  unreadBadgeCount = 1;
  copiedIndex: number | null = null;

  quickPrompts = [
    "What products are low in stock?",
    "What should I reorder today?",
    "Show today's business summary.",
    "Suggest pricing improvements."
  ];

  messages: ChatMessage[] = [];

  constructor(private aiService: AiService) {}

  ngOnInit(): void {
    this.loadHistory();
  }

  ngAfterViewChecked(): void {
    if (this.isOpen) {
      this.scrollToBottom();
    }
  }

  toggleChat(): void {
    this.isOpen = !this.isOpen;
    if (this.isOpen) {
      this.unreadBadgeCount = 0;
      this.scrollToBottom();
    }
  }

  onKeyDown(event: KeyboardEvent): void {
    if (event.key === 'Enter' && !event.shiftKey) {
      event.preventDefault();
      this.sendMessage();
    }
  }

  sendMessage(textToSend?: string): void {
    const text = (textToSend || this.userInput).trim();
    if (!text || this.isLoading) return;

    this.messages.push({
      sender: 'user',
      text,
      timestamp: new Date()
    });

    this.userInput = '';
    this.isLoading = true;
    this.saveHistory();

    this.aiService.sendChatMessage(text).subscribe({
      next: (res) => {
        this.isLoading = false;
        this.messages.push({
          sender: 'ai',
          text: res.response || 'No response from OpenRouter model.',
          timestamp: new Date(res.timestamp || Date.now()),
          status: res.status,
          errorMessage: res.errorMessage
        });
        this.saveHistory();
      },
      error: (err) => {
        this.isLoading = false;
        this.messages.push({
          sender: 'ai',
          text: 'AI Service is currently offline or unreachable. Please check backend connection.',
          timestamp: new Date(),
          status: 'ERROR'
        });
        this.saveHistory();
      }
    });
  }

  sendQuickPrompt(promptText: string): void {
    this.sendMessage(promptText);
  }

  copyToClipboard(text: string, index: number): void {
    navigator.clipboard.writeText(text).then(() => {
      this.copiedIndex = index;
      setTimeout(() => {
        if (this.copiedIndex === index) {
          this.copiedIndex = null;
        }
      }, 2000);
    });
  }

  clearChat(): void {
    this.messages = [
      {
        sender: 'ai',
        text: 'Hello! I am StockGuard OpenRouter AI. Ask me about live inventory velocity, safety thresholds, or pricing recommendations!',
        timestamp: new Date()
      }
    ];
    localStorage.removeItem('stockguard_chat_history');
  }

  private saveHistory(): void {
    try {
      localStorage.setItem('stockguard_chat_history', JSON.stringify(this.messages.slice(-30)));
    } catch (e) {}
  }

  private loadHistory(): void {
    try {
      const saved = localStorage.getItem('stockguard_chat_history');
      if (saved) {
        this.messages = JSON.parse(saved).map((m: any) => ({
          ...m,
          timestamp: new Date(m.timestamp)
        }));
      }
    } catch (e) {}

    if (this.messages.length === 0) {
      this.clearChat();
    }
  }

  private scrollToBottom(): void {
    try {
      if (this.chatScrollContainer) {
        this.chatScrollContainer.nativeElement.scrollTop = this.chatScrollContainer.nativeElement.scrollHeight;
      }
    } catch (err) {}
  }
}
