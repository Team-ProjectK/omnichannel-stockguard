package com.example.demo.assistant.rag.service;

import org.apache.pdfbox.Loader;
import org.apache.pdfbox.pdmodel.PDDocument;
import org.apache.pdfbox.text.PDFTextStripper;
import org.apache.poi.xwpf.extractor.XWPFWordExtractor;
import org.apache.poi.xwpf.usermodel.XWPFDocument;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;

import java.io.InputStream;
import java.nio.charset.StandardCharsets;

@Service
public class DocumentLoader {

    private static final Logger log = LoggerFactory.getLogger(DocumentLoader.class);

    public String extractText(MultipartFile file) {
        String filename = file.getOriginalFilename();
        log.info("Extracting text from uploaded file: {}", filename);

        if (filename == null) {
            throw new IllegalArgumentException("File name cannot be null");
        }

        String lower = filename.toLowerCase();

        try {
            if (lower.endsWith(".pdf")) {
                return extractFromPdf(file.getBytes());
            } else if (lower.endsWith(".docx")) {
                return extractFromDocx(file.getInputStream());
            } else if (lower.endsWith(".txt") || lower.endsWith(".md") || lower.endsWith(".markdown")) {
                return new String(file.getBytes(), StandardCharsets.UTF_8);
            } else {
                // Fallback to UTF-8 text parsing
                return new String(file.getBytes(), StandardCharsets.UTF_8);
            }
        } catch (Exception e) {
            log.error("Failed extracting text from document '{}': {}", filename, e.getMessage());
            throw new RuntimeException("Error parsing document text: " + e.getMessage(), e);
        }
    }

    private String extractFromPdf(byte[] pdfBytes) throws Exception {
        try (PDDocument document = Loader.loadPDF(pdfBytes)) {
            PDFTextStripper stripper = new PDFTextStripper();
            return stripper.getText(document);
        }
    }

    private String extractFromDocx(InputStream inputStream) throws Exception {
        try (XWPFDocument doc = new XWPFDocument(inputStream);
             XWPFWordExtractor extractor = new XWPFWordExtractor(doc)) {
            return extractor.getText();
        }
    }
}
