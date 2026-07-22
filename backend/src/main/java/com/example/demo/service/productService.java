package com.example.demo.service;

import com.example.demo.dto.ProductDto;
import com.example.demo.exception.ResourceNotFoundException;
import com.example.demo.model.PriceDecision;
import com.example.demo.model.ReorderRequest;
import com.example.demo.model.product;
import com.example.demo.repository.PriceDecisionRepository;
import com.example.demo.repository.ReorderRequestRepository;
import com.example.demo.repository.productRepository;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;

import java.math.BigDecimal;
import java.time.Instant;
import java.util.List;

@Service
public class productService {

    private static final String PRODUCT_NOT_FOUND = "Product not found";

    private final productRepository productRepo;
    private final PriceDecisionRepository priceDecisionRepo;
    private final ReorderRequestRepository reorderRepo;
    private final com.example.demo.repository.InventoryRepository inventoryRepo;

    public productService(productRepository productRepo,
                          PriceDecisionRepository priceDecisionRepo,
                          ReorderRequestRepository reorderRepo,
                          com.example.demo.repository.InventoryRepository inventoryRepo) {
        this.productRepo = productRepo;
        this.priceDecisionRepo = priceDecisionRepo;
        this.reorderRepo = reorderRepo;
        this.inventoryRepo = inventoryRepo;
    }

    // Get all products
    public List<product> getAllProducts() {
        return productRepo.findAll();
    }

    // Get Products with Pagination
    public Page<product> getProducts(Pageable pageable) {
        return productRepo.findAll(pageable);
    }

    // Get product by SKU and Store
    public product getProduct(String sku, String storeId) {

        return productRepo.findBySkuAndStoreId(sku, storeId)
                .orElseThrow(() ->
                        new ResourceNotFoundException(PRODUCT_NOT_FOUND));
    }

    // Create Product
    public product createProduct(ProductDto dto) {

        if (productRepo.existsBySkuAndStoreId(dto.getSku(), dto.getStoreId())) {
            throw new RuntimeException("Product already exists.");
        }

        product newProduct = new product();

        newProduct.setSku(dto.getSku());
        newProduct.setStoreId(dto.getStoreId());
        newProduct.setProductName(dto.getProductName());
        newProduct.setCurrentPrice(dto.getCurrentPrice());
        newProduct.setBasePrice(dto.getBasePrice());
        newProduct.setStock(dto.getStock());
        newProduct.setReorderThreshold(dto.getReorderThreshold());
        newProduct.setLastPriceUpdate(Instant.now());
        newProduct.setLastUpdatedBy(dto.getLastUpdatedBy());

        product savedProduct = productRepo.save(newProduct);

        if (!inventoryRepo.existsBySkuAndStoreId(savedProduct.getSku(), savedProduct.getStoreId())) {
            com.example.demo.model.Inventory inv = new com.example.demo.model.Inventory();
            inv.setSku(savedProduct.getSku());
            inv.setStoreId(savedProduct.getStoreId());
            inv.setAvailableStock(savedProduct.getStock());
            inv.setReservedStock(0);
            inv.setDamagedStock(0);
            inv.setLastUpdated(Instant.now());
            inventoryRepo.save(inv);
        }

        return savedProduct;
    }

    // Update Product
    public product updateProduct(String sku,
                                 String storeId,
                                 ProductDto dto) {

        product existing = productRepo.findBySkuAndStoreId(sku, storeId)
                .orElseThrow(() ->
                        new ResourceNotFoundException(PRODUCT_NOT_FOUND));

        existing.setProductName(dto.getProductName());
        existing.setCurrentPrice(dto.getCurrentPrice());
        existing.setBasePrice(dto.getBasePrice());
        existing.setStock(dto.getStock());
        existing.setReorderThreshold(dto.getReorderThreshold());
        existing.setLastPriceUpdate(Instant.now());
        existing.setLastUpdatedBy(dto.getLastUpdatedBy());

        return productRepo.save(existing);
    }

    // Delete Product
    public void deleteProduct(String sku,
                              String storeId) {

        product existing = productRepo.findBySkuAndStoreId(sku, storeId)
                .orElseThrow(() ->
                        new ResourceNotFoundException(PRODUCT_NOT_FOUND));

        productRepo.delete(existing);
    }

    // Search by Product Name
    public List<product> searchProducts(String keyword) {
        return productRepo.findByProductNameContainingIgnoreCase(keyword);
    }

    // Get Price History
    public List<PriceDecision> getPriceHistory(String sku, String storeId) {

        return priceDecisionRepo.findBySkuAndStoreIdOrderByTimestampAsc(sku, storeId);
    }

    // Apply AI Price Decision
    public PriceDecision applyPriceDecision(
            String sku,
            String storeId,
            BigDecimal newPrice,
            String justification,
            String competitorRef,
            String demandSignal) {

        product targetProduct = productRepo.findBySkuAndStoreId(sku, storeId)
                .orElseThrow(() ->
                        new ResourceNotFoundException(PRODUCT_NOT_FOUND));

        BigDecimal oldPrice = targetProduct.getCurrentPrice();

        targetProduct.setCurrentPrice(newPrice);
        targetProduct.setLastPriceUpdate(Instant.now());
        targetProduct.setLastUpdatedBy("AI");

        productRepo.save(targetProduct);

        PriceDecision decision = new PriceDecision();

        decision.setSku(sku);
        decision.setStoreId(storeId);
        decision.setTimestamp(Instant.now());
        decision.setOldPrice(oldPrice);
        decision.setNewPrice(newPrice);
        decision.setDemandSignal(demandSignal);
        decision.setCompetitorPriceRef(competitorRef);
        decision.setJustification(justification);

        return priceDecisionRepo.save(decision);
    }

    // Create Reorder Request
    public ReorderRequest createReorderRequest(
            String sku,
            String storeId,
            int quantity,
            String supplier,
            String draftDocText) {

        ReorderRequest request = new ReorderRequest();

        request.setSku(sku);
        request.setStoreId(storeId);
        request.setTimestamp(Instant.now());
        request.setQuantity(quantity);
        request.setSupplier(supplier);
        request.setStatus("DRAFTED");
        request.setDraftDocText(draftDocText);

        return reorderRepo.save(request);
    }

    // Get all reorder requests
    public List<ReorderRequest> getReorderRequests() {
        return reorderRepo.findAll();
    }

    // Check Low Stock
    public boolean isLowStock(product p) {
        return p.getStock() <= p.getReorderThreshold();
    }
}