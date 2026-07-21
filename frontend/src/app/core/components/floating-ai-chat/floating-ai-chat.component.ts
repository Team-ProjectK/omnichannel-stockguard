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

  messages: ChatMessage[] = [
    {
      sender: 'ai',
      text: 'Hello! I am StockGuard AI. Ask me about inventory velocity, safety thresholds, or pricing recommendations!',
      timestamp: new Date()
    }
  ];

  constructor(private aiService: AiService) {}

  ngOnInit(): void {}

  ngAfterViewChecked(): void {
    if (this.isOpen) {
      this.scrollToBottom();
    }
  }

  toggleChat(): void {
    this.isOpen = !this.isOpen;
    if (this.isOpen) {
      this.unreadBadgeCount = 0;
    }
  }

  onKeyDown(event: KeyboardEvent): void {
    if (event.key === 'Enter' && !event.shiftKey) {
      event.preventDefault();
      this.sendMessage();
    }
  }

  sendMessage(): void {
    const text = this.userInput.trim();
    if (!text || this.isLoading) return;

    this.messages.push({
      sender: 'user',
      text,
      timestamp: new Date()
    });

    this.userInput = '';
    this.isLoading = true;

    this.aiService.sendChatMessage(text).subscribe({
      next: (res) => {
        this.isLoading = false;
        this.messages.push({
          sender: 'ai',
          text: res.response || 'No response from AI model.',
          timestamp: new Date(res.timestamp || Date.now()),
          status: res.status,
          errorMessage: res.errorMessage
        });
      },
      error: () => {
        this.isLoading = false;
        this.messages.push({
          sender: 'ai',
          text: 'AI Service is currently offline or unreachable. Please check backend connection.',
          timestamp: new Date(),
          status: 'ERROR'
        });
      }
    });
  }

  clearChat(): void {
    this.messages = [
      {
        sender: 'ai',
        text: 'Chat history cleared. How can I help you next?',
        timestamp: new Date()
      }
    ];
  }

  private scrollToBottom(): void {
    try {
      if (this.chatScrollContainer) {
        this.chatScrollContainer.nativeElement.scrollTop = this.chatScrollContainer.nativeElement.scrollHeight;
      }
    } catch (err) {}
  }
}
