package com.sis324.ecomerce;

import com.sis324.ecomerce.models.Category;
import com.sis324.ecomerce.repositories.CategoryRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.CommandLineRunner;
import org.springframework.stereotype.Component;

@Component // Marca esta clase como un componente de Spring
public class DataInitializer implements CommandLineRunner{
    @Autowired // Inyecta la dependencia del repositorio de categorías
    private CategoryRepository categoryRepository;

    @Override
    public void run(String... args) throws Exception {
        // Elimina todas las categorías existentes para evitar duplicados
        categoryRepository.deleteAll();
        
        // Agrega las categorías necesarias para el eCommerce de libros
        categoryRepository.save(new Category("Ficción"));
        categoryRepository.save(new Category("No Ficción"));
        categoryRepository.save(new Category("Ciencia"));
        categoryRepository.save(new Category("Historia"));
        categoryRepository.save(new Category("Infantil"));
        categoryRepository.save(new Category("Misterio"));
        categoryRepository.save(new Category("Romance"));
        categoryRepository.save(new Category("Fantasía"));
        categoryRepository.save(new Category("Ciencia Ficción"));
        categoryRepository.save(new Category("Biografías"));
    }
}
