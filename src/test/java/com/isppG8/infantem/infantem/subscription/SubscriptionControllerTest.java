package com.isppG8.infantem.infantem.subscription;

import org.junit.jupiter.api.Test;
import org.mockito.MockedStatic;
import org.mockito.Mockito;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.autoconfigure.web.servlet.WebMvcTest;
import org.springframework.boot.test.context.TestConfiguration;
import org.springframework.context.annotation.Bean;
import org.springframework.http.MediaType;
import org.springframework.security.test.context.support.WithMockUser;
import org.springframework.test.context.ActiveProfiles;
import org.springframework.test.context.bean.override.mockito.MockitoBean;
import org.springframework.test.web.servlet.MockMvc;

import com.isppG8.infantem.infantem.config.StripeConfig;
import com.isppG8.infantem.infantem.exceptions.ResourceNotFoundException;
import com.isppG8.infantem.infantem.user.User;
import com.isppG8.infantem.infantem.user.UserRepository;
import com.isppG8.infantem.infantem.user.UserService;
import com.stripe.model.PaymentIntent;
import com.stripe.model.Subscription;
import com.stripe.param.PaymentIntentCreateParams;
import com.stripe.param.SubscriptionCreateParams;

import static org.springframework.security.test.web.servlet.request.SecurityMockMvcRequestPostProcessors.csrf;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.*;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.*;

import java.util.HashMap;
import java.util.List;
import java.util.Map;
import java.util.Optional;

import static org.mockito.ArgumentMatchers.*;
import static org.mockito.Mockito.mock;
import static org.mockito.Mockito.mockStatic;
import static org.mockito.Mockito.never;
import static org.mockito.Mockito.times;
import static org.mockito.Mockito.verify;
import static org.mockito.Mockito.when;
import static org.hamcrest.Matchers.containsString;

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

    @MockitoBean
    private SubscriptionInfantemService subscriptionService;

    @MockitoBean
    private UserService userService;

    @MockitoBean
    private UserRepository userRepository;

    @MockitoBean
    private StripeConfig stripeConfig;

    @MockitoBean
    private SubscriptionInfantemRepository subscriptionInfantemRepository;

    @Test
    public void testCreateSubscriptionNew() throws Exception {
        // Mock del PaymentIntent
        PaymentIntent mockIntent = mock(PaymentIntent.class);
        when(mockIntent.getPaymentMethod()).thenReturn("pm_456");
        when(mockIntent.getCustomer()).thenReturn("cus_123");

        try (MockedStatic<PaymentIntent> mockedStatic = mockStatic(PaymentIntent.class)) {
            mockedStatic.when(() -> PaymentIntent.retrieve("pi_123")).thenReturn(mockIntent);

            SubscriptionInfantem fakeSubscription = new SubscriptionInfantem();
            fakeSubscription.setStripeSubscriptionId("sub_test_new");
            fakeSubscription.setActive(true);

            when(subscriptionService.createSubscriptionNew(1L, "price_abc", "pm_456", "cus_123"))
                    .thenReturn(fakeSubscription);

            mockMvc.perform(post("/api/v1/subscriptions/create-subscription").with(csrf())
                    .param("userId", "1")
                    .param("priceId", "price_abc")
                    .param("paymentIntentId", "pi_123")
                    .contentType(MediaType.APPLICATION_FORM_URLENCODED))
                    .andExpect(status().isOk())
                    .andExpect(jsonPath("$.stripeSubscriptionId").value("sub_test_new"))
                    .andExpect(jsonPath("$.active").value(true));
        }
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
    public void testUpdateSubscriptionStatus_Activate() throws Exception {
        // Configuración de mocks
        User mockUser = new User();
        SubscriptionInfantem mockSubscription = new SubscriptionInfantem();
        mockSubscription.setUser(mockUser);
        mockSubscription.setStripeSubscriptionId("sub_123");

        // Mock del repositorio
        when(subscriptionInfantemRepository.findAll()).thenReturn(List.of(mockSubscription));

        // Mock del servicio (no es necesario mockearlo ya que el controlador llama a activate/desactivate)

        // Ejecuta y verifica
        mockMvc.perform(post("/api/v1/subscriptions/update-status").with(csrf()).param("subscriptionId", "sub_123")
                .param("active", "true").contentType(MediaType.APPLICATION_FORM_URLENCODED)).andExpect(status().isOk())
                .andExpect(content().string("Estado de la suscripción actualizado."));

        // Verifica que se llamó al método correcto del servicio
        verify(subscriptionService, times(1)).activateSubscription(mockUser, "sub_123");
        verify(subscriptionService, never()).desactivateSubscription(any(), any());
    }

    @Test
    public void testUpdateSubscriptionStatus_Deactivate() throws Exception {
        // Configuración de mocks
        User mockUser = new User();
        SubscriptionInfantem mockSubscription = new SubscriptionInfantem();
        mockSubscription.setUser(mockUser);
        mockSubscription.setStripeSubscriptionId("sub_123");

        // Mock del repositorio
        when(subscriptionInfantemRepository.findAll()).thenReturn(List.of(mockSubscription));

        // Ejecuta y verifica
        mockMvc.perform(post("/api/v1/subscriptions/update-status").with(csrf()).param("subscriptionId", "sub_123")
                .param("active", "false").contentType(MediaType.APPLICATION_FORM_URLENCODED)).andExpect(status().isOk())
                .andExpect(content().string("Estado de la suscripción actualizado."));

        // Verifica que se llamó al método correcto del servicio
        verify(subscriptionService, times(1)).desactivateSubscription(mockUser, "sub_123");
        verify(subscriptionService, never()).activateSubscription(any(), any());
    }

    @Test
    public void testUpdateSubscriptionStatus_NotFound() throws Exception {
        // Mock del repositorio (sin suscripciones)
        when(subscriptionInfantemRepository.findAll()).thenReturn(List.of());

        // Ejecuta y verifica
        mockMvc.perform(post("/api/v1/subscriptions/update-status").with(csrf()).param("subscriptionId", "sub_123")
                .param("active", "true").contentType(MediaType.APPLICATION_FORM_URLENCODED))
                .andExpect(status().isBadRequest())
                .andExpect(content().string(containsString("No se encontró ninguna suscripción con ID")));

        // Verifica que no se llamó a ningún método del servicio
        verify(subscriptionService, never()).activateSubscription(any(), any());
        verify(subscriptionService, never()).desactivateSubscription(any(), any());
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

    @Test
    public void testCreateStripeCustomer_Success() throws Exception {
        User mockUser = new User();
        mockUser.setId(1);
        mockUser.setEmail("test@example.com");
        mockUser.setName("Test User");

        when(userRepository.findById(1L)).thenReturn(Optional.of(mockUser));
        when(subscriptionService.createCustomer(eq("test@example.com"), eq("Test User"), anyString()))
                .thenReturn("cus_123");

        mockMvc.perform(get("/api/v1/subscriptions/customer-id")
                .param("userId", "1"))
                .andExpect(status().isOk())
                .andExpect(content().string("cus_123"));
    }

    @Test
    public void testCreateStripeCustomer_UserNotFound() throws Exception {
        when(userRepository.findById(99L)).thenReturn(Optional.empty());

        mockMvc.perform(get("/api/v1/subscriptions/customer-id")
                .param("userId", "99"))
                .andExpect(status().isNotFound())
                .andExpect(content().string("Usuario no encontrado"));
    }

    @Test
    public void testCreatePaymentIntent_Success() throws Exception {
        // Mock del PaymentIntent
        PaymentIntent mockPaymentIntent = mock(PaymentIntent.class);
        when(mockPaymentIntent.getClientSecret()).thenReturn("secret_test_123");

        try (MockedStatic<PaymentIntent> mockedStatic = mockStatic(PaymentIntent.class)) {
            mockedStatic.when(() -> PaymentIntent.create(any(PaymentIntentCreateParams.class)))
                    .thenReturn(mockPaymentIntent);

            mockMvc.perform(post("/api/v1/subscriptions/create-payment-intent").with(csrf())
                    .contentType(MediaType.APPLICATION_JSON)
                    .content("""
                        {
                            "amount": 1000,
                            "currency": "eur",
                            "customerId": "cus_123"
                        }
                    """))
                    .andExpect(status().isOk())
                    .andExpect(jsonPath("$.clientSecret").value("secret_test_123"));
        }
    }

    @Test
    public void testCreateSubscriptionAfterPaymentIntent_Success() throws Exception {
        PaymentIntent mockIntent = mock(PaymentIntent.class);
        when(mockIntent.getPaymentMethod()).thenReturn("pm_123");
        when(mockIntent.getCustomer()).thenReturn("cus_123");

        try (
            MockedStatic<PaymentIntent> mockedIntent = mockStatic(PaymentIntent.class);
            MockedStatic<Subscription> mockedSubscription = mockStatic(Subscription.class)
        ) {
            mockedIntent.when(() -> PaymentIntent.retrieve("pi_abc")).thenReturn(mockIntent);

            Subscription mockStripeSubscription = new Subscription();
            mockStripeSubscription.setId("sub_test_created");
            mockedSubscription.when(() -> Subscription.create(any(SubscriptionCreateParams.class)))
                .thenReturn(mockStripeSubscription);

            User mockUser = new User();
            mockUser.setId(1);
            when(userRepository.findById(1L)).thenReturn(Optional.of(mockUser));

            SubscriptionInfantem newSubscription = new SubscriptionInfantem();
            newSubscription.setStripeSubscriptionId("sub_test_created");
            newSubscription.setActive(true);

            when(subscriptionInfantemRepository.save(any())).thenReturn(newSubscription);

            mockMvc.perform(post("/api/v1/subscriptions/create-subscription-from-payment-intent").with(csrf())
                    .param("userId", "1")
                    .param("priceId", "price_test")
                    .param("paymentIntentId", "pi_abc"))
                    .andExpect(status().isOk())
                    .andExpect(jsonPath("$.stripeSubscriptionId").value("sub_test_created"))
                    .andExpect(jsonPath("$.active").value(true));
        }
    }

}
