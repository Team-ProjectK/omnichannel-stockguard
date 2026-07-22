package com.example.demo.ai.rule;

import com.example.demo.model.product;
import org.springframework.stereotype.Component;

import java.util.List;

@Component
public class InventoryHandler implements IntentHandler {

    private final EnterpriseResponseBuilder responseBuilder;

    public InventoryHandler(EnterpriseResponseBuilder responseBuilder) {
        this.responseBuilder = responseBuilder;
    }

    @Override
    public IntentType getIntentType() {
        return IntentType.CURRENT_INVENTORY;
    }

    @Override
    public String handle(String userMessage, List<product> products) {
        if (products == null || products.isEmpty()) {
            return responseBuilder.buildEmptyCatalogResponse();
        }

        int totalProducts = products.size();
        int totalUnits = products.stream().mapToInt(product::getStock).sum();

        String summary = String.format("**Total Catalog Products:** %d | **Total Units on Hand:** %d", totalProducts, totalUnits);

        StringBuilder sb = new StringBuilder();
        sb.append("| Product Name | SKU | Current Stock | Price | Reorder Level | Status |\n");
        sb.append("|---|---|---|---|---|---|\n");

        for (product p : products) {
            String status = p.getStock() <= 0 ? "⚠️ Out of Stock" : (p.getStock() <= p.getReorderThreshold() ? "⚠️ Low Stock" : "✅ Healthy");
            String priceStr = p.getCurrentPrice() != null ? "₹" + p.getCurrentPrice() : "-";

            sb.append(String.format("| %s | %s | %d | %s | %d | %s |%n",
                    p.getProductName(),
                    p.getSku(),
                    p.getStock(),
                    priceStr,
                    p.getReorderThreshold(),
                    status));
        }

        return responseBuilder.buildResponse("Current Inventory Summary", summary, sb.toString(), null);
    }
}
