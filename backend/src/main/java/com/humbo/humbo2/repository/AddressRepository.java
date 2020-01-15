package com.humbo.humbo2.repository;

import org.springframework.data.repository.CrudRepository;

import com.humbo.humbo2.domain.Address;

public interface AddressRepository extends CrudRepository<Address, Long>{
    
}