package com.example.demo.assistant.service;

import com.example.demo.assistant.entity.Conversation;
import com.example.demo.assistant.entity.ConversationMessage;
import com.example.demo.assistant.model.ChatMessage;
import com.example.demo.assistant.model.ConversationSession;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.stereotype.Service;

import java.time.LocalDateTime;
import java.time.ZoneId;
import java.util.List;

@Service
public class SessionManager {

    private static final Logger log = LoggerFactory.getLogger(SessionManager.class);

    private final ConversationService conversationService;

    public SessionManager(ConversationService conversationService) {
        this.conversationService = conversationService;
    }

    public ConversationSession getOrCreateSession(String sessionId) {
        Conversation conversation = conversationService.getOrCreateConversation(sessionId, "AI Query");
        String activeSessionId = conversation.getSessionId();

        ConversationSession session = new ConversationSession(activeSessionId);
        List<ConversationMessage> dbMessages = conversationService.getMessages(activeSessionId);

        for (ConversationMessage msg : dbMessages) {
            LocalDateTime ts = msg.getTimestamp() != null
                    ? LocalDateTime.ofInstant(msg.getTimestamp(), ZoneId.systemDefault())
                    : LocalDateTime.now();
            session.getMessages().add(new ChatMessage(msg.getRole(), msg.getMessage(), ts));
        }

        log.info("SessionManager loaded {} message(s) from database for sessionId: {}", dbMessages.size(), activeSessionId);
        return session;
    }

    public void saveMessage(String sessionId, String role, String content) {
        conversationService.saveMessage(sessionId, role, content);
    }

    public void clearSession(String sessionId) {
        conversationService.deleteConversation(sessionId);
    }
}
