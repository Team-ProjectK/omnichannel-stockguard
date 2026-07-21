package com.example.demo.ai.rule;

import com.example.demo.model.product;
import org.springframework.stereotype.Component;

import java.util.ArrayList;
import java.util.List;
import java.util.Locale;

@Component
public class ProductHandler implements IntentHandler {

    private final EnterpriseResponseBuilder responseBuilder;

    public ProductHandler(EnterpriseResponseBuilder responseBuilder) {
        this.responseBuilder = responseBuilder;
    }

    @Override
    public IntentType getIntentType() {
        return IntentType.PRODUCT_LOOKUP;
    }

    @Override
    public String handle(String userMessage, List<product> products) {
        if (products == null || products.isEmpty()) {
            return responseBuilder.buildEmptyCatalogResponse();
        }

        String query = userMessage != null ? userMessage.toLowerCase(Locale.ROOT) : "";
        List<product> matches = new ArrayList<>();

        for (product p : products) {
            if (p.getSku() != null && query.contains(p.getSku().toLowerCase())) {
                matches.add(p);
            } else if (p.getProductName() != null) {
                String pName = p.getProductName().toLowerCase();
                if (query.contains(pName) || pName.contains(query)) {
                    matches.add(p);
                } else {
                    // Partial word match (e.g. "mouse", "keyboard")
                    String[] words = pName.split("\\s+");
                    for (String word : words) {
                        if (word.length() >= 4 && query.contains(word)) {
                            matches.add(p);
                            break;
                        }
                    }
                }
            }
        }

        if (matches.isEmpty()) {
            return responseBuilder.buildHeader("Product Lookup") +
                    "No matching product was found.\n\n" +
                    "Try searching using:\n\n" +
                    "• Product Name\n" +
                    "• SKU\n\n" +
                    "Examples:\n\n" +
                    "Wireless Mouse\n" +
                    "Mechanical Keyboard\n" +
                    "SKU101\n" +
                    "SKU102";
        }

        StringBuilder sb = new StringBuilder();
        for (product p : matches) {
            String status = p.getStock() <= 0 ? "⚠️ Out of Stock" : (p.getStock() <= p.getReorderThreshold() ? "⚠️ Low Stock" : "✅ Healthy");
            String rec = p.getStock() <= 0 ? "Generate urgent purchase order (Critical Stockout)" :
                    (p.getStock() <= p.getReorderThreshold() ? "Initiate reorder replenishment" : "Stock level is healthy");

            sb.append(String.format("#### 📦 %s (SKU: %s)\n", p.getProductName(), p.getSku()));
            sb.append(String.format("• **Current Stock** : %d units\n", p.getStock()));
            sb.append(String.format("• **Current Price** : %s\n", p.getCurrentPrice() != null ? "₹" + p.getCurrentPrice() : "N/A"));
            sb.append(String.format("• **Base Price** : %s\n", p.getBasePrice() != null ? "₹" + p.getBasePrice() : "N/A"));
            sb.append(String.format("• **Reorder Safety Level** : %d units\n", p.getReorderThreshold()));
            sb.append(String.format("• **Status** : %s\n", status));
            sb.append(String.format("• **Recommendation** : %s\n\n", rec));
        }

        return responseBuilder.buildResponse("Product Lookup Results",
                String.format("Matched **%d** product(s) in catalog database:", matches.size()),
                sb.toString().trim(), null);
    }
}
