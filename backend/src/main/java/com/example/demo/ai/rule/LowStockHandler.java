package com.example.demo.ai.rule;

import com.example.demo.model.product;
import org.springframework.stereotype.Component;

import java.util.ArrayList;
import java.util.List;

@Component
public class LowStockHandler implements IntentHandler {

    private final EnterpriseResponseBuilder responseBuilder;

    public LowStockHandler(EnterpriseResponseBuilder responseBuilder) {
        this.responseBuilder = responseBuilder;
    }

    @Override
    public IntentType getIntentType() {
        return IntentType.LOW_STOCK;
    }

    @Override
    public String handle(String userMessage, List<product> products) {
        if (products == null || products.isEmpty()) {
            return responseBuilder.buildEmptyCatalogResponse();
        }

        List<product> lowStockItems = new ArrayList<>();
        for (product p : products) {
            if (p.getStock() <= p.getReorderThreshold()) {
                lowStockItems.add(p);
            }
        }

        if (lowStockItems.isEmpty()) {
            return responseBuilder.buildResponse("Low Stock & Reorder Alert Report",
                    "✅ All products in the catalog are currently operating safely above reorder thresholds.", null, null);
        }

        StringBuilder sb = new StringBuilder();
        sb.append("| Product Name | SKU | Current Stock | Safety Threshold | Status |\n");
        sb.append("|---|---|---|---|---|\n");

        for (product p : lowStockItems) {
            String status = p.getStock() <= 0 ? "🔴 CRITICAL STOCKOUT" : "⚠️ LOW STOCK";
            sb.append(String.format("| %s | %s | %d | %d | %s |\n",
                    p.getProductName(), p.getSku(), p.getStock(), p.getReorderThreshold(), status));
        }

        return responseBuilder.buildResponse("Low Stock & Reorder Alert Report",
                String.format("Identified **%d** product(s) requiring replenishment attention:", lowStockItems.size()),
                sb.toString(),
                List.of(
                        "Generate purchase orders for items at or below safety reorder threshold.",
                        "Rebalance inventory locations to avoid order cancellation risk."
                ));
    }
}
