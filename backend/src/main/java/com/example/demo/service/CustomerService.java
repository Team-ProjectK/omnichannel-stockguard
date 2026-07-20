package com.example.demo.service;

import com.example.demo.dto.CustomerDto;
import com.example.demo.exception.ResourceNotFoundException;
import com.example.demo.model.Customer;
import com.example.demo.repository.CustomerRepository;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;

import java.time.Instant;
import java.util.List;

@Service
public class CustomerService {

    private final CustomerRepository customerRepo;

    public CustomerService(CustomerRepository customerRepo) {
        this.customerRepo = customerRepo;
    }

    // Get All Customers
    public List<Customer> getAllCustomers() {
        return customerRepo.findAll();
    }

    // Pagination & Sorting
    public Page<Customer> getCustomers(Pageable pageable) {
        return customerRepo.findAll(pageable);
    }

    // Get Customer by Customer ID
    public Customer getCustomer(String customerId) {

        return customerRepo.findByCustomerId(customerId)
                .orElseThrow(() ->
                        new ResourceNotFoundException("Customer not found"));
    }

    // Create Customer
    public Customer createCustomer(CustomerDto dto) {

        if (customerRepo.existsByCustomerId(dto.getCustomerId())) {
            throw new RuntimeException("Customer ID already exists.");
        }

        if (customerRepo.existsByEmail(dto.getEmail())) {
            throw new RuntimeException("Email already exists.");
        }

        Customer customer = new Customer();

        customer.setCustomerId(dto.getCustomerId());
        customer.setCustomerName(dto.getCustomerName());
        customer.setEmail(dto.getEmail());
        customer.setPhone(dto.getPhone());
        customer.setAddress(dto.getAddress());
        customer.setCity(dto.getCity());
        customer.setState(dto.getState());
        customer.setCountry(dto.getCountry());
        customer.setCustomerType(dto.getCustomerType());
        customer.setActive(dto.getActive());

        customer.setCreatedAt(Instant.now());
        customer.setUpdatedAt(Instant.now());

        return customerRepo.save(customer);
    }

    // Update Customer
    public Customer updateCustomer(String customerId, CustomerDto dto) {

        Customer customer = customerRepo.findByCustomerId(customerId)
                .orElseThrow(() ->
                        new ResourceNotFoundException("Customer not found"));

        customer.setCustomerName(dto.getCustomerName());
        customer.setEmail(dto.getEmail());
        customer.setPhone(dto.getPhone());
        customer.setAddress(dto.getAddress());
        customer.setCity(dto.getCity());
        customer.setState(dto.getState());
        customer.setCountry(dto.getCountry());
        customer.setCustomerType(dto.getCustomerType());
        customer.setActive(dto.getActive());

        customer.setUpdatedAt(Instant.now());

        return customerRepo.save(customer);
    }

    // Delete Customer
    public void deleteCustomer(String customerId) {

        Customer customer = customerRepo.findByCustomerId(customerId)
                .orElseThrow(() ->
                        new ResourceNotFoundException("Customer not found"));

        customerRepo.delete(customer);
    }

    // Search Customers by Name
    public List<Customer> searchCustomers(String keyword) {

        return customerRepo.findByCustomerNameContainingIgnoreCase(keyword);
    }

    // Filter by Customer Type
    public List<Customer> getCustomersByType(String customerType) {

        return customerRepo.findByCustomerType(customerType);
    }

    // Filter by Active Status
    public List<Customer> getCustomersByActive(Boolean active) {

        return customerRepo.findByActive(active);
    }

}