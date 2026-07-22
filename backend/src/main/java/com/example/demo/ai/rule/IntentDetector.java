package com.example.demo.ai.rule;

import com.example.demo.model.product;
import org.springframework.stereotype.Component;

import java.util.*;

@Component
public class IntentDetector {

    public IntentConfidence detectIntentWithConfidence(String rawMessage, List<product> products, ChatContextMemory.SessionState sessionState) {
        if (rawMessage == null || rawMessage.trim().isEmpty()) {
            return new IntentConfidence(IntentType.UNKNOWN, 1.0);
        }

        String text = rawMessage.trim().toLowerCase(Locale.ROOT);
        List<IntentConfidence> candidates = new ArrayList<>();

        // 1. GOODBYE INTENT
        double goodbyeScore = calculateGoodbyeScore(text);
        if (goodbyeScore > 0.0) {
            candidates.add(new IntentConfidence(IntentType.GOODBYE, goodbyeScore));
        }

        // 2. GREETING INTENT
        double greetingScore = calculateGreetingScore(text);
        if (greetingScore > 0.0) {
            candidates.add(new IntentConfidence(IntentType.GREETING, greetingScore));
        }

        // 3. PRODUCT LOOKUP INTENT
        double productScore = calculateProductLookupScore(text, products);
        if (productScore > 0.0) {
            candidates.add(new IntentConfidence(IntentType.PRODUCT_LOOKUP, productScore));
        }

        // 4. STATISTICS INTENT
        double statsScore = calculateStatsScore(text);
        if (statsScore > 0.0) {
            candidates.add(new IntentConfidence(IntentType.STATISTICS, statsScore));
        }

        // 5. REORDER INTENT
        double reorderScore = calculateReorderScore(text);
        if (reorderScore > 0.0) {
            candidates.add(new IntentConfidence(IntentType.REORDER, reorderScore));
        }

        // 6. LOW STOCK INTENT
        double lowStockScore = calculateLowStockScore(text);
        if (lowStockScore > 0.0) {
            candidates.add(new IntentConfidence(IntentType.LOW_STOCK, lowStockScore));
        }

        // 7. HEALTH INTENT
        double healthScore = calculateHealthScore(text);
        if (healthScore > 0.0) {
            candidates.add(new IntentConfidence(IntentType.HEALTH, healthScore));
        }

        // 8. ANALYTICS INTENT
        double analyticsScore = calculateAnalyticsScore(text);
        if (analyticsScore > 0.0) {
            candidates.add(new IntentConfidence(IntentType.ANALYTICS, analyticsScore));
        }

        // 9. PRICING INTENT
        double pricingScore = calculatePricingScore(text);
        if (pricingScore > 0.0) {
            candidates.add(new IntentConfidence(IntentType.PRICING, pricingScore));
        }

        // 10. CURRENT INVENTORY INTENT
        double inventoryScore = calculateInventoryScore(text);
        if (inventoryScore > 0.0) {
            candidates.add(new IntentConfidence(IntentType.CURRENT_INVENTORY, inventoryScore));
        }

        // 11. AMBIGUOUS FOLLOW-UP CONTEXT RESOLUTION
        if (candidates.isEmpty() && sessionState != null && sessionState.getLastIntent() != IntentType.UNKNOWN && isAmbiguousFollowUp(text)) {
            return new IntentConfidence(sessionState.getLastIntent(), 0.85);
        }

        if (candidates.isEmpty()) {
            return new IntentConfidence(IntentType.UNKNOWN, 1.0);
        }

        candidates.sort(null); // Sorts descending by score
        return candidates.get(0);
    }

    private double calculateGoodbyeScore(String text) {
        String clean = text.replaceAll("[^a-zA-Z0-9 ]", "").trim();
        if (clean.equals("bye") || clean.equals("ok bye") || clean.equals("goodbye") ||
                clean.equals("see you") || clean.equals("exit") || clean.equals("quit") || clean.equals("cya")) {
            return 0.98;
        }
        return 0.0;
    }

