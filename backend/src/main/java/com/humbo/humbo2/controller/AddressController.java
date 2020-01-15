package com.humbo.humbo2.controller;

import java.util.Optional;

import javax.validation.Valid;

import com.humbo.humbo2.repository.CustomUserRepository;
import com.humbo.humbo2.domain.CustomUser;
import com.humbo.humbo2.repository.AddressRepository;
import com.humbo.humbo2.domain.Address;

import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;

import java.util.Set;

@RestController
@RequestMapping("/api/address")
public class AddressController {

    private CustomUserRepository customUserRepository;
    private AddressRepository addressRepository;

    public AddressController(CustomUserRepository customUserRepository, AddressRepository addressRepository){
        this.customUserRepository = customUserRepository;
        this.addressRepository = addressRepository;
    }

    @GetMapping("")
    public Set<Address> getAddress(){
        CustomUser user = this.customUserRepository.findByEmail(((UserDetails) SecurityContextHolder.getContext().getAuthentication().getPrincipal()).getUsername()).get();
        return user.getAddress();
    }

    @PostMapping("")
    public ResponseEntity<?> postAddress(@Valid @RequestBody Address address){
        CustomUser user = this.customUserRepository.findByEmail(((UserDetails) SecurityContextHolder.getContext().getAuthentication().getPrincipal()).getUsername()).get();
        address.setUser(user);
        Address response = this.addressRepository.save(address);
        return ResponseEntity.ok().body(null);
    }

    @PutMapping("/{id}")
    public Set<Address> postAddress(@PathVariable Long id, @Valid @RequestBody Address address){
        CustomUser user = this.customUserRepository.findByEmail(((UserDetails) SecurityContextHolder.getContext().getAuthentication().getPrincipal()).getUsername()).get();
        this.addressRepository.save(address);
        return user.getAddress();
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<?> postAddress(@PathVariable Long id){
        this.addressRepository.deleteById(id);
        return ResponseEntity.ok().body(null);
    }

}