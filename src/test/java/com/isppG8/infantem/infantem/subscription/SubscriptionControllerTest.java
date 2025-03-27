package com.isppG8.infantem.infantem.subscription;

import org.junit.jupiter.api.Test;
import org.mockito.Mockito;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.autoconfigure.web.servlet.WebMvcTest;
import org.springframework.boot.test.context.TestConfiguration;
import org.springframework.boot.test.mock.mockito.MockBean;
import org.springframework.context.annotation.Bean;
import org.springframework.http.MediaType;
import org.springframework.security.test.context.support.WithMockUser;
import org.springframework.test.context.ActiveProfiles;
import org.springframework.test.web.servlet.MockMvc;

import com.isppG8.infantem.infantem.config.StripeConfig;
import com.isppG8.infantem.infantem.exceptions.ResourceNotFoundException;
import com.isppG8.infantem.infantem.user.UserRepository;
import com.isppG8.infantem.infantem.user.UserService;

import static org.springframework.security.test.web.servlet.request.SecurityMockMvcRequestPostProcessors.csrf;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.*;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.*;

import java.util.HashMap;
import java.util.List;
import java.util.Map;
import java.util.Optional;

import static org.mockito.ArgumentMatchers.*;
import static org.mockito.Mockito.doNothing;
import static org.mockito.Mockito.times;
import static org.mockito.Mockito.verify;
import static org.mockito.Mockito.when;

@WebMvcTest(SubscriptionInfantemController.class)
@WithMockUser(username = "testUser", roles = { "USER" })
@ActiveProfiles("test")
public class SubscriptionControllerTest {

    @TestConfiguration
    static class TestConfig {
        @Bean
        public SubscriptionInfantemService subscriptionInfantemService() {
            return Mockito.mock(SubscriptionInfantemService.class);
        }

        @Bean
        public StripeConfig stripeConfig() {
            return Mockito.mock(StripeConfig.class);
        }
    }

    @Autowired
    private MockMvc mockMvc;

    @MockBean
    private SubscriptionInfantemService subscriptionService;

    @MockBean
    private UserService userService;

    @MockBean
    private UserRepository userRepository;

    @MockBean
    private StripeConfig stripeConfig;

    @Test
    public void testCreateSubscription() throws Exception {
        SubscriptionInfantem fakeSubscription = new SubscriptionInfantem();
        fakeSubscription.setStripeSubscriptionId("sub_test_123");
        fakeSubscription.setActive(true);

        // Corrección: Usar el mock del servicio correctamente
        when(subscriptionService.createSubscription(anyLong(), anyString(), anyString(), anyString()))
                .thenReturn(fakeSubscription);

        mockMvc.perform(post("/api/v1/subscriptions/create").with(csrf()).param("userId", "1")
                .param("customerId", "cus_test_123").param("priceId", "price_abc").param("paymentMethodId", "pm_xyz")
                .contentType(MediaType.APPLICATION_JSON)).andExpect(status().isOk())
                .andExpect(jsonPath("$.stripeSubscriptionId").value("sub_test_123"));
    }

    @Test
    public void testCreateSubscriptionNew() throws Exception {
        SubscriptionInfantem fakeSubscription = new SubscriptionInfantem();
        fakeSubscription.setStripeSubscriptionId("sub_test_new");
        fakeSubscription.setActive(true);

        when(subscriptionService.createSubscriptionNew(anyLong(), anyString(), anyString()))
                .thenReturn(fakeSubscription);

        mockMvc.perform(
                post("/api/v1/subscriptions/create/new").with(csrf()).param("userId", "1").param("priceId", "price_abc")
                        .param("paymentMethodId", "pm_456").contentType(MediaType.APPLICATION_JSON))
                .andExpect(status().isOk()).andExpect(jsonPath("$.stripeSubscriptionId").value("sub_test_new"));
    }

    @Test
    public void testGetCustomersByEmail() throws Exception {
        Map<String, Object> customer = new HashMap<>();
        customer.put("id", "cus_123");
        customer.put("name", "Test Customer");

        Map<String, Object> paymentMethod = new HashMap<>();
        paymentMethod.put("id", "pm_123");
        paymentMethod.put("last4", "1234");

        Map<String, Object> expectedResponse = new HashMap<>(customer);
        expectedResponse.put("paymentMethod", paymentMethod);

        when(subscriptionService.getCustomersByEmail("test@example.com")).thenReturn(List.of(customer));
        when(subscriptionService.getPaymentMethodsByCustomer("cus_123", 1234)).thenReturn(paymentMethod);

        mockMvc.perform(
                get("/api/v1/subscriptions/customers").param("email", "test@example.com").param("lasts4", "1234"))
                .andExpect(status().isOk()).andExpect(jsonPath("$.id").value("cus_123"))
                .andExpect(jsonPath("$.paymentMethod.last4").value("1234"));
    }

    @Test
    public void testUpdateSubscriptionStatus() throws Exception {
        // Configura el mock
        doNothing().when(subscriptionService).updateSubscriptionStatus(eq("sub_123"), eq(true));

        // Ejecuta y verifica
        mockMvc.perform(post("/api/v1/subscriptions/update-status").with(csrf()).param("subscriptionId", "sub_123") // Asegúrate
                                                                                                                    // que
                                                                                                                    // coincida
                                                                                                                    // con
                                                                                                                    // @RequestParam
                .param("isActive", "true").contentType(MediaType.APPLICATION_JSON)).andExpect(status().isOk())
                .andExpect(content().string("Estado de la suscripción actualizado."));

        // Verifica que el servicio fue llamado correctamente
        verify(subscriptionService, times(1)).updateSubscriptionStatus("sub_123", true);
    }

    @Test
    public void testCancelSubscription() throws Exception {
        // Mock de la suscripción local
        SubscriptionInfantem mockLocalSubscription = new SubscriptionInfantem();
        mockLocalSubscription.setStripeSubscriptionId("sub_test_123");
        mockLocalSubscription.setActive(true);

        // Comportamiento esperado
        when(subscriptionService.cancelSubscription("sub_test_123")).thenAnswer(invocation -> {
            mockLocalSubscription.setActive(false);
            return mockLocalSubscription;
        });

        mockMvc.perform(post("/api/v1/subscriptions/cancel").with(csrf()).param("subscriptionId", "sub_test_123")
                .contentType(MediaType.APPLICATION_JSON)).andExpect(status().isOk())
                .andExpect(jsonPath("$.message").value("Suscripción cancelada exitosamente"))
                .andExpect(jsonPath("$.subscription.active").value(false)); // ← Verificamos active=false
    }

    @Test
    public void testCancelSubscription_NotFound() throws Exception {
        when(subscriptionService.cancelSubscription("sub_invalid"))
                .thenThrow(new ResourceNotFoundException("Suscripción no encontrada"));

        mockMvc.perform(post("/api/v1/subscriptions/cancel").with(csrf()).param("subscriptionId", "sub_invalid")
                .contentType(MediaType.APPLICATION_JSON)).andExpect(status().isBadRequest());
    }

    @Test
    public void testGetSubscription_WhenExists() throws Exception {
        SubscriptionInfantem fakeSubscription = new SubscriptionInfantem();
        fakeSubscription.setId(1L); // Asegúrate de que el ID esté establecido
        fakeSubscription.setStripeSubscriptionId("sub_test_new");
        fakeSubscription.setActive(true);
        when(subscriptionService.getSubscriptionUserById(1L)).thenReturn(Optional.of(fakeSubscription));

        mockMvc.perform(get("/api/v1/subscriptions/user/1")).andExpect(status().isOk())
                .andExpect(jsonPath("$.id").value(1)) // Cambiado para que coincida con la respuesta real
                .andExpect(jsonPath("$.stripeSubscriptionId").value("sub_test_new"))
                .andExpect(jsonPath("$.active").value(true));
    }

    @Test
    public void testGetSubscription_WhenNotExists() throws Exception {
        when(subscriptionService.getSubscriptionUserById(1L)).thenReturn(Optional.empty());

        mockMvc.perform(get("/api/v1/subscriptions/user/1")).andExpect(status().isOk()).andExpect(content().string("")); // O
                                                                                                                         // podrías
                                                                                                                         // esperar
                                                                                                                         // un
                                                                                                                         // objeto
                                                                                                                         // vacío
    }
}
