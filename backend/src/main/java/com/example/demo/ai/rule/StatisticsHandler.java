package com.example.demo.ai.rule;

import com.example.demo.model.product;
import org.springframework.stereotype.Component;

import java.util.List;

@Component
public class StatisticsHandler implements IntentHandler {

    private final EnterpriseResponseBuilder responseBuilder;

    public StatisticsHandler(EnterpriseResponseBuilder responseBuilder) {
        this.responseBuilder = responseBuilder;
    }

    @Override
    public IntentType getIntentType() {
        return IntentType.STATISTICS;
    }

    @Override
    public String handle(String userMessage, List<product> products) {
        if (products == null || products.isEmpty()) {
            return responseBuilder.buildEmptyCatalogResponse();
        }

        int totalProducts = products.size();
        int totalUnits = 0;
        int healthyProducts = 0;
        int lowStockProducts = 0;
        int criticalProducts = 0;
        int outOfStock = 0;
        int overstocked = 0;

        for (product p : products) {
            int stock = p.getStock();
            totalUnits += stock;

            if (stock <= 0) {
                outOfStock++;
                criticalProducts++;
            } else if (stock <= p.getReorderThreshold()) {
                lowStockProducts++;
            } else if (stock > 100) {
                overstocked++;
                healthyProducts++;
            } else {
                healthyProducts++;
            }
        }

        StringBuilder sb = new StringBuilder();
        sb.append(String.format("• **Total Products** : %d\n", totalProducts));
        sb.append(String.format("• **Total Units** : %d\n", totalUnits));
        sb.append(String.format("• **Healthy Products** : %d\n", healthyProducts));
        sb.append(String.format("• **Low Stock Products** : %d\n", lowStockProducts));
        sb.append(String.format("• **Critical Products** : %d\n", criticalProducts));
        sb.append(String.format("• **Out Of Stock** : %d\n", outOfStock));
        sb.append(String.format("• **Overstocked** : %d", overstocked));

        return responseBuilder.buildResponse("Inventory Statistics",
                "Summary numerical metrics across monitored catalog inventory:",
                sb.toString(), null);
    }
}
