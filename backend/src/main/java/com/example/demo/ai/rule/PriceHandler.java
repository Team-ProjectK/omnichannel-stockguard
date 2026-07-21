package com.example.demo.ai.rule;

import com.example.demo.model.product;
import org.springframework.stereotype.Component;

import java.util.List;

@Component
public class PriceHandler implements IntentHandler {

    private final EnterpriseResponseBuilder responseBuilder;

    public PriceHandler(EnterpriseResponseBuilder responseBuilder) {
        this.responseBuilder = responseBuilder;
    }

    @Override
    public IntentType getIntentType() {
        return IntentType.PRICING;
    }

    @Override
    public String handle(String userMessage, List<product> products) {
        if (products == null || products.isEmpty()) {
            return responseBuilder.buildEmptyCatalogResponse();
        }

        StringBuilder sb = new StringBuilder();
        sb.append("| Product Name | SKU | Current Price | Base Price |\n");
        sb.append("|---|---|---|---|\n");

        for (product p : products) {
            String currentStr = p.getCurrentPrice() != null ? "₹" + p.getCurrentPrice() : "N/A";
            String baseStr = p.getBasePrice() != null ? "₹" + p.getBasePrice() : "N/A";

            sb.append(String.format("| %s | %s | %s | %s |\n",
                    p.getProductName(), p.getSku(), currentStr, baseStr));
        }

        return responseBuilder.buildResponse("Catalog Pricing Summary",
                "Current selling and base pricing metrics across catalog SKUs:",
                sb.toString(), null);
    }
}
