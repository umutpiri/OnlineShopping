package com.humbo.humbo2.repository;

import com.humbo.humbo2.domain.Seller;

import java.util.Optional;

import org.springframework.data.repository.CrudRepository;

public interface SellerRepository extends CrudRepository<Seller, String>{
    Optional<Seller> findByEmail(String email);
    Optional<Seller> findByIban(String iban);
}