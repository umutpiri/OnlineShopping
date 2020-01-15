package com.humbo.humbo2.controller;

import java.util.Optional;

import javax.validation.Valid;

import com.humbo.humbo2.repository.SellerRepository;
import com.humbo.humbo2.domain.Seller;
import com.humbo.humbo2.repository.CustomerRepository;
import com.humbo.humbo2.domain.Customer;

import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;

import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;

@RestController
@RequestMapping("/api/registration")
public class RegistrationController {

    private final Logger log = LoggerFactory.getLogger(RegistrationController.class);

    private SellerRepository sellerRepository;
    private CustomerRepository customerRepository;

    public RegistrationController(SellerRepository sellerRepository, CustomerRepository customerRepository) {
        this.sellerRepository = sellerRepository;
        this.customerRepository = customerRepository;
    }

    @PostMapping("/seller")
    public ResponseEntity<Seller> createSeller(@Valid @RequestBody Seller seller){
        seller.setRoles(new String[]{"SELLER"});
        seller.setAvg_rating(0.0);
        seller.setBalance(0.0);
        Optional<Seller> s = Optional.of(this.sellerRepository.save(seller));
        return s.map(response -> ResponseEntity.ok().body(response)).orElse(new ResponseEntity<>(HttpStatus.BAD_REQUEST));
    }

    @PostMapping("/customer")
    public ResponseEntity<Customer> createSeller(@Valid @RequestBody Customer customer){
        customer.setRoles(new String[]{"CUSTOMER"});
        Optional<Customer> s = Optional.of(this.customerRepository.save(customer));
        return s.map(response -> ResponseEntity.ok().body(response)).orElse(new ResponseEntity<>(HttpStatus.BAD_REQUEST));
    }
}