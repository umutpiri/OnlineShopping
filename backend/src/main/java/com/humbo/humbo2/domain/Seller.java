package com.humbo.humbo2.domain;

import java.io.Serializable;
import java.util.Set;

import javax.persistence.CascadeType;
import javax.persistence.Entity;
import javax.persistence.FetchType;
import javax.persistence.OneToMany;

import com.fasterxml.jackson.annotation.JsonIgnore;

import lombok.Data;
import lombok.NonNull;
import lombok.ToString;

@Data
@Entity
@ToString(exclude = "products")
public class Seller extends CustomUser implements Serializable{

    private static final long serialVersionUID = 1L;
    
    @NonNull
    private String companyName;
    @NonNull
    private String iban;
    @JsonIgnore
    private Double balance;
    private Double avg_rating;

    @OneToMany(targetEntity = Product.class, cascade = {CascadeType.DETACH, CascadeType.REFRESH, CascadeType.REMOVE}, fetch = FetchType.EAGER, mappedBy = "seller")
    @JsonIgnore
    private Set<Product> products;

    public Seller(){
        super();
    }

    public Seller(String email, String password, String name, String companyName, String iban, String phone, String birthdate, String... roles){
        super(email,password,name,phone,birthdate, roles);
        this.iban = iban;
        this.companyName = companyName;
        this.balance = 0.0;
        this.avg_rating = 0.0;
    }
}