package com.isppG8.infantem.infantem.subscription;

import static org.junit.jupiter.api.Assertions.*;
import static org.mockito.ArgumentMatchers.*;
import static org.mockito.Mockito.*;

import com.isppG8.infantem.infantem.config.StripeConfig;
import com.isppG8.infantem.infantem.exceptions.ResourceNotFoundException;
import com.isppG8.infantem.infantem.user.User;
import com.isppG8.infantem.infantem.user.UserService;
import com.stripe.Stripe;
import com.stripe.exception.StripeException;
import com.stripe.model.*;
import com.stripe.param.*;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.extension.ExtendWith;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.mockito.junit.jupiter.MockitoExtension;

import java.time.LocalDate;
import java.util.*;

@ExtendWith(MockitoExtension.class)
public class SubscriptionInfantemServiceTest {

    @Mock
    private SubscriptionInfantemRepository subscriptionInfantemRepository;

    @Mock
    private UserService userService;

    @Mock
    private StripeConfig stripeConfig;

    @InjectMocks
    private SubscriptionInfantemService subscriptionService;

    @BeforeEach
    public void setUp() {
        when(stripeConfig.getStripeApiKey()).thenReturn("sk_test_mock");
        Stripe.apiKey = stripeConfig.getStripeApiKey();

        // Forzar la inyección manualmente si es necesario
        subscriptionService = new SubscriptionInfantemService(subscriptionInfantemRepository, stripeConfig,
                userService);
    }

    @Test
    public void testCreateSubscription_Success() throws Exception {
        // Arrange
        User mockUser = new User();
        mockUser.setId(1);

        Subscription mockStripeSubscription = new Subscription();
        mockStripeSubscription.setId("sub_123");

        try (var mockedStatic = mockStatic(Subscription.class)) {
            mockedStatic.when(() -> Subscription.create(any(SubscriptionCreateParams.class)))
                    .thenReturn(mockStripeSubscription);

            // Configurar el mock de userService
            when(userService.getUserById(1L)).thenReturn(mockUser);

            SubscriptionInfantem savedSubscription = new SubscriptionInfantem();
            savedSubscription.setStripeSubscriptionId("sub_123");
            when(subscriptionInfantemRepository.save(any(SubscriptionInfantem.class))).thenReturn(savedSubscription);

            // Act
            SubscriptionInfantem result = subscriptionService.createSubscription(1L, "cus_123", "price_123", "pm_123");

            // Assert
            assertNotNull(result, "El resultado no debería ser nulo");
            assertEquals("sub_123", result.getStripeSubscriptionId());
            verify(userService).getUserById(1L);
            verify(subscriptionInfantemRepository).save(any(SubscriptionInfantem.class));
        }
    }

    @Test
    public void testCancelSubscription_Success() throws StripeException {
        // Arrange
        Subscription mockStripeSubscription = mock(Subscription.class);
        when(mockStripeSubscription.cancel()).thenReturn(mockStripeSubscription);

        try (var mockedStatic = mockStatic(Subscription.class)) {
            when(Subscription.retrieve("sub_123")).thenReturn(mockStripeSubscription);

            SubscriptionInfantem localSubscription = new SubscriptionInfantem();
            localSubscription.setStripeSubscriptionId("sub_123");
            localSubscription.setActive(true);

            when(subscriptionInfantemRepository.findByStripeSubscriptionId("sub_123"))
                    .thenReturn(Optional.of(localSubscription));

            when(subscriptionInfantemRepository.save(localSubscription)).thenReturn(localSubscription);

            // Act
            SubscriptionInfantem result = subscriptionService.cancelSubscription("sub_123");

            // Assert
            assertNotNull(result, "El resultado no debería ser nulo");
            assertFalse(result.isActive());
            assertNotNull(result.getEndDate());
            verify(mockStripeSubscription).cancel();
            verify(subscriptionInfantemRepository).save(localSubscription);
        }
    }

    @Test
    public void testCreateSubscriptionNew_Success() throws Exception {
        // Arrange
        User mockUser = new User();
        mockUser.setId(1);
        mockUser.setEmail("test@example.com");
        mockUser.setName("Test User");

        // Mock para createCustomer
        try (var customerMockedStatic = mockStatic(Customer.class)) {
            Customer mockCustomer = new Customer();
            mockCustomer.setId("cus_123");
            customerMockedStatic.when(() -> Customer.create(any(CustomerCreateParams.class))).thenReturn(mockCustomer);

            // Mock para attachPaymentMethod
            PaymentMethod mockPaymentMethod = mock(PaymentMethod.class);
            when(mockPaymentMethod.getId()).thenReturn("pm_123");

            try (var paymentMethodMockedStatic = mockStatic(PaymentMethod.class)) {
                paymentMethodMockedStatic.when(() -> PaymentMethod.retrieve("pm_123")).thenReturn(mockPaymentMethod);

                // 🔹 Corrección aplicada aquí:
                when(mockPaymentMethod.attach(any(PaymentMethodAttachParams.class))).thenReturn(mockPaymentMethod);

                // Mock para Subscription.create
                Subscription mockSubscription = new Subscription();
                mockSubscription.setId("sub_123");

                try (var subscriptionMockedStatic = mockStatic(Subscription.class)) {
                    subscriptionMockedStatic.when(() -> Subscription.create(any(SubscriptionCreateParams.class)))
                            .thenReturn(mockSubscription);

                    when(userService.getUserById(1L)).thenReturn(mockUser);

                    SubscriptionInfantem savedSubscription = new SubscriptionInfantem();
                    savedSubscription.setStripeSubscriptionId("sub_123");

                    when(subscriptionInfantemRepository.save(any(SubscriptionInfantem.class)))
                            .thenReturn(savedSubscription);

                    // Act
                    SubscriptionInfantem result = subscriptionService.createSubscriptionNew(1L, "price_123", "pm_123");

                    // Assert
                    assertNotNull(result, "El resultado no debería ser nulo");
                    assertEquals("sub_123", result.getStripeSubscriptionId());
                    verify(userService).getUserById(1L);
                }
            }
        }
    }

    @Test
    public void testUpdateSubscriptionStatus_WhenSubscriptionExists() {
        // Arrange
        SubscriptionInfantem subscription = new SubscriptionInfantem();
        subscription.setStripeSubscriptionId("sub_123");

        when(subscriptionInfantemRepository.findByStripeSubscriptionId("sub_123"))
                .thenReturn(Optional.of(subscription));

        // Act
        subscriptionService.updateSubscriptionStatus("sub_123", true);

        // Assert
        assertTrue(subscription.isActive());
        verify(subscriptionInfantemRepository).save(subscription);
    }

    @Test
    public void testGetSubscriptionUserById_Found() {
        // Arrange
        SubscriptionInfantem subscription = new SubscriptionInfantem();
        subscription.setId(1L);

        when(subscriptionInfantemRepository.findSubscriptionByUserId(1L)).thenReturn(Optional.of(subscription));

        // Act
        Optional<SubscriptionInfantem> result = subscriptionService.getSubscriptionUserById(1L);

        // Assert
        assertTrue(result.isPresent());
        assertEquals(1L, result.get().getId());
    }
}
