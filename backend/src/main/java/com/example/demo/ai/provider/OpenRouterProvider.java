package com.example.demo.ai.provider;

import com.example.demo.ai.dto.OpenRouterRequest;
import com.example.demo.ai.dto.OpenRouterResponse;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.http.HttpHeaders;
import org.springframework.stereotype.Component;
import org.springframework.web.reactive.function.client.WebClient;

import java.time.Duration;
import java.util.ArrayList;
import java.util.List;

@Component
public class OpenRouterProvider implements AIProvider {

    private static final Logger log = LoggerFactory.getLogger(OpenRouterProvider.class);
    private final WebClient webClient;

    @Value("${ai.model:google/gemini-2.5-flash}")
    private String modelName;

    @Value("${ai.temperature:0.4}")
    private Double temperature;

    @Value("${ai.maxTokens:2048}")
    private Integer maxTokens;

    @Value("${openrouter.api.key:}")
    private String apiKey;

    public OpenRouterProvider(WebClient openRouterWebClient) {
        this.webClient = openRouterWebClient;
    }

    @Override
    public String generateResponse(String systemPrompt, String userMessage) {
        if (apiKey == null || apiKey.trim().isEmpty()) {
            log.warn("OpenRouter API key is missing. OPENROUTER_API_KEY environment variable not set.");
            throw new IllegalStateException("OpenRouter API key missing. Please set OPENROUTER_API_KEY environment variable.");
        }

        List<OpenRouterRequest.Message> messages = new ArrayList<>();
        if (systemPrompt != null && !systemPrompt.trim().isEmpty()) {
            messages.add(new OpenRouterRequest.Message("system", systemPrompt));
        }

        messages.add(new OpenRouterRequest.Message("user", userMessage != null ? userMessage : ""));

        OpenRouterRequest requestPayload = new OpenRouterRequest(modelName, messages, temperature, maxTokens);

        try {
            log.info("Sending request to OpenRouter API using model: {}", modelName);
            OpenRouterResponse response = webClient.post()
                    .header(HttpHeaders.AUTHORIZATION, "Bearer " + apiKey.trim())
                    .bodyValue(requestPayload)
                    .retrieve()
                    .bodyToMono(OpenRouterResponse.class)
                    .timeout(Duration.ofSeconds(30))
                    .block();

            if (response != null && response.getChoices() != null && !response.getChoices().isEmpty()) {
                OpenRouterResponse.Choice choice = response.getChoices().get(0);
                if (choice != null && choice.getMessage() != null && choice.getMessage().getContent() != null) {
                    return choice.getMessage().getContent();
                }
            }
            throw new RuntimeException("Empty or malformed response returned by OpenRouter API.");

        } catch (Exception e) {
            log.error("Failed calling OpenRouter API model {}: {}", modelName, e.getMessage());
            throw new RuntimeException("OpenRouter API call failed: " + e.getMessage(), e);
        }
    }
}
