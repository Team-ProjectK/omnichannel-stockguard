package com.example.demo.repository;

import com.example.demo.model.ReorderRequest;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface ReorderRequestRepository extends JpaRepository<ReorderRequest, Long> {

    List<ReorderRequest> findByStatus(String status);

}