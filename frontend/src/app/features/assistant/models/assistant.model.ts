export interface ChatRequest {
  sessionId?: string;
  message: string;
}

export interface ChatResponse {
  sessionId: string;
  response: string;
  timestamp: string;
}

export interface ChatMessage {
  id: string;
  sender: 'user' | 'assistant';
  text: string;
  timestamp: Date | string;
  isError?: boolean;
}

export interface ConversationSummary {
  id?: number;
  sessionId: string;
  userId?: number;
  title: string;
  createdAt: string;
  updatedAt: string;
}

export interface ConversationMessageDto {
  id?: number;
  sessionId: string;
  role: 'user' | 'assistant';
  message: string;
  timestamp: string;
}