    private double calculateGreetingScore(String text) {
        String clean = text.replaceAll("[^a-zA-Z0-9 ]", "").trim();
        if (clean.equals("hi") || clean.equals("hii") || clean.equals("hiii") || clean.equals("hello") ||
                clean.equals("hey") || clean.equals("good morning") || clean.equals("good afternoon") ||
                clean.equals("good evening") || clean.equals("thanks") || clean.equals("thank you") ||
                clean.equals("how are you") || clean.equals("hi there")) {
            return 0.95;
        }
        if (text.startsWith("hi ") || text.startsWith("hello ") || text.startsWith("hey ")) {
            return 0.80;
        }
        return 0.0;
    }

    private double calculateProductLookupScore(String text, List<product> products) {
        if (products == null || products.isEmpty()) return 0.0;
        double maxScore = 0.0;

        for (product p : products) {
            if (p.getSku() != null && !p.getSku().isEmpty()) {
                String sku = p.getSku().toLowerCase();
                if (text.equalsIgnoreCase(sku)) return 0.99;
                if (text.contains(sku)) maxScore = Math.max(maxScore, 0.92);
            }
            if (p.getProductName() != null && !p.getProductName().isEmpty()) {
                String name = p.getProductName().toLowerCase();
                if (text.equalsIgnoreCase(name)) return 0.98;
                if (text.contains(name)) maxScore = Math.max(maxScore, 0.90);
                
                // Partial word match (e.g. "mouse", "keyboard", "dell")
                String[] words = name.split("\\s+");
                for (String word : words) {
                    if (word.length() >= 4 && text.contains(word)) {
                        maxScore = Math.max(maxScore, 0.75);
                    }
                }
            }
        }
        return maxScore;
    }

    private double calculateStatsScore(String text) {
        if (text.contains("give in numbers") || text.contains("only numbers") || text.contains("inventory numbers")) return 0.98;
        if (text.contains("statistics") || text.contains("stats") || text.contains("metrics")) return 0.92;
        if (text.contains("show count") || text.contains("summary count")) return 0.88;
        return 0.0;
    }

    private double calculateReorderScore(String text) {
        if (text.contains("generate purchase order") || text.contains("what should i reorder")) return 0.98;
        if (text.contains("reorder") || text.contains("replenish") || text.contains("restock") || text.contains("purchase order") || text.contains("refill")) return 0.90;
        return 0.0;
    }

    private double calculateLowStockScore(String text) {
        if (text.contains("only low stock") || text.contains("products below threshold")) return 0.98;
        if (text.contains("low stock") || text.contains("below threshold") || text.contains("critical stock") || text.contains("out of stock") || text.contains("shortage")) return 0.90;
        return 0.0;
    }

    private double calculateHealthScore(String text) {
        if (text.contains("inventory health") || text.contains("system health") || text.contains("health report")) return 0.98;
        if (text.contains("health") || text.contains("system status") || text.contains("health score")) return 0.88;
        return 0.0;
    }

    private double calculateAnalyticsScore(String text) {
        if (text.contains("highest stock") || text.contains("lowest stock") || text.contains("most expensive") || text.contains("cheapest product") || text.contains("highest inventory value")) return 0.98;
        if (text.contains("inventory value") || text.contains("valuation") || text.contains("analytics") || text.contains("top inventory")) return 0.90;
        return 0.0;
    }

    private double calculatePricingScore(String text) {
        if (text.contains("product price") || text.contains("selling price") || text.contains("how much")) return 0.98;
        if (text.contains("price") || text.contains("cost") || text.contains("rate") || text.contains("pricing")) return 0.88;
        return 0.0;
    }

    private double calculateInventoryScore(String text) {
        if (text.contains("show inventory") || text.contains("current stock") || text.contains("current inventory")) return 0.98;
        if (text.contains("inventory") || text.contains("stock") || text.contains("catalog") || text.contains("available inventory") || text.contains("items available")) return 0.85;
        return 0.0;
    }

    private boolean isAmbiguousFollowUp(String text) {
        String clean = text.replaceAll("[^a-zA-Z0-9 ]", "").trim();
        return clean.equals("tell me more") || clean.equals("show details") || clean.equals("which one") ||
                clean.equals("more info") || clean.equals("give details") || clean.equals("explain more") ||
                clean.equals("details") || clean.equals("more");
    }
}
