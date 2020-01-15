package com.humbo.humbo2.repository;

import org.springframework.data.repository.CrudRepository;

import com.humbo.humbo2.domain.Category;

public interface CategoryRepository extends CrudRepository<Category, Long>{

	Category findByName(String name);
    
}