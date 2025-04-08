package com.isppG8.infantem.infantem.marketplace;

import org.junit.jupiter.api.Test;
import org.mockito.Mockito;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.autoconfigure.web.servlet.WebMvcTest;
import org.springframework.boot.test.context.TestConfiguration;
import org.springframework.context.annotation.Bean;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageImpl;
import org.springframework.data.domain.PageRequest;
import org.springframework.security.test.context.support.WithMockUser;
import org.springframework.test.context.ActiveProfiles;
import org.springframework.test.web.servlet.MockMvc;

import java.util.List;

import static org.hamcrest.Matchers.*;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.get;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.*;

@WebMvcTest(ProductController.class)
@ActiveProfiles("test")
@WithMockUser(username = "testUser", roles = { "USER" })
public class ProductControllerTest {

    @TestConfiguration
    static class TestConfig {
        @Bean
        public ProductService productService() {
            return Mockito.mock(ProductService.class);
        }
    }

    @Autowired
    private MockMvc mockMvc;

    @Autowired
    private ProductService productService;

    @Test
    public void testGetAllProducts_ReturnsOkAndProducts() throws Exception {
        Product product1 = new Product();
        product1.setId(1L);
        product1.setTitle("Producto 1");
        product1.setDescription("Descripción del producto 1");
        product1.setShopUrl("https://tienda.com/producto1");
        product1.setImageUrl("https://tienda.com/img/producto1.jpg");

        Product product2 = new Product();
        product2.setId(2L);
        product2.setTitle("Producto 2");
        product2.setDescription("Descripción del producto 2");
        product2.setShopUrl("https://tienda.com/producto2");
        product2.setImageUrl("https://tienda.com/img/producto2.jpg");

        Page<Product> page = new PageImpl<>(List.of(product1, product2), PageRequest.of(0, 10), 2);
        Mockito.when(productService.getProducts(Mockito.any())).thenReturn(page);

        mockMvc.perform(get("/api/v1/products?page=0&size=10")).andExpect(status().isOk())
                .andExpect(jsonPath("$.content", hasSize(2)))
                .andExpect(jsonPath("$.content[0].title", is("Producto 1")))
                .andExpect(jsonPath("$.content[1].title", is("Producto 2")));
    }

    @Test
    public void testGetAllProducts_InvalidPage_ShouldReturnBadRequest() throws Exception {
        mockMvc.perform(get("/api/v1/products?page=-1&size=10")).andExpect(status().isBadRequest());
    }

    @Test
    public void testGetAllProducts_ZeroSize_ShouldReturnBadRequest() throws Exception {
        mockMvc.perform(get("/api/v1/products?page=0&size=0")).andExpect(status().isBadRequest());
    }
}
