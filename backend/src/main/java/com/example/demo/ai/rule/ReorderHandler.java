package com.example.demo.ai.rule;

import com.example.demo.model.product;
import org.springframework.stereotype.Component;

import java.util.ArrayList;
import java.util.List;

@Component
public class ReorderHandler implements IntentHandler {

    private final EnterpriseResponseBuilder responseBuilder;

    public ReorderHandler(EnterpriseResponseBuilder responseBuilder) {
        this.responseBuilder = responseBuilder;
    }

    @Override
    public IntentType getIntentType() {
        return IntentType.REORDER;
    }

    @Override
    public String handle(String userMessage, List<product> products) {
        if (products == null || products.isEmpty()) {
            return responseBuilder.buildEmptyCatalogResponse();
        }

        List<product> reorderItems = new ArrayList<>();
        for (product p : products) {
            if (p.getStock() <= p.getReorderThreshold()) {
                reorderItems.add(p);
            }
        }

        if (reorderItems.isEmpty()) {
            return responseBuilder.buildResponse("Automated Reorder & Replenishment Plan",
                    "✅ All stock levels are currently healthy above safety reorder limits. No purchase orders required today.", null, null);
        }

        StringBuilder sb = new StringBuilder();
        sb.append("| Product Name | Current Stock | Safety Threshold | Recommended Qty | Priority | Action |\n");
        sb.append("|---|---|---|---|---|---|\n");

        for (product p : reorderItems) {
            int recQty = Math.max(30, (p.getReorderThreshold() * 2) - p.getStock());
            String priority = p.getStock() <= 0 ? "CRITICAL" : (p.getStock() < 5 ? "HIGH" : "MEDIUM");
            String action = priority.equals("CRITICAL") ? "Issue Immediate PO (24h)" : "Schedule Restock (3 Days)";

            sb.append(String.format("| %s | %d | %d | %d | %s | %s |%n",
                    p.getProductName(), p.getStock(), p.getReorderThreshold(), recQty, priority, action));
        }

        return responseBuilder.buildResponse("Automated Reorder & Replenishment Plan",
                "Products requiring immediate replenishment:",
                sb.toString(),
                List.of(
                        "Submit purchase orders to primary suppliers for critical stock items.",
                        "Track vendor fulfillment run-rates."
                ));
    }
}
