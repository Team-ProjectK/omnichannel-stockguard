package com.example.demo.ai.prompt;

import com.example.demo.model.*;
import com.example.demo.repository.*;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.stereotype.Component;

import java.util.List;

@Component
public class PromptBuilder {

    private static final Logger log = LoggerFactory.getLogger(PromptBuilder.class);

    private final productRepository productRepo;
    private final InventoryRepository inventoryRepo;
    private final SupplierRepository supplierRepo;
    private final PurchaseOrderRepository purchaseOrderRepo;
    private final SalesOrderRepository salesOrderRepo;

    public PromptBuilder(productRepository productRepo,
                         InventoryRepository inventoryRepo,
                         SupplierRepository supplierRepo,
                         PurchaseOrderRepository purchaseOrderRepo,
                         SalesOrderRepository salesOrderRepo) {
        this.productRepo = productRepo;
        this.inventoryRepo = inventoryRepo;
        this.supplierRepo = supplierRepo;
        this.purchaseOrderRepo = purchaseOrderRepo;
        this.salesOrderRepo = salesOrderRepo;
    }

    public String buildSystemContext(String basePrompt) {
        StringBuilder sb = new StringBuilder();
        if (basePrompt != null) {
            sb.append(basePrompt).append("\n\n");
        }

        sb.append("=== LIVE DATABASE CONTEXT FROM MYSQL ===\n");

        // 1. Products Context
        try {
            List<product> products = productRepo.findAll();
            sb.append("\n[PRODUCTS CATALOG (Total: ").append(products.size()).append(")]\n");
            if (products.isEmpty()) {
                sb.append("No products currently registered in database.\n");
            } else {
                for (product p : products) {
                    sb.append(String.format("- SKU: %s | Name: %s | Stock: %d | ReorderThreshold: %d | Price: %s | BasePrice: %s%n",
                            p.getSku(),
                            p.getProductName(),
                            p.getStock(),
                            p.getReorderThreshold(),
                            p.getCurrentPrice() != null ? p.getCurrentPrice().toString() : "N/A",
                            p.getBasePrice() != null ? p.getBasePrice().toString() : "N/A"));
                }
            }
        } catch (Exception e) {
            log.warn("Failed fetching products for prompt context: {}", e.getMessage());
        }

        // 2. Inventory Items Context
        try {
            List<Inventory> items = inventoryRepo.findAll();
            sb.append("\n[INVENTORY WAREHOUSE ITEMS (Total: ").append(items.size()).append(")]\n");
            if (!items.isEmpty()) {
                for (Inventory inv : items) {
                    sb.append(String.format("- SKU: %s | StoreId: %s | AvailableStock: %d | ReservedStock: %d%n",
                            inv.getSku(),
                            inv.getStoreId() != null ? inv.getStoreId() : "Default",
                            inv.getAvailableStock() != null ? inv.getAvailableStock() : 0,
                            inv.getReservedStock() != null ? inv.getReservedStock() : 0));
                }
            }
        } catch (Exception e) {
            log.warn("Failed fetching inventory for prompt context: {}", e.getMessage());
        }

        // 3. Suppliers Context
        try {
            List<Supplier> suppliers = supplierRepo.findAll();
            sb.append("\n[SUPPLIERS (Total: ").append(suppliers.size()).append(")]\n");
            if (!suppliers.isEmpty()) {
                for (Supplier s : suppliers) {
                    sb.append(String.format("- Code: %s | Name: %s | Email: %s | Status: %s%n",
                            s.getSupplierCode(),
                            s.getSupplierName(),
                            s.getEmail() != null ? s.getEmail() : "N/A",
                            s.getStatus() != null ? s.getStatus() : "ACTIVE"));
                }
            }
        } catch (Exception e) {
            log.warn("Failed fetching suppliers for prompt context: {}", e.getMessage());
        }

        // 4. Purchase Orders Context
        try {
            List<PurchaseOrder> pos = purchaseOrderRepo.findAll();
            sb.append("\n[PURCHASE ORDERS (Total: ").append(pos.size()).append(")]\n");
            if (!pos.isEmpty()) {
                for (PurchaseOrder po : pos) {
                    sb.append(String.format("- PO#: %s | SupplierCode: %s | Total: %s | Status: %s%n",
                            po.getPurchaseOrderNo(),
                            po.getSupplierCode() != null ? po.getSupplierCode() : "N/A",
                            po.getTotalAmount() != null ? po.getTotalAmount().toString() : "0.00",
                            po.getStatus() != null ? po.getStatus() : "PENDING"));
                }
            }
        } catch (Exception e) {
            log.warn("Failed fetching purchase orders for prompt context: {}", e.getMessage());
        }

        // 5. Sales Orders Context
        try {
            List<SalesOrder> sos = salesOrderRepo.findAll();
            sb.append("\n[SALES ORDERS (Total: ").append(sos.size()).append(")]\n");
            if (!sos.isEmpty()) {
                for (SalesOrder so : sos) {
                    sb.append(String.format("- SO#: %s | CustomerId: %s | Total: %s | Status: %s%n",
                            so.getSalesOrderNo(),
                            so.getCustomerId() != null ? so.getCustomerId() : "N/A",
                            so.getTotalAmount() != null ? so.getTotalAmount().toString() : "0.00",
                            so.getOrderStatus() != null ? so.getOrderStatus() : "COMPLETED"));
                }
            }
        } catch (Exception e) {
            log.warn("Failed fetching sales orders for prompt context: {}", e.getMessage());
        }

        sb.append("=========================================\n");
        return sb.toString();
    }
}
