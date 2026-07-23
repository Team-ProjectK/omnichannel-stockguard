package com.example.demo.assistant.rag.repository;

import com.example.demo.assistant.rag.entity.KnowledgeChunk;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface KnowledgeChunkRepository extends JpaRepository<KnowledgeChunk, Long> {

    List<KnowledgeChunk> findByDocumentId(Long documentId);

    void deleteByDocumentId(Long documentId);
}
