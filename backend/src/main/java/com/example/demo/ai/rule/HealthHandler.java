package com.example.demo.ai.rule;

import com.example.demo.model.product;
import org.springframework.stereotype.Component;

import java.util.List;

@Component
public class HealthHandler implements IntentHandler {

    private final EnterpriseResponseBuilder responseBuilder;

    public HealthHandler(EnterpriseResponseBuilder responseBuilder) {
        this.responseBuilder = responseBuilder;
    }

    @Override
    public IntentType getIntentType() {
        return IntentType.HEALTH;
    }

    @Override
    public String handle(String userMessage, List<product> products) {
        if (products == null || products.isEmpty()) {
            return responseBuilder.buildEmptyCatalogResponse();
        }

        int total = products.size();
        int healthy = 0;
        int lowStock = 0;
        int critical = 0;
        int outOfStock = 0;

        for (product p : products) {
            if (p.getStock() <= 0) {
                outOfStock++;
                critical++;
            } else if (p.getStock() <= p.getReorderThreshold()) {
                lowStock++;
            } else {
                healthy++;
            }
        }

        int scoreValue = Math.max(20, 100 - (lowStock * 10) - (critical * 20));
        String healthStatus = critical > 0 ? "CRITICAL_ATTENTION" : (lowStock > 2 ? "NEEDS_REORDER" : "HEALTHY");

        String summary = String.format("• **Overall System Status** : **%s**\n• **Health Score** : **%d/100**", healthStatus, scoreValue);

        StringBuilder sb = new StringBuilder();
        sb.append("#### Stock Level Breakdown:\n");
        sb.append(String.format("• **Healthy SKUs** : %d / %d\n", healthy, total));
        sb.append(String.format("• **Low Stock Alerts** : %d\n", lowStock));
        sb.append(String.format("• **Critical Stockouts** : %d\n", critical));
        sb.append(String.format("• **Out Of Stock Items** : %d", outOfStock));

        return responseBuilder.buildResponse("StockGuard System Inventory Health Audit",
                summary,
                sb.toString(),
                List.of(
                        "Immediately issue purchase orders for out-of-stock SKUs to minimize revenue loss.",
                        "Review reorder suggestions for low stock items near safety threshold.",
                        "Audit dynamic pricing rules to maximize margins on high-demand items."
                ));
    }
}
