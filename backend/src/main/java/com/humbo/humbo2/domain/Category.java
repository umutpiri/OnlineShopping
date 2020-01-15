package com.humbo.humbo2.domain;

import lombok.Data;
import lombok.EqualsAndHashCode;
import lombok.NoArgsConstructor;
import lombok.NonNull;
import lombok.ToString;

import javax.persistence.*;

import com.fasterxml.jackson.annotation.JsonIgnore;

import java.util.HashSet;
import java.util.Set;

@Data
@Entity
@NoArgsConstructor
@EqualsAndHashCode(exclude = "children")
@ToString(exclude = {"products", "children", "parent"})
public class Category{
    @Id
    @GeneratedValue
    private Long id;
    
    @NonNull @Column(unique = true)
    private String name;
    @ManyToOne(cascade = {CascadeType.DETACH,CascadeType.REFRESH,CascadeType.REMOVE}, fetch = FetchType.EAGER)
    private Category parent;
    @OneToMany(mappedBy = "parent", cascade = {CascadeType.DETACH,CascadeType.REFRESH,CascadeType.REMOVE}, fetch = FetchType.EAGER) @JsonIgnore
    private Set<Category> children;

    @JsonIgnore
    @OneToMany(targetEntity = Product.class, cascade = {CascadeType.DETACH, CascadeType.REFRESH, CascadeType.REMOVE}, fetch = FetchType.EAGER, mappedBy = "category")
    private Set<Product> products;

    public Category(String name){
        this.name=name;
        this.products = new HashSet<>();
        this.children = new HashSet<>();
    }
    public Category(String name, Category parent){
        this.name = name;
        this.parent = parent;
        this.products = new HashSet<>();
        this.children = new HashSet<>();
    }

}