package com.humbo.humbo2.repository;

import java.util.Optional;

import com.humbo.humbo2.domain.Customer;

import org.springframework.data.repository.CrudRepository;

public interface CustomerRepository extends CrudRepository<Customer, String>{
    Optional<Customer> findByEmail(String email);
}