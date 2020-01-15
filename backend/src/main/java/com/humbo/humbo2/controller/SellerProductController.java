package com.humbo.humbo2.controller;

import com.humbo.humbo2.domain.Category;
import com.humbo.humbo2.repository.CategoryRepository;
import com.humbo.humbo2.domain.Product;
import com.humbo.humbo2.repository.ProductRepository;
import com.humbo.humbo2.domain.Seller;
import com.humbo.humbo2.repository.SellerRepository;
import com.humbo.humbo2.storage.StorageService;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

import javax.validation.Valid;
import java.net.URI;
import java.net.URISyntaxException;
import java.util.HashMap;
import java.util.Optional;

@RestController
@RequestMapping("/api/s")
class SellerProductController {

    private final Logger log = LoggerFactory.getLogger(SellerProductController.class);
    private final ProductRepository productRepository;
    private final CategoryRepository categoryRepository;
    private final SellerRepository sellerRepository;

    private final StorageService storageService;

    @Autowired
    public SellerProductController(ProductRepository productRepository, CategoryRepository categoryRepository,
            SellerRepository sellerRepository, StorageService storageService) {
        this.productRepository = productRepository;
        this.categoryRepository = categoryRepository;
        this.sellerRepository = sellerRepository;
        this.storageService = storageService;
    }

    @GetMapping("/products")
    Iterable<Product> getProductsOfSeller() {
        Optional<Seller> seller = this.sellerRepository.findByEmail(
                ((UserDetails) SecurityContextHolder.getContext().getAuthentication().getPrincipal()).getUsername());
        return seller.get().getProducts();
    }

    @PostMapping("/product")
    ResponseEntity<Product> createProduct(@RequestParam(value="file", required=false) MultipartFile file, @RequestParam String brand, @RequestParam String name, @RequestParam String description, @RequestParam String category, @RequestParam String color, @RequestParam Integer stock, @RequestParam Double price, @RequestParam Integer discount) throws URISyntaxException {
        Category category_obj = this.categoryRepository.findByName(category);
        Optional<Seller> seller = this.sellerRepository.findByEmail(
                ((UserDetails) SecurityContextHolder.getContext().getAuthentication().getPrincipal()).getUsername());
              
        Product product;
        if(file != null && !file.isEmpty()){
            product = new Product(seller.get(),category_obj, brand, name, color, description, price, discount, stock, file.getOriginalFilename());
            this.storageService.store(file);
        }else{
            product = new Product(seller.get(),category_obj, brand, name, color, description, price, discount, stock, null);
        }
        product.setDate(String.valueOf(System.currentTimeMillis()/100));
        log.info("Request to create product: {}", product);
        Product result = productRepository.save(product);
        return ResponseEntity.created(new URI("/api/product/" + result.getId())).body(result);
    }

    @PutMapping("/product/{id}")
    ResponseEntity<HashMap<String, String>> updateProduct(@PathVariable Long id, @RequestParam(value="file", required=false) MultipartFile file, @RequestParam String brand, @RequestParam String name, @RequestParam String description, @RequestParam String category, @RequestParam String color, @RequestParam Integer stock, @RequestParam Double price, @RequestParam Integer discount) {
        HashMap<String, String> response = new HashMap<>();
        Category category_obj = this.categoryRepository.findByName(category);
        Product product = this.productRepository.findById(id).get();
        product.setCategory(category_obj);
        product.setBrand(brand);
        product.setName(name);
        product.setColor(color);
        product.setDescription(description);
        product.setStock(stock);
        product.setPrice(price);
        product.setDiscount(discount);
        if(file != null && !file.isEmpty()){
            product.setPicture(file.getOriginalFilename());
            this.storageService.store(file);
        }
        log.info("Request to update product: {}", product);
        productRepository.save(product);
        return ResponseEntity.ok().body(response);
    }

    @DeleteMapping("/product/{id}")
    public ResponseEntity<?> deleteProduct(@PathVariable Long id) {
        log.info("Request to delete product: {}", id);
        Product product = this.productRepository.findById(id).get();
        this.productRepository.delete(product);
        // productRepository.deleteById(id);
        return ResponseEntity.ok().build();
    }

    @DeleteMapping("/products")
    public ResponseEntity<?> deleteProducts(@RequestParam(value="id") String[] ids){
        for(String id:ids){
            this.productRepository.delete(this.productRepository.findById(Long.parseLong(id)).get());
        }
        return ResponseEntity.ok().build();
    }
}