package com.humbo.humbo2.domain;

import java.io.Serializable;

import javax.persistence.Entity;

import lombok.Data;

@Data
@Entity
public class Customer extends CustomUser implements Serializable{

    private static final long serialVersionUID = 1L;

    public Customer(){
        super();
    }

    public Customer(String email, String password, String name, String phone, String birthdate, String... roles){
        super(email, password, name, phone, birthdate, roles);
    }
}