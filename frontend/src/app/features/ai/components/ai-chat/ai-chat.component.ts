import { Component, ElementRef, ViewChild, AfterViewChecked, OnInit } from '@angular/core';
import { AiService, ChatMessage } from '../../services/ai.service';

@Component({
  selector: 'app-ai-chat',
  templateUrl: './ai-chat.component.html',
  styleUrls: ['./ai-chat.component.scss']
})
export class AiChatComponent implements OnInit, AfterViewChecked {
  @ViewChild('chatContainer') private chatContainer!: ElementRef;

  userInput = '';
  isLoading = false;

  messages: ChatMessage[] = [
    {
      sender: 'ai',
      text: 'Hello! I am your StockGuard AI Assistant. How can I help you with inventory levels, reordering thresholds, or pricing strategies today?',
      timestamp: new Date()
    }
  ];

  constructor(private aiService: AiService) {}

  ngOnInit(): void {}

  ngAfterViewChecked(): void {
    this.scrollToBottom();
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
          text: res.response || 'No response received from AI model.',
          timestamp: new Date(res.timestamp || Date.now()),
          status: res.status,
          errorMessage: res.errorMessage
        });
      },
      error: (err) => {
        this.isLoading = false;
        this.messages.push({
          sender: 'ai',
          text: 'Unable to reach StockGuard AI backend service. Please check backend connection.',
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
        text: 'Chat history cleared. How else can I assist you?',
        timestamp: new Date()
      }
    ];
  }

  private scrollToBottom(): void {
    try {
      if (this.chatContainer) {
        this.chatContainer.nativeElement.scrollTop = this.chatContainer.nativeElement.scrollHeight;
      }
    } catch (err) {}
  }
}
