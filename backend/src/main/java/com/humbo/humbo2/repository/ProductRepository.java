package com.humbo.humbo2.repository;

import org.springframework.data.repository.CrudRepository;
import org.springframework.data.repository.query.Param;
import org.springframework.security.access.prepost.PreAuthorize;

import com.humbo.humbo2.domain.Product;
import com.humbo.humbo2.domain.Category;

// @PreAuthorize("hasRole('SELLER')")
public interface ProductRepository extends CrudRepository<Product, Long>{
	@Override
	@PreAuthorize("#product?.seller == null or #product?.seller?.email == authentication?.name")
	Product save(@Param("product") Product product);

	@Override
	@PreAuthorize("@productRepository.findById(#id)?.seller?.email == authentication?.name")
	void deleteById(@Param("id") Long id);

	@Override
	@PreAuthorize("#product?.seller?.email == authentication?.name")
	void delete(@Param("product") Product product);

	Iterable<Product> findByCategory(Category category);

}