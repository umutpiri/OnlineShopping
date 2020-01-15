package com.humbo.humbo2.repository;

import java.util.Optional;

import com.humbo.humbo2.domain.CustomUser;

import org.springframework.data.repository.CrudRepository;

public interface CustomUserRepository extends CrudRepository<CustomUser, String>{
    Optional<CustomUser> findByEmail(String email);
}