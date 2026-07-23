package com.example.demo.ai.agents;

import com.example.demo.assistant.model.ConversationSession;
import com.example.demo.assistant.service.SessionManager;
import com.example.demo.ai.prompts.SystemPrompts;
import dev.langchain4j.data.message.AiMessage;
import dev.langchain4j.data.message.ChatMessage;
import dev.langchain4j.data.message.SystemMessage;
import dev.langchain4j.data.message.UserMessage;
import dev.langchain4j.model.chat.ChatLanguageModel;
import dev.langchain4j.model.output.Response;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.stereotype.Component;

import java.util.ArrayList;
import java.util.List;

@Component
public class GeneralAgent implements AIAgent {

    private static final Logger log = LoggerFactory.getLogger(GeneralAgent.class);

    private final ChatLanguageModel chatLanguageModel;
    private final SessionManager sessionManager;

    public GeneralAgent(ChatLanguageModel chatLanguageModel, SessionManager sessionManager) {
        this.chatLanguageModel = chatLanguageModel;
        this.sessionManager = sessionManager;
    }

    @Override
    public boolean supports(String message) {
        // Fallback agent supports any non-null message
        return message != null && !message.trim().isEmpty();
    }

    @Override
    public String process(String sessionId, String message) {
        log.info("GeneralAgent (Fallback) processing request [sessionId: {}]", sessionId);
        ConversationSession session = sessionManager.getOrCreateSession(sessionId);

        List<ChatMessage> promptMessages = new ArrayList<>();
        promptMessages.add(SystemMessage.from(SystemPrompts.GENERAL_PROMPT));

        synchronized (session.getMessages()) {
            for (com.example.demo.assistant.model.ChatMessage msg : session.getMessages()) {
                if ("user".equalsIgnoreCase(msg.getRole())) {
                    promptMessages.add(UserMessage.from(msg.getContent()));
                } else if ("assistant".equalsIgnoreCase(msg.getRole())) {
                    promptMessages.add(AiMessage.from(msg.getContent()));
                }
            }
        }

        promptMessages.add(UserMessage.from(message));

        Response<AiMessage> response = chatLanguageModel.generate(promptMessages);
        String aiResponseText = response.content().text();

        sessionManager.saveMessage(sessionId, "user", message);
        sessionManager.saveMessage(sessionId, "assistant", aiResponseText);

        return aiResponseText;
    }
}
