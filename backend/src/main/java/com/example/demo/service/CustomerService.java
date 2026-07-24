package com.example.demo.service;

import com.example.demo.dto.CustomerDto;
import com.example.demo.exception.ResourceNotFoundException;
import com.example.demo.exception.ServiceOperationException;
import com.example.demo.exception.UserAlreadyExistsException;
import com.example.demo.model.Customer;
import com.example.demo.repository.CustomerRepository;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;

import java.time.Instant;
import java.util.List;

@Service
public class CustomerService {

    private static final Logger logger = LoggerFactory.getLogger(CustomerService.class);
    private static final String CUSTOMER_NOT_FOUND = "Customer not found";

    private final CustomerRepository customerRepo;

    public CustomerService(CustomerRepository customerRepo) {
        this.customerRepo = customerRepo;
    }

    // Get All Customers
    public List<Customer> getAllCustomers() {

        logger.info("Fetching all customers");

        return customerRepo.findAll();
    }

    // Pagination & Sorting
    public Page<Customer> getCustomers(Pageable pageable) {

        logger.info("Fetching customers with pagination");

        return customerRepo.findAll(pageable);
    }

    // Get Customer by Customer ID
    public Customer getCustomer(String customerId) {

        logger.info("Fetching customer with ID: {}", customerId);

        return customerRepo.findByCustomerId(customerId)
                .orElseThrow(() -> {
                    logger.warn("Customer not found. ID: {}", customerId);
                    return new ResourceNotFoundException(CUSTOMER_NOT_FOUND);
                });
    }

    // Create Customer
    public Customer createCustomer(CustomerDto dto) {

        logger.info("Creating customer with ID: {}", dto.getCustomerId());

        if (customerRepo.existsByCustomerId(dto.getCustomerId())) {

            logger.warn("Customer ID already exists: {}", dto.getCustomerId());

            throw new ServiceOperationException("Customer ID already exists.");
        }

        if (customerRepo.existsByEmail(dto.getEmail())) {

            logger.warn("Customer email already exists: {}", dto.getEmail());

            throw new UserAlreadyExistsException("Email already exists.");
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

        Customer savedCustomer = customerRepo.save(customer);

        logger.info("Customer created successfully. ID: {}", savedCustomer.getCustomerId());

        return savedCustomer;
    }

    // Update Customer
    public Customer updateCustomer(String customerId, CustomerDto dto) {

        logger.info("Updating customer with ID: {}", customerId);

        Customer customer = customerRepo.findByCustomerId(customerId)
                .orElseThrow(() -> {
                    logger.warn("Customer not found for update. ID: {}", customerId);
                    return new ResourceNotFoundException(CUSTOMER_NOT_FOUND);
                });

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

        Customer updatedCustomer = customerRepo.save(customer);

        logger.info("Customer updated successfully. ID: {}", updatedCustomer.getCustomerId());

        return updatedCustomer;
    }

    // Delete Customer
    public void deleteCustomer(String customerId) {

        logger.info("Deleting customer with ID: {}", customerId);

        Customer customer = customerRepo.findByCustomerId(customerId)
                .orElseThrow(() -> {
                    logger.warn("Customer not found for deletion. ID: {}", customerId);
                    return new ResourceNotFoundException(CUSTOMER_NOT_FOUND);
                });

        customerRepo.delete(customer);

        logger.info("Customer deleted successfully. ID: {}", customerId);
    }

    // Search Customers by Name
    public List<Customer> searchCustomers(String keyword) {

        logger.info("Searching customers with keyword: {}", keyword);

        return customerRepo.findByCustomerNameContainingIgnoreCase(keyword);
    }

    // Filter by Customer Type
    public List<Customer> getCustomersByType(String customerType) {

        logger.info("Fetching customers by type: {}", customerType);

        return customerRepo.findByCustomerType(customerType);
    }

    // Filter by Active Status
    public List<Customer> getCustomersByActive(Boolean active) {

        logger.info("Fetching customers with active status: {}", active);

        return customerRepo.findByActive(active);
    }

}