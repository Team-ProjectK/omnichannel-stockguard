package com.example.demo.assistant.repository;

import com.example.demo.assistant.entity.Conversation;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Optional;

@Repository
public interface ConversationRepository extends JpaRepository<Conversation, Long> {

    Optional<Conversation> findBySessionId(String sessionId);

    List<Conversation> findAllByOrderByUpdatedAtDesc();

    boolean existsBySessionId(String sessionId);

    void deleteBySessionId(String sessionId);
}
