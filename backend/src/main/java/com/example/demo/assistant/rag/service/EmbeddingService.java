package com.example.demo.assistant.rag.service;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.Arrays;
import java.util.Collections;
import java.util.List;
import java.util.Set;
import java.util.regex.Pattern;
import java.util.stream.Collectors;

@Service
public class EmbeddingService {

    private static final Logger log = LoggerFactory.getLogger(EmbeddingService.class);
    private static final Pattern WORD_PATTERN = Pattern.compile("\\W+");

    public List<String> chunkText(String rawText, int maxChunkSize, int overlap) {
        if (rawText == null || rawText.trim().isEmpty()) {
            return Collections.emptyList();
        }

        List<String> chunks = new ArrayList<>();
        String normalized = rawText.replaceAll("\\r\\n|\\r", "\n");
        int length = normalized.length();
        int start = 0;

        while (start < length) {
            int end = Math.min(start + maxChunkSize, length);
            String chunk = normalized.substring(start, end).trim();
            if (!chunk.isEmpty()) {
                chunks.add(chunk);
            }
            if (end == length) {
                break;
            }
            start = end - overlap;
        }

        log.info("Split text (length: {}) into {} chunk(s)", length, chunks.size());
        return chunks;
    }

    public double calculateSimilarity(String query, String chunkContent) {
        if (query == null || chunkContent == null) {
            return 0.0;
        }

        Set<String> queryWords = tokenize(query);
        Set<String> chunkWords = tokenize(chunkContent);

        if (queryWords.isEmpty() || chunkWords.isEmpty()) {
            return 0.0;
        }

        long matchCount = queryWords.stream()
                .filter(chunkWords::contains)
                .count();

        // Jaccard similarity coefficient weighted by query coverage
        return (double) matchCount / queryWords.size();
    }

    private Set<String> tokenize(String text) {
        String[] tokens = WORD_PATTERN.split(text.toLowerCase());
        return Arrays.stream(tokens)
                .filter(w -> w.length() > 2)
                .collect(Collectors.toSet());
    }
}
