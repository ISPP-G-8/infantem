package com.isppG8.infantem.infantem.subscription;

import static org.junit.jupiter.api.Assertions.*;
import static org.mockito.ArgumentMatchers.*;
import static org.mockito.Mockito.*;

import com.isppG8.infantem.infantem.auth.Authorities;
import com.isppG8.infantem.infantem.auth.AuthoritiesService;
import com.isppG8.infantem.infantem.config.StripeConfig;
import com.isppG8.infantem.infantem.exceptions.ResourceNotFoundException;
import com.isppG8.infantem.infantem.user.User;
import com.isppG8.infantem.infantem.user.UserService;
import com.isppG8.infantem.infantem.user.dto.UserDTO;
import com.stripe.Stripe;
import com.stripe.model.*;
import com.stripe.param.*;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.extension.ExtendWith;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.mockito.MockedStatic;
import org.mockito.junit.jupiter.MockitoExtension;

import java.time.Instant;
import java.time.temporal.ChronoUnit;
import java.util.*;

@ExtendWith(MockitoExtension.class)
public class SubscriptionInfantemServiceTest {

    @Mock
    private SubscriptionInfantemRepository subscriptionInfantemRepository;

    @Mock
    private UserService userService;

    @Mock
    private AuthoritiesService authoritiesService;

    @Mock
    private StripeConfig stripeConfig;

    @InjectMocks
    private SubscriptionInfantemService subscriptionService;

    @BeforeEach
    public void setUp() {
        when(stripeConfig.getStripeApiKey()).thenReturn("sk_test_mock");
        Stripe.apiKey = stripeConfig.getStripeApiKey();

        // Forzar la inyección manualmente si es necesario
        subscriptionService = new SubscriptionInfantemService(subscriptionInfantemRepository, stripeConfig, userService,
                authoritiesService);
    }

    @Test
    public void testCancelSubscription_Success() throws Exception {
        // Arrange
        String subscriptionId = "sub_123";
        long currentPeriodEnd = Instant.now().plus(30, ChronoUnit.DAYS).getEpochSecond();

        // 1. Mockear User y Authorities
        Authorities userAuthority = new Authorities();
        userAuthority.setAuthority("user");

        User mockUser = new User();
        mockUser.setId(1);
        mockUser.setAuthorities(userAuthority); // Asegurar authorities iniciales

        // 2. Mockear Stripe Subscription
        Subscription mockStripeSubscription = mock(Subscription.class);
        when(mockStripeSubscription.getCurrentPeriodEnd()).thenReturn(currentPeriodEnd);

        // 3. Mockear repositorio local
        SubscriptionInfantem localSubscription = new SubscriptionInfantem();
        localSubscription.setUser(mockUser); // ¡Esto es lo que faltaba!
        localSubscription.setActive(true);
        localSubscription.setStripeSubscriptionId(subscriptionId);

        when(subscriptionInfantemRepository.findByStripeSubscriptionId(subscriptionId))
                .thenReturn(Optional.of(localSubscription));

        // 4. Mockear servicios
        // 4. Mockear servicios
        when(authoritiesService.findByAuthority("user")).thenReturn(userAuthority);
        when(userService.getUserById(1L)).thenReturn(mockUser); // <-- AÑADIR ESTA LÍNEA
        when(userService.updateUser(eq(1L), any(UserDTO.class))).thenReturn(mockUser);

        // 5. Mockear llamadas estáticas a Stripe
        try (MockedStatic<Subscription> mockedStatic = mockStatic(Subscription.class)) {
            mockedStatic.when(() -> Subscription.retrieve(subscriptionId)).thenReturn(mockStripeSubscription);

            mockedStatic.when(() -> mockStripeSubscription.update(anyMap())).thenReturn(mockStripeSubscription);

            when(subscriptionInfantemRepository.save(localSubscription)).thenReturn(localSubscription);

            // Act
            SubscriptionInfantem result = subscriptionService.cancelSubscription(subscriptionId);

            // Assert
            assertNotNull(result);
            assertFalse(result.isActive());
            assertNotNull(result.getEndDate());

            // Verify
            verify(subscriptionInfantemRepository).save(localSubscription);
            verify(userService).updateUser(eq(1L), any(UserDTO.class));
        }
    }

    @Test
    public void testActivateSubscription_WhenUserHasSubscription() {
        // Arrange
        User user = new User();
        user.setId(1);

        SubscriptionInfantem subscription = new SubscriptionInfantem();
        subscription.setUser(user);
        subscription.setActive(false); // Inicialmente inactiva

        // Mock del repositorio
        when(subscriptionInfantemRepository.findByUser(user)).thenReturn(Optional.of(subscription));

        // Mock del userService (ya que activateSubscription lo llama)
        doNothing().when(userService).upgradeToPremium(user);

        // Act
        subscriptionService.activateSubscription(user, "sub_123");

        // Assert
        assertTrue(subscription.isActive()); // Verifica que se activó
        assertEquals("sub_123", subscription.getStripeSubscriptionId()); // Verifica el ID
        verify(userService, times(1)).upgradeToPremium(user); // Verifica que se actualizó el usuario
        verify(subscriptionInfantemRepository, times(1)).save(subscription); // Verifica que se guardó
    }

    @Test
    public void testDesactivateSubscription_WhenUserHasSubscription() {
        // Arrange
        User user = new User();
        user.setId(1);

        SubscriptionInfantem subscription = new SubscriptionInfantem();
        subscription.setUser(user);
        subscription.setActive(true); // Inicialmente activa

        // Mock del repositorio
        when(subscriptionInfantemRepository.findByUser(user)).thenReturn(Optional.of(subscription));

        // Mock de authoritiesService y userService
        Authorities userAuthority = new Authorities();
        userAuthority.setAuthority("user");
        when(authoritiesService.findByAuthority("user")).thenReturn(userAuthority);
        when(userService.updateUser(anyLong(), any(UserDTO.class))).thenReturn(user);

        // Act
        subscriptionService.desactivateSubscription(user, "sub_123");

        // Assert
        assertFalse(subscription.isActive()); // Verifica que se desactivó
        assertEquals("sub_123", subscription.getStripeSubscriptionId()); // Verifica el ID
        verify(userService, times(1)).updateUser(anyLong(), any(UserDTO.class)); // Verifica que se actualizó el usuario
        verify(subscriptionInfantemRepository, times(1)).save(subscription); // Verifica que se guardó
    }

    @Test
    public void testActivateSubscription_WhenUserHasNoSubscription() {
        // Arrange
        User user = new User();
        user.setId(1);

        // Mock del repositorio (no encuentra suscripción)
        when(subscriptionInfantemRepository.findByUser(user)).thenReturn(Optional.empty());

        // Act & Assert
        assertThrows(ResourceNotFoundException.class, () -> {
            subscriptionService.activateSubscription(user, "sub_123");
        });

        // Verifica que NO se llamó a save ni a upgradeToPremium
        verify(userService, never()).upgradeToPremium(any());
        verify(subscriptionInfantemRepository, never()).save(any());
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
