package com.example.demo.assistant.controller;

import com.example.demo.assistant.dto.ChatRequest;
import com.example.demo.assistant.dto.ChatResponse;
import com.example.demo.assistant.dto.TitleUpdateRequest;
import com.example.demo.assistant.entity.Conversation;
import com.example.demo.assistant.entity.ConversationMessage;
import com.example.demo.assistant.service.AssistantService;
import com.example.demo.assistant.service.ConversationService;
import jakarta.validation.Valid;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/assistant")
@CrossOrigin(origins = "*")
public class AssistantController {

    private static final Logger log = LoggerFactory.getLogger(AssistantController.class);

    private final AssistantService assistantService;
    private final ConversationService conversationService;

    public AssistantController(AssistantService assistantService, ConversationService conversationService) {
        this.assistantService = assistantService;
        this.conversationService = conversationService;
    }

    @PostMapping("/chat")
    public ResponseEntity<ChatResponse> processChat(@Valid @RequestBody ChatRequest request) {
        log.info("Received request on POST /api/assistant/chat [sessionId: {}]", request.getSessionId());
        ChatResponse response = assistantService.processChat(request);
        return ResponseEntity.ok(response);
    }

    @GetMapping("/conversations")
    public ResponseEntity<List<Conversation>> getAllConversations() {
        log.info("Received request on GET /api/assistant/conversations");
        List<Conversation> conversations = conversationService.getAllConversations();
        return ResponseEntity.ok(conversations);
    }

    @GetMapping("/conversations/{sessionId}")
    public ResponseEntity<List<ConversationMessage>> getConversationMessages(@PathVariable String sessionId) {
        log.info("Received request on GET /api/assistant/conversations/{}", sessionId);
        List<ConversationMessage> messages = conversationService.getMessages(sessionId);
        return ResponseEntity.ok(messages);
    }

    @PutMapping("/conversations/{sessionId}/title")
    public ResponseEntity<Conversation> updateConversationTitle(
            @PathVariable String sessionId,
            @Valid @RequestBody TitleUpdateRequest request) {
        log.info("Received request on PUT /api/assistant/conversations/{}/title -> {}", sessionId, request.getTitle());
        Conversation updated = conversationService.updateTitle(sessionId, request.getTitle());
        return ResponseEntity.ok(updated);
    }

    @DeleteMapping("/conversations/{sessionId}")
    public ResponseEntity<Void> deleteConversation(@PathVariable String sessionId) {
        log.info("Received request on DELETE /api/assistant/conversations/{}", sessionId);
        conversationService.deleteConversation(sessionId);
        return ResponseEntity.noContent().build();
    }

    @PostMapping("/test")
    public ResponseEntity<ChatResponse> testAssistant(@Valid @RequestBody ChatRequest request) {
        log.info("Received request on POST /api/assistant/test [sessionId: {}]", request.getSessionId());
        ChatResponse response = assistantService.processChat(request);
        return ResponseEntity.ok(response);
    }
}
