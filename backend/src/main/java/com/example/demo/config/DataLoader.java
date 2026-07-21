package com.example.demo.config;

import com.example.demo.model.product;
import com.example.demo.repository.productRepository;
import org.springframework.boot.CommandLineRunner;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;

import java.math.BigDecimal;
import java.time.Instant;

@Configuration
public class DataLoader {

    @Bean
    CommandLineRunner loadData(productRepository repository) {

        return args -> {

            if (repository.count() == 0) {

                product p1 = new product();
                p1.setSku("SKU101");
                p1.setStoreId("HYD01");
                p1.setProductName("Wireless Mouse");
                p1.setCurrentPrice(new BigDecimal("799"));
                p1.setBasePrice(new BigDecimal("850"));
                p1.setStock(40);
                p1.setReorderThreshold(20);
                p1.setLastPriceUpdate(Instant.now());
                p1.setLastUpdatedBy("SYSTEM");

                product p2 = new product();
                p2.setSku("SKU102");
                p2.setStoreId("HYD01");
                p2.setProductName("Mechanical Keyboard");
                p2.setCurrentPrice(new BigDecimal("2499"));
                p2.setBasePrice(new BigDecimal("2699"));
                p2.setStock(12);
                p2.setReorderThreshold(15);
                p2.setLastPriceUpdate(Instant.now());
                p2.setLastUpdatedBy("SYSTEM");

                product p3 = new product();
                p3.setSku("SKU103");
                p3.setStoreId("BLR01");
                p3.setProductName("Gaming Headset");
                p3.setCurrentPrice(new BigDecimal("1899"));
                p3.setBasePrice(new BigDecimal("1999"));
                p3.setStock(65);
                p3.setReorderThreshold(25);
                p3.setLastPriceUpdate(Instant.now());
                p3.setLastUpdatedBy("SYSTEM");

                repository.save(p1);
                repository.save(p2);
                repository.save(p3);

                org.slf4j.LoggerFactory.getLogger(DataLoader.class).info("Sample products inserted.");
            }
        };
    }
}