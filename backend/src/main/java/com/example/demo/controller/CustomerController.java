package com.example.demo.controller;

import com.example.demo.dto.CustomerDto;
import com.example.demo.model.Customer;
import com.example.demo.service.CustomerService;
import jakarta.validation.Valid;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/customers")
@CrossOrigin(origins = "*")
public class CustomerController {

    private final CustomerService customerService;

    public CustomerController(CustomerService customerService) {
        this.customerService = customerService;
    }

    // Get All Customers
    @GetMapping
    public ResponseEntity<List<Customer>> getAllCustomers() {
        return ResponseEntity.ok(customerService.getAllCustomers());
    }

    // Pagination
    @GetMapping("/page")
    public ResponseEntity<Page<Customer>> getCustomers(Pageable pageable) {
        return ResponseEntity.ok(customerService.getCustomers(pageable));
    }

    // Get Customer by ID
    @GetMapping("/{customerId}")
    public ResponseEntity<Customer> getCustomer(
            @PathVariable String customerId) {

        return ResponseEntity.ok(
                customerService.getCustomer(customerId));
    }

    // Create Customer
    @PostMapping
    public ResponseEntity<Customer> createCustomer(
            @Valid @RequestBody CustomerDto dto) {

        Customer customer = customerService.createCustomer(dto);

        return new ResponseEntity<>(customer, HttpStatus.CREATED);
    }

    // Update Customer
    @PutMapping("/{customerId}")
    public ResponseEntity<Customer> updateCustomer(
            @PathVariable String customerId,
            @Valid @RequestBody CustomerDto dto) {

        Customer customer =
                customerService.updateCustomer(customerId, dto);

        return ResponseEntity.ok(customer);
    }

    // Delete Customer
    @DeleteMapping("/{customerId}")
    public ResponseEntity<Void> deleteCustomer(
            @PathVariable String customerId) {

        customerService.deleteCustomer(customerId);

        return ResponseEntity.noContent().build();
    }

    // Search Customers
    @GetMapping("/search")
    public ResponseEntity<List<Customer>> searchCustomers(
            @RequestParam String keyword) {

        return ResponseEntity.ok(
                customerService.searchCustomers(keyword));
    }

    // Customers by Type
    @GetMapping("/type/{customerType}")
    public ResponseEntity<List<Customer>> getCustomersByType(
            @PathVariable String customerType) {

        return ResponseEntity.ok(
                customerService.getCustomersByType(customerType));
    }

    // Active / Inactive Customers
    @GetMapping("/active/{active}")
    public ResponseEntity<List<Customer>> getCustomersByActive(
            @PathVariable Boolean active) {

        return ResponseEntity.ok(
                customerService.getCustomersByActive(active));
    }
}