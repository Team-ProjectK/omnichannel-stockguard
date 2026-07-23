import { Component, ElementRef, OnInit, ViewChild, AfterViewChecked } from '@angular/core';
import { AssistantService } from '../services/assistant.service';
import { ChatMessage, ConversationSummary } from '../models/assistant.model';

@Component({
  selector: 'app-assistant-chat',
  templateUrl: './assistant-chat.component.html',
  styleUrls: ['./assistant-chat.component.scss']
})
export class AssistantChatComponent implements OnInit, AfterViewChecked {
  @ViewChild('scrollContainer') private scrollContainer!: ElementRef;

  messages: ChatMessage[] = [];
  conversations: ConversationSummary[] = [];
  isLoading: boolean = false;
  currentSessionId: string | null = null;
  editingSessionId: string | null = null;
  editingTitleText: string = '';
  isSidebarOpen: boolean = true;

  quickPrompts: string[] = [
    'Show low stock products in inventory',
    'Search product catalog details',
    'List active suppliers & vendors',
    'Analyze sales revenue metrics',
    'Suggest products to reorder'
  ];

  constructor(private assistantService: AssistantService) {}

  ngOnInit(): void {
    this.assistantService.currentSessionId$.subscribe(id => {
      this.currentSessionId = id;
    });

    this.loadConversations();

    const storedId = this.assistantService.getStoredSessionId();
    if (storedId) {
      this.loadConversationMessages(storedId);
    } else {
      this.initWelcomeMessage();
    }
  }

  ngAfterViewChecked(): void {
    this.scrollToBottom();
  }

  loadConversations(): void {
    this.assistantService.getConversations().subscribe({
      next: (list) => {
        this.conversations = list;
      },
      error: () => {
        this.conversations = [];
      }
    });
  }

  loadConversationMessages(sessionId: string): void {
    this.assistantService.setSessionId(sessionId);
    this.isLoading = true;

    this.assistantService.getConversationMessages(sessionId).subscribe({
      next: (msgs) => {
        if (msgs && msgs.length > 0) {
          this.messages = msgs;
        } else {
          this.initWelcomeMessage();
        }
        this.isLoading = false;
      },
      error: () => {
        this.initWelcomeMessage();
        this.isLoading = false;
      }
    });
  }

  private initWelcomeMessage(): void {
    this.messages = [
      {
        id: 'welcome_1',
        sender: 'assistant',
        text: 'Hello! I am your Omnichannel StockGuard AI Assistant. I can assist you with real-time inventory queries, product catalog searches, vendor profiles, revenue analytics, and restocking suggestions.',
        timestamp: new Date()
      }
    ];
  }

  onSend(userMessageText: string): void {
    if (!userMessageText || this.isLoading) {
      return;
    }

    const userMessage: ChatMessage = {
      id: 'msg_' + Date.now(),
      sender: 'user',
      text: userMessageText,
      timestamp: new Date()
    };

    this.messages.push(userMessage);
    this.isLoading = true;

    this.assistantService.sendMessage(userMessageText).subscribe({
      next: (response) => {
        const aiMessage: ChatMessage = {
          id: 'msg_' + Date.now(),
          sender: 'assistant',
          text: response.response,
          timestamp: response.timestamp ? new Date(response.timestamp) : new Date()
        };
        this.messages.push(aiMessage);
        this.isLoading = false;
        this.loadConversations();
      },
      error: (err) => {
        const errorMessageText = err.message || 'Error generating AI response. Please try again.';
        const errorMsg: ChatMessage = {
          id: 'err_' + Date.now(),
          sender: 'assistant',
          text: errorMessageText,
          timestamp: new Date(),
          isError: true
        };
        this.messages.push(errorMsg);
        this.isLoading = false;
      }
    });
  }

  onSelectPrompt(prompt: string): void {
    this.onSend(prompt);
  }

  onNewSession(): void {
    this.assistantService.clearSession();
    this.initWelcomeMessage();
  }

  onSelectConversation(conv: ConversationSummary): void {
    if (this.currentSessionId === conv.sessionId) {
      return;
    }
    this.loadConversationMessages(conv.sessionId);
  }

  onStartRename(conv: ConversationSummary, event: Event): void {
    event.stopPropagation();
    this.editingSessionId = conv.sessionId;
    this.editingTitleText = conv.title;
  }

  onSaveRename(conv: ConversationSummary, event: Event): void {
    event.stopPropagation();
    if (this.editingTitleText && this.editingTitleText.trim()) {
      this.assistantService.renameConversation(conv.sessionId, this.editingTitleText.trim()).subscribe({
        next: (updated) => {
          conv.title = updated.title;
          this.editingSessionId = null;
        },
        error: () => {
          this.editingSessionId = null;
        }
      });
    } else {
      this.editingSessionId = null;
    }
  }

  onCancelRename(event: Event): void {
    event.stopPropagation();
    this.editingSessionId = null;
  }

  onDeleteConversation(sessionId: string, event: Event): void {
    event.stopPropagation();
    if (confirm('Are you sure you want to delete this conversation history?')) {
      this.assistantService.deleteConversation(sessionId).subscribe({
        next: () => {
          this.conversations = this.conversations.filter(c => c.sessionId !== sessionId);
          if (this.currentSessionId === sessionId) {
            this.onNewSession();
          }
        }
      });
    }
  }

  toggleSidebar(): void {
    this.isSidebarOpen = !this.isSidebarOpen;
  }

  private scrollToBottom(): void {
    try {
      if (this.scrollContainer) {
        this.scrollContainer.nativeElement.scrollTop = this.scrollContainer.nativeElement.scrollHeight;
      }
    } catch (e) {
      // Ignore scroll errors
    }
  }
}
