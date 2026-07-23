package com.example.demo.assistant.repository;

import com.example.demo.assistant.entity.ConversationMessage;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface ConversationMessageRepository extends JpaRepository<ConversationMessage, Long> {

    List<ConversationMessage> findBySessionIdOrderByTimestampAsc(String sessionId);

    void deleteBySessionId(String sessionId);
}
