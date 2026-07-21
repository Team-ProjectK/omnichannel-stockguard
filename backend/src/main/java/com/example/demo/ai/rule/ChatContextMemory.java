package com.example.demo.ai.rule;

import com.example.demo.model.product;
import org.springframework.stereotype.Component;

import java.util.ArrayList;
import java.util.List;
import java.util.Map;
import java.util.concurrent.ConcurrentHashMap;

@Component
public class ChatContextMemory {

    public static class SessionState {
        private IntentType lastIntent = IntentType.UNKNOWN;
        private List<product> lastMatchedProducts = new ArrayList<>();
        private String lastSearchQuery = "";
        private long lastInteractionTime = System.currentTimeMillis();

        public IntentType getLastIntent() { return lastIntent; }
        public void setLastIntent(IntentType lastIntent) { this.lastIntent = lastIntent; }

        public List<product> getLastMatchedProducts() { return lastMatchedProducts; }
        public void setLastMatchedProducts(List<product> lastMatchedProducts) {
            this.lastMatchedProducts = lastMatchedProducts != null ? lastMatchedProducts : new ArrayList<>();
        }

        public String getLastSearchQuery() { return lastSearchQuery; }
        public void setLastSearchQuery(String lastSearchQuery) { this.lastSearchQuery = lastSearchQuery; }

        public long getLastInteractionTime() { return lastInteractionTime; }
        public void touch() { this.lastInteractionTime = System.currentTimeMillis(); }
    }

    private final Map<String, SessionState> memory = new ConcurrentHashMap<>();

    public SessionState getSession(String sessionId) {
        String key = sessionId != null ? sessionId : "default_session";
        SessionState state = memory.computeIfAbsent(key, k -> new SessionState());
        
        // Auto-expire session context after 15 minutes of inactivity
        if (System.currentTimeMillis() - state.getLastInteractionTime() > 15 * 60 * 1000) {
            state.setLastIntent(IntentType.UNKNOWN);
            state.getLastMatchedProducts().clear();
            state.setLastSearchQuery("");
        }
        state.touch();
        return state;
    }

    public void updateSession(String sessionId, IntentType intent, List<product> matchedProducts, String query) {
        SessionState state = getSession(sessionId);
        state.setLastIntent(intent);
        if (matchedProducts != null && !matchedProducts.isEmpty()) {
            state.setLastMatchedProducts(matchedProducts);
        }
        if (query != null && !query.trim().isEmpty()) {
            state.setLastSearchQuery(query);
        }
        state.touch();
    }
}
