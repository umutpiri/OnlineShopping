package com.humbo.humbo2.controller;

import com.humbo.humbo2.domain.Category;
import com.humbo.humbo2.repository.CategoryRepository;
import com.humbo.humbo2.domain.Product;
import com.humbo.humbo2.repository.ProductRepository;

import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.HashSet;
import java.util.Optional;

@RestController
@RequestMapping("/api")
class ProductController {

    private ProductRepository productRepository;
    private CategoryRepository categoryRepository;

    public ProductController(ProductRepository productRepository, CategoryRepository categoryRepository) {
        this.productRepository = productRepository;
        this.categoryRepository = categoryRepository;
    }

    @GetMapping("/products")
    Iterable<Product> products() {
        return productRepository.findAll();
    }

    @GetMapping("/products/{categoryName}")
    Iterable<Product> productsOfCategory(@PathVariable String categoryName) {
        Category category = this.categoryRepository.findByName(categoryName);
        if (category.getChildren().size() != 0) {
            HashSet<Product> products = new HashSet<>(category.getProducts());
            return getProducts(products, category);
        }
        return category.getProducts();
    }

    private HashSet<Product> getProducts(HashSet<Product> products, Category category) {
        if (category.getChildren().size() == 0) {
            return products;
        }
        for (Category child : category.getChildren()) {
            products.addAll(child.getProducts());
            products = getProducts(products, child);
        }
        return products;
    }

    @GetMapping("/product/{id}")
    ResponseEntity<?> getProduct(@PathVariable Long id) {
        Optional<Product> product = productRepository.findById(id);
        return product.map(response -> ResponseEntity.ok().body(response))
                .orElse(new ResponseEntity<>(HttpStatus.NOT_FOUND));
    }
}