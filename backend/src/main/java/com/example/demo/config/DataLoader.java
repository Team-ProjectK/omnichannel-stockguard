package com.example.demo.config;

import com.example.demo.model.Product;
import com.example.demo.repository.ProductRepository;
import org.springframework.boot.CommandLineRunner;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;

import java.math.BigDecimal;
import java.time.Instant;

@Configuration
public class DataLoader {

    private static final org.slf4j.Logger logger = org.slf4j.LoggerFactory.getLogger(DataLoader.class);

    private static final String STORE_HYD01 = "HYD01";
    private static final String SYSTEM_USER = "SYSTEM";

    @Bean
    CommandLineRunner loadData(
            ProductRepository repository,
            com.example.demo.repository.InventoryRepository inventoryRepo,
            com.example.demo.repository.SupplierRepository supplierRepo
    ) {

        return args -> {

            if (repository.count() == 0) {

                Product p1 = new Product();
                p1.setSku("SKU101");
                p1.setStoreId(STORE_HYD01);
                p1.setProductName("Wireless Mouse");
                p1.setCurrentPrice(new BigDecimal("799"));
                p1.setBasePrice(new BigDecimal("850"));
                p1.setStock(40);
                p1.setReorderThreshold(20);
                p1.setLastPriceUpdate(Instant.now());
                p1.setLastUpdatedBy(SYSTEM_USER);

                Product p2 = new Product();
                p2.setSku("SKU102");
                p2.setStoreId(STORE_HYD01);
                p2.setProductName("Mechanical Keyboard");
                p2.setCurrentPrice(new BigDecimal("2499"));
                p2.setBasePrice(new BigDecimal("2699"));
                p2.setStock(12);
                p2.setReorderThreshold(15);
                p2.setLastPriceUpdate(Instant.now());
                p2.setLastUpdatedBy(SYSTEM_USER);

                Product p3 = new Product();
                p3.setSku("SKU103");
                p3.setStoreId("BLR01");
                p3.setProductName("Gaming Headset");
                p3.setCurrentPrice(new BigDecimal("1899"));
                p3.setBasePrice(new BigDecimal("1999"));
                p3.setStock(65);
                p3.setReorderThreshold(25);
                p3.setLastPriceUpdate(Instant.now());
                p3.setLastUpdatedBy(SYSTEM_USER);

                repository.save(p1);
                repository.save(p2);
                repository.save(p3);

                logger.info("Sample products inserted.");
            }

            if (inventoryRepo.count() == 0) {
                com.example.demo.model.Inventory i1 = new com.example.demo.model.Inventory();
                i1.setSku("SKU101");
                i1.setStoreId(STORE_HYD01);
                i1.setAvailableStock(40);
                i1.setReservedStock(5);
                i1.setDamagedStock(0);
                i1.setLastUpdated(Instant.now());

                com.example.demo.model.Inventory i2 = new com.example.demo.model.Inventory();
                i2.setSku("SKU102");
                i2.setStoreId(STORE_HYD01);
                i2.setAvailableStock(12);
                i2.setReservedStock(2);
                i2.setDamagedStock(0);
                i2.setLastUpdated(Instant.now());

                com.example.demo.model.Inventory i3 = new com.example.demo.model.Inventory();
                i3.setSku("SKU103");
                i3.setStoreId("BLR01");
                i3.setAvailableStock(65);
                i3.setReservedStock(8);
                i3.setDamagedStock(1);
                i3.setLastUpdated(Instant.now());

                inventoryRepo.save(i1);
                inventoryRepo.save(i2);
                inventoryRepo.save(i3);

                logger.info("Sample inventory records inserted.");
            }

            if (supplierRepo.count() == 0) {
                com.example.demo.model.Supplier s1 = new com.example.demo.model.Supplier();
                s1.setSupplierCode("SUPP101");
                s1.setSupplierName("ABC Electronics");
                s1.setContactPerson("Rajesh Kumar");
                s1.setEmail("contact@abcelectronics.com");
                s1.setPhone("9876543210");
                s1.setAddress("Hyderabad, Telangana");
                s1.setStatus("ACTIVE");
                s1.setCreatedAt(Instant.now());

                supplierRepo.save(s1);

                logger.info("Sample suppliers inserted.");
            }
        };
    }
}