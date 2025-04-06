package com.isppG8.infantem.infantem.marketplace;

import com.isppG8.infantem.infantem.InfantemApplication;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.autoconfigure.jdbc.AutoConfigureTestDatabase;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.test.context.ActiveProfiles;
import org.springframework.transaction.annotation.Transactional;

import static org.junit.jupiter.api.Assertions.*;

@SpringBootTest(classes = { InfantemApplication.class, ProductService.class })
@ActiveProfiles("test")
@AutoConfigureTestDatabase(replace = AutoConfigureTestDatabase.Replace.NONE)
@Transactional
public class ProductServiceTest {

    @Autowired
    private ProductService productService;

    @Autowired
    private ProductRepository productRepository;

    private Product product1;
    private Product product2;

    @BeforeEach
    public void setUp() {
        product1 = new Product();
        product1.setTitle("Biberón Anticólicos");
        product1.setDescription("Biberón especial anticólicos para recién nacidos. Capacidad 260ml.");
        product1.setShopUrl("https://ejemplo.com/biberon");
        product1.setImageUrl("https://ejemplo.com/img/biberon.jpg");
        product1 = productRepository.save(product1);

        product2 = new Product();
        product2.setTitle("Trona evolutiva");
        product2.setDescription("Trona que crece con tu bebé. Ajustable en altura y reclinable.");
        product2.setShopUrl("https://ejemplo.com/trona");
        product2.setImageUrl("https://ejemplo.com/img/trona.jpg");
        product2 = productRepository.save(product2);
    }

    @Test
    public void testGetProducts_ReturnsAllPersistedProducts() {
        Page<Product> result = productService.getProducts(PageRequest.of(0, 10));

        assertNotNull(result);
        assertTrue(result.getContent().size() >= 2);
        assertTrue(result.getContent().stream().anyMatch(p -> p.getTitle().equals("Biberón Anticólicos")));
        assertTrue(result.getContent().stream().anyMatch(p -> p.getTitle().equals("Trona evolutiva")));
    }

    @Test
    public void testProductFields_ArePersistedCorrectly() {
        Product saved = productRepository.findById(product1.getId()).orElseThrow();

        assertEquals("Biberón Anticólicos", saved.getTitle());
        assertTrue(saved.getDescription().contains("anticólicos"));
        assertTrue(saved.getShopUrl().startsWith("https://"));
        assertTrue(saved.getImageUrl().contains("biberon.jpg"));
    }
}
