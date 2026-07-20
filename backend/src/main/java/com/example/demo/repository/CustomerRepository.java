package com.example.demo.repository;

import com.example.demo.model.Customer;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;
import java.util.Optional;

public interface CustomerRepository extends JpaRepository<Customer, Long> {

    // Find Customer by Customer ID
    Optional<Customer> findByCustomerId(String customerId);

    // Check Duplicate Customer ID
    boolean existsByCustomerId(String customerId);

    // Check Duplicate Email
    boolean existsByEmail(String email);

    // Search by Customer Name
    List<Customer> findByCustomerNameContainingIgnoreCase(String customerName);

    // Filter by Customer Type
    List<Customer> findByCustomerType(String customerType);

    // Filter Active Customers
    List<Customer> findByActive(Boolean active);

}