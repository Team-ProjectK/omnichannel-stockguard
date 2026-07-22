package com.example.demo.ai.util;

public class PromptSanitizer {

    private PromptSanitizer() {
        // Private constructor to prevent instantiation of utility class
    }

    public static String sanitize(String input) {
        if (input == null) {
            return "";
        }
        String sanitized = input.trim();
        // Remove basic script tag injections or malicious control sequences
        sanitized = sanitized.replaceAll("(?i)<script.*?>.*?</script>", "");
        // Limit max prompt size to prevent token exhaustion attacks
        if (sanitized.length() > 2000) {
            sanitized = sanitized.substring(0, 2000);
        }
        return sanitized;
    }
}
