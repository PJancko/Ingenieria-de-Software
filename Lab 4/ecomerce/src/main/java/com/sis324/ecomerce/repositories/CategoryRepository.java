package com.sis324.ecomerce.repositories;

import org.springframework.data.jpa.repository.JpaRepository;
import com.sis324.ecomerce.models.Category;

public interface CategoryRepository extends JpaRepository<Category, Long> {
}
