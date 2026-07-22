package com.example.demo.ai.rule;

import com.example.demo.model.product;
import org.springframework.stereotype.Component;

import java.util.Comparator;
import java.util.List;

@Component
public class AnalyticsHandler implements IntentHandler {

    private final EnterpriseResponseBuilder responseBuilder;

    public AnalyticsHandler(EnterpriseResponseBuilder responseBuilder) {
        this.responseBuilder = responseBuilder;
    }

    @Override
    public IntentType getIntentType() {
        return IntentType.ANALYTICS;
    }

    @Override
    public String handle(String userMessage, List<product> products) {
        if (products == null || products.isEmpty()) {
            return responseBuilder.buildEmptyCatalogResponse();
        }

        product highestStock = products.stream().max(Comparator.comparingInt(product::getStock)).orElse(null);
        product lowestStock = products.stream().min(Comparator.comparingInt(product::getStock)).orElse(null);

        product highestPrice = products.stream()
                .filter(p -> p.getCurrentPrice() != null)
                .max(Comparator.comparing(p -> p.getCurrentPrice().doubleValue()))
                .orElse(null);

        product lowestPrice = products.stream()
                .filter(p -> p.getCurrentPrice() != null)
                .min(Comparator.comparing(p -> p.getCurrentPrice().doubleValue()))
                .orElse(null);

        double totalValue = 0.0;
        for (product p : products) {
            if (p.getCurrentPrice() != null && p.getStock() > 0) {
                totalValue += (p.getCurrentPrice().doubleValue() * p.getStock());
            }
        }

        StringBuilder sb = new StringBuilder();
        if (highestStock != null) {
            sb.append(String.format("• **Highest Stock Product** : %s (SKU: %s) — **%d units**%n",
                    highestStock.getProductName(), highestStock.getSku(), highestStock.getStock()));
        }
        if (lowestStock != null) {
            sb.append(String.format("• **Lowest Stock Product** : %s (SKU: %s) — **%d units**%n",
                    lowestStock.getProductName(), lowestStock.getSku(), lowestStock.getStock()));
        }
        if (highestPrice != null) {
            sb.append(String.format("• **Highest Price Product** : %s (SKU: %s) — **₹%s**%n",
                    highestPrice.getProductName(), highestPrice.getSku(), highestPrice.getCurrentPrice()));
        }
        if (lowestPrice != null) {
            sb.append(String.format("• **Lowest Price Product** : %s (SKU: %s) — **₹%s**%n",
                    lowestPrice.getProductName(), lowestPrice.getSku(), lowestPrice.getCurrentPrice()));
        }

        sb.append(String.format("%n💰 **Estimated Total Inventory Valuation** : **₹%,.2f**", totalValue));

        return responseBuilder.buildResponse("StockGuard Executive Analytics Report",
                "High-level product catalog performance and valuation breakdown:",
                sb.toString(), null);
    }
}
