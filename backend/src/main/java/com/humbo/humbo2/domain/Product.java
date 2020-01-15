package com.humbo.humbo2.domain;

import lombok.Data;
import lombok.EqualsAndHashCode;
import lombok.NoArgsConstructor;
import lombok.NonNull;

import javax.persistence.*;

@Data
@NoArgsConstructor
@Entity
@EqualsAndHashCode(exclude = { "category", "seller" })
public class Product {

    @Id
    @GeneratedValue
    private Long id;

    @NonNull
    @ManyToOne(cascade = { CascadeType.DETACH, CascadeType.REFRESH }, fetch = FetchType.EAGER)
    // @JoinColumn(name = "categoryId", referencedColumnName = "id")
    private Category category;

    @ManyToOne(cascade = { CascadeType.DETACH, CascadeType.REFRESH }, fetch = FetchType.EAGER)
    // @JoinColumn(name = "seller", referencedColumnName = "email")
    private Seller seller;

    @NonNull
    private String brand;
    @NonNull
    private String name;
    @NonNull
    private String color;
    @NonNull
    private String description;
    @NonNull
    private Double price;
    @NonNull
    private Integer discount;
    @NonNull
    private Integer stock;

    private String picture;

    private String date;

    public Product(Seller seller, Category category, String brand, String name, String color, String description,
            Double price, Integer discount, Integer stock, String picture) {
        this.seller = seller;
        this.brand = brand;
        this.name = name;
        this.color = color;
        this.description = description;
        this.price = price;
        this.discount = discount;
        this.stock = stock;
        this.category = category;
        this.picture = picture;
    }

    public void setCategory(Category category) {
        this.category = category;
        this.category.getProducts().add(this);
    }

}