package com.example.demo.assistant.service;

import com.example.demo.ai.router.AgentRouter;
import com.example.demo.assistant.dto.ChatRequest;
import com.example.demo.assistant.dto.ChatResponse;
import com.example.demo.assistant.model.ConversationSession;
import com.example.demo.assistant.rag.entity.KnowledgeChunk;
import com.example.demo.assistant.rag.service.KnowledgeService;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class AssistantService {

    private static final Logger log = LoggerFactory.getLogger(AssistantService.class);

    private final AgentRouter agentRouter;
    private final SessionManager sessionManager;
    private final KnowledgeService knowledgeService;

    public AssistantService(AgentRouter agentRouter,
                            SessionManager sessionManager,
                            KnowledgeService knowledgeService) {
        this.agentRouter = agentRouter;
        this.sessionManager = sessionManager;
        this.knowledgeService = knowledgeService;
    }

    public ChatResponse processChat(ChatRequest request) {
        if (request == null || request.getMessage() == null || request.getMessage().trim().isEmpty()) {
            throw new IllegalArgumentException("Chat request message cannot be null or empty");
        }
        ConversationSession session = sessionManager.getOrCreateSession(request.getSessionId());
        String sessionId = session.getSessionId();
        String userMessageText = request.getMessage().trim();

        // Perform RAG Knowledge Base Retrieval
        List<KnowledgeChunk> retrievedChunks = knowledgeService.searchKnowledge(userMessageText, 3);
        String augmentedMessageText = userMessageText;

        if (!retrievedChunks.isEmpty()) {
            StringBuilder ragBuilder = new StringBuilder("Retrieved Company Knowledge Base Documentation Context:\n");
            for (int i = 0; i < retrievedChunks.size(); i++) {
                ragBuilder.append(String.format("- Knowledge Document Snippet %d: %s%n", i + 1, retrievedChunks.get(i).getContent()));
            }
            augmentedMessageText = ragBuilder.toString() + "\nUser Question: " + userMessageText;
            log.info("Augmented user prompt with {} RAG knowledge chunk(s) [sessionId: {}]", retrievedChunks.size(), sessionId);
        } else {
            log.info("No matching RAG knowledge chunks found for prompt [sessionId: {}]", sessionId);
        }

        log.info("AssistantService delegating chat prompt to AgentRouter [sessionId: {}]", sessionId);

        String aiResponseText = agentRouter.routeAndProcess(sessionId, augmentedMessageText);

        return new ChatResponse(sessionId, aiResponseText);
    }
}
