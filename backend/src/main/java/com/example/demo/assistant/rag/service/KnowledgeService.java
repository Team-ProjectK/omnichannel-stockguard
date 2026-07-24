package com.example.demo.assistant.rag.service;

import com.example.demo.assistant.rag.entity.KnowledgeChunk;
import com.example.demo.assistant.rag.entity.KnowledgeDocument;
import com.example.demo.assistant.rag.repository.KnowledgeChunkRepository;
import com.example.demo.assistant.rag.repository.KnowledgeDocumentRepository;
import com.example.demo.exception.ResourceNotFoundException;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.web.multipart.MultipartFile;

import java.util.Collections;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

@Service
public class KnowledgeService {

    private static final Logger log = LoggerFactory.getLogger(KnowledgeService.class);

    private final KnowledgeDocumentRepository documentRepo;
    private final KnowledgeChunkRepository chunkRepo;
    private final DocumentLoader documentLoader;
    private final EmbeddingService embeddingService;

    public KnowledgeService(KnowledgeDocumentRepository documentRepo,
                            KnowledgeChunkRepository chunkRepo,
                            DocumentLoader documentLoader,
                            EmbeddingService embeddingService) {
        this.documentRepo = documentRepo;
        this.chunkRepo = chunkRepo;
        this.documentLoader = documentLoader;
        this.embeddingService = embeddingService;
    }

    @Transactional
    public KnowledgeDocument uploadDocument(MultipartFile file) {
        long startTime = System.currentTimeMillis();
        String filename = file.getOriginalFilename();
        log.info("KnowledgeService uploading document: {} (size: {} bytes)", filename, file.getSize());

        String extractedText = documentLoader.extractText(file);
        List<String> chunks = embeddingService.chunkText(extractedText, 500, 50);

        String fileType = filename != null && filename.contains(".") 
                ? filename.substring(filename.lastIndexOf(".") + 1).toUpperCase() 
                : "UNKNOWN";

        KnowledgeDocument doc = new KnowledgeDocument(filename, fileType, file.getSize(), chunks.size());
        KnowledgeDocument savedDoc = documentRepo.save(doc);

        for (int i = 0; i < chunks.size(); i++) {
            KnowledgeChunk chunk = new KnowledgeChunk(savedDoc.getId(), i, chunks.get(i), "VECTOR_SIMULATION");
            chunkRepo.save(chunk);
        }

        long executionTime = System.currentTimeMillis() - startTime;
        log.info("Document '{}' ingested into {} chunk(s) in {} ms", filename, chunks.size(), executionTime);

        return savedDoc;
    }

    public List<KnowledgeDocument> getAllDocuments() {
        return documentRepo.findAllByOrderByUploadedAtDesc();
    }

    @Transactional
    public void deleteDocument(Long id) {
        log.info("Deleting knowledge document ID: {}", id);
        if (!documentRepo.existsById(id)) {
            throw new ResourceNotFoundException("Knowledge document not found: " + id);
        }
        chunkRepo.deleteByDocumentId(id);
        documentRepo.deleteById(id);
    }

    public List<KnowledgeChunk> searchKnowledge(String query, int topN) {
        long startTime = System.currentTimeMillis();
        log.info("Performing RAG Knowledge Search for query: '{}'", query);

        List<KnowledgeChunk> allChunks = chunkRepo.findAll();
        if (allChunks.isEmpty()) {
            log.info("Knowledge base is empty. Returning 0 RAG chunks.");
            return Collections.emptyList();
        }

        // Rank chunks by similarity score
        Map<KnowledgeChunk, Double> scores = new HashMap<>();
        for (KnowledgeChunk chunk : allChunks) {
            double score = embeddingService.calculateSimilarity(query, chunk.getContent());
            if (score >= 0.15) { // Minimum similarity threshold
                scores.put(chunk, score);
            }
        }

        List<KnowledgeChunk> topChunks = scores.entrySet().stream()
                .sorted(Map.Entry.<KnowledgeChunk, Double>comparingByValue().reversed())
                .limit(topN)
                .map(Map.Entry::getKey)
                .toList();

        long executionTime = System.currentTimeMillis() - startTime;
        log.info("RAG Knowledge Search finished in {} ms -> Found {} relevant chunk(s)", executionTime, topChunks.size());

        return topChunks;
    }
}
