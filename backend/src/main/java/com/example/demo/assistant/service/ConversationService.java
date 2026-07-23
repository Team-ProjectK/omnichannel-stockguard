package com.example.demo.assistant.service;

import com.example.demo.assistant.entity.Conversation;
import com.example.demo.assistant.entity.ConversationMessage;
import com.example.demo.assistant.repository.ConversationMessageRepository;
import com.example.demo.assistant.repository.ConversationRepository;
import com.example.demo.exception.ResourceNotFoundException;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.time.Instant;
import java.util.List;
import java.util.UUID;

@Service
public class ConversationService {

    private static final Logger log = LoggerFactory.getLogger(ConversationService.class);

    private final ConversationRepository conversationRepo;
    private final ConversationMessageRepository messageRepo;

    public ConversationService(ConversationRepository conversationRepo,
                               ConversationMessageRepository messageRepo) {
        this.conversationRepo = conversationRepo;
        this.messageRepo = messageRepo;
    }

    public List<Conversation> getAllConversations() {
        log.info("Fetching all database conversations");
        return conversationRepo.findAllByOrderByUpdatedAtDesc();
    }

    public Conversation getConversation(String sessionId) {
        return conversationRepo.findBySessionId(sessionId)
                .orElseThrow(() -> new ResourceNotFoundException("Conversation session not found: " + sessionId));
    }

    public List<ConversationMessage> getMessages(String sessionId) {
        log.info("Fetching database message history for sessionId: {}", sessionId);
        return messageRepo.findBySessionIdOrderByTimestampAsc(sessionId);
    }

    @Transactional
    public Conversation getOrCreateConversation(String sessionId, String initialPrompt) {
        if (sessionId != null && !sessionId.trim().isEmpty()) {
            return conversationRepo.findBySessionId(sessionId.trim())
                    .orElseGet(() -> createNewConversation(sessionId.trim(), initialPrompt));
        }
        String newSessionId = UUID.randomUUID().toString();
        return createNewConversation(newSessionId, initialPrompt);
    }

    @Transactional
    public ConversationMessage saveMessage(String sessionId, String role, String text) {
        log.info("Persisting message [role: {}, sessionId: {}] to database", role, sessionId);

        Conversation conversation = conversationRepo.findBySessionId(sessionId)
                .orElseGet(() -> createNewConversation(sessionId, text));

        conversation.setUpdatedAt(Instant.now());
        conversationRepo.save(conversation);

        ConversationMessage msg = new ConversationMessage(sessionId, role, text);
        return messageRepo.save(msg);
    }

    @Transactional
    public Conversation updateTitle(String sessionId, String newTitle) {
        log.info("Renaming conversation [sessionId: {}] to '{}'", sessionId, newTitle);
        Conversation conversation = getConversation(sessionId);
        conversation.setTitle(newTitle != null ? newTitle.trim() : "Untitled Conversation");
        conversation.setUpdatedAt(Instant.now());
        return conversationRepo.save(conversation);
    }

    @Transactional
    public void deleteConversation(String sessionId) {
        log.info("Deleting conversation and message logs for sessionId: {}", sessionId);
        messageRepo.deleteBySessionId(sessionId);
        conversationRepo.deleteBySessionId(sessionId);
    }

    private Conversation createNewConversation(String sessionId, String prompt) {
        String generatedTitle = generateTitleFromPrompt(prompt);
        log.info("Creating new persistent conversation [sessionId: {}, title: '{}']", sessionId, generatedTitle);
        Conversation conversation = new Conversation(sessionId, generatedTitle);
        return conversationRepo.save(conversation);
    }

    private String generateTitleFromPrompt(String prompt) {
        if (prompt == null || prompt.trim().isEmpty()) {
            return "New AI Conversation";
        }
        String clean = prompt.trim();
        if (clean.length() <= 35) {
            return clean;
        }
        return clean.substring(0, 35) + "...";
    }
}
