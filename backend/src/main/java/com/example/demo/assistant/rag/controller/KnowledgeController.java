package com.example.demo.assistant.rag.controller;

import com.example.demo.assistant.rag.entity.KnowledgeChunk;
import com.example.demo.assistant.rag.entity.KnowledgeDocument;
import com.example.demo.assistant.rag.service.KnowledgeService;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

import java.util.List;

@RestController
@RequestMapping("/api/knowledge")
@CrossOrigin(origins = "*")
public class KnowledgeController {

    private static final Logger log = LoggerFactory.getLogger(KnowledgeController.class);

    private final KnowledgeService knowledgeService;

    public KnowledgeController(KnowledgeService knowledgeService) {
        this.knowledgeService = knowledgeService;
    }

    @PostMapping(value = "/upload", consumes = MediaType.MULTIPART_FORM_DATA_VALUE)
    public ResponseEntity<KnowledgeDocument> uploadDocument(@RequestParam("file") MultipartFile file) {
        log.info("Received POST /api/knowledge/upload for file: {}", file.getOriginalFilename());
        KnowledgeDocument doc = knowledgeService.uploadDocument(file);
        return ResponseEntity.ok(doc);
    }

    @GetMapping
    public ResponseEntity<List<KnowledgeDocument>> getAllDocuments() {
        log.info("Received GET /api/knowledge");
        List<KnowledgeDocument> docs = knowledgeService.getAllDocuments();
        return ResponseEntity.ok(docs);
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Void> deleteDocument(@PathVariable Long id) {
        log.info("Received DELETE /api/knowledge/{}", id);
        knowledgeService.deleteDocument(id);
        return ResponseEntity.noContent().build();
    }

    @GetMapping("/search")
    public ResponseEntity<List<KnowledgeChunk>> searchKnowledge(@RequestParam("q") String query) {
        log.info("Received GET /api/knowledge/search?q={}", query);
        List<KnowledgeChunk> chunks = knowledgeService.searchKnowledge(query, 3);
        return ResponseEntity.ok(chunks);
    }
}
