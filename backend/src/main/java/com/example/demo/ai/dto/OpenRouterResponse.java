package com.example.demo.ai.dto;

import com.fasterxml.jackson.annotation.JsonIgnoreProperties;
import java.util.List;

@JsonIgnoreProperties(ignoreUnknown = true)
public class OpenRouterResponse {
    private String id;
    private String model;
    private List<Choice> choices;

    public OpenRouterResponse() {
    }

    public OpenRouterResponse(String id, String model, List<Choice> choices) {
        this.id = id;
        this.model = model;
        this.choices = choices;
    }

    public String getId() { return id; }
    public void setId(String id) { this.id = id; }

    public String getModel() { return model; }
    public void setModel(String model) { this.model = model; }

    public List<Choice> getChoices() { return choices; }
    public void setChoices(List<Choice> choices) { this.choices = choices; }

    @JsonIgnoreProperties(ignoreUnknown = true)
    public static class Choice {
        private Message message;
        private String finish_reason;

        public Choice() {
        }

        public Choice(Message message, String finish_reason) {
            this.message = message;
            this.finish_reason = finish_reason;
        }

        public Message getMessage() { return message; }
        public void setMessage(Message message) { this.message = message; }

        public String getFinish_reason() { return finish_reason; }
        public void setFinish_reason(String finish_reason) { this.finish_reason = finish_reason; }
    }

    @JsonIgnoreProperties(ignoreUnknown = true)
    public static class Message {
        private String role;
        private String content;

        public Message() {
        }

        public Message(String role, String content) {
            this.role = role;
            this.content = content;
        }

        public String getRole() { return role; }
        public void setRole(String role) { this.role = role; }

        public String getContent() { return content; }
        public void setContent(String content) { this.content = content; }
    }
}
