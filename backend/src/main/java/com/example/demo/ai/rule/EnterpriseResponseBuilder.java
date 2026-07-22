package com.example.demo.ai.rule;

import com.example.demo.model.product;
import org.springframework.stereotype.Component;

import java.time.LocalDateTime;
import java.time.format.DateTimeFormatter;
import java.util.List;

@Component
public class EnterpriseResponseBuilder {

    private static final DateTimeFormatter TIMESTAMP_FORMATTER = DateTimeFormatter.ofPattern("dd MMM yyyy • h:mm a");

    public String buildHeader(String title) {
        String timestampStr = LocalDateTime.now().format(TIMESTAMP_FORMATTER);
        return String.format("### %s%n*Generated: %s*%n%n", title, timestampStr);
    }

    public String buildEmptyCatalogResponse() {
        return "### StockGuard Catalog Notice\n" +
                "*Generated: " + LocalDateTime.now().format(TIMESTAMP_FORMATTER) + "*\n\n" +
                "Inventory is currently empty.\n\n" +
                "Please add products before requesting inventory analytics or reports.";
    }

    public String buildResponse(String title, String summary, String bodyTable, List<String> recommendations) {
        StringBuilder sb = new StringBuilder();
        sb.append(buildHeader(title));

        if (summary != null && !summary.isEmpty()) {
            sb.append(summary).append("\n\n");
        }

        if (bodyTable != null && !bodyTable.isEmpty()) {
            sb.append(bodyTable).append("\n\n");
        }

        if (recommendations != null && !recommendations.isEmpty()) {
            sb.append("#### Recommendations:\n");
            for (int i = 0; i < recommendations.size(); i++) {
                sb.append(String.format("%d. %s%n", i + 1, recommendations.get(i)));
            }
        }

        return sb.toString().trim();
    }
}
