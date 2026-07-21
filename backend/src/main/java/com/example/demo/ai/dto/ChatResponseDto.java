package com.example.demo.ai.dto;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.time.LocalDateTime;

@Data
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class ChatResponseDto {
    private String response;
    private LocalDateTime timestamp;
    private String status;
    private String modelUsed;
    private String errorMessage;
}
