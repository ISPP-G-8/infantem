package com.isppG8.infantem.infantem.subscription;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.autoconfigure.security.oauth2.resource.OAuth2ResourceServerProperties.Jwt;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import com.isppG8.infantem.infantem.auth.Authorities;
import com.isppG8.infantem.infantem.auth.jwt.JwtResponse;
import com.isppG8.infantem.infantem.auth.jwt.JwtUtils;
import com.isppG8.infantem.infantem.subscription.dto.CreatePaymentRequest;
import com.isppG8.infantem.infantem.subscription.dto.CreatePaymentResponse;
import com.isppG8.infantem.infantem.user.User;
import com.isppG8.infantem.infantem.user.UserRepository;
import com.isppG8.infantem.infantem.user.UserService;
import com.stripe.exception.StripeException;
import com.stripe.model.PaymentIntent;
import com.stripe.model.Subscription;
import com.stripe.param.PaymentIntentCreateParams;
import com.stripe.param.SubscriptionCreateParams;

import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.media.Content;
import io.swagger.v3.oas.annotations.media.Schema;
import io.swagger.v3.oas.annotations.responses.ApiResponse;
import io.swagger.v3.oas.annotations.tags.Tag;

import java.time.Instant;
import java.time.LocalDate;
import java.util.HashMap;
import java.util.List;
import java.util.Map;
import java.util.Optional;

@Tag(name = "Subscriptions", description = "Gestión de suscripciones de Infantem")
@RestController
@RequestMapping("/api/v1/subscriptions")
public class SubscriptionInfantemController {

    @Autowired
    private SubscriptionInfantemService subscriptionService;

    @Autowired
    private SubscriptionInfantemRepository subscriptionInfantemRepository;

    @Autowired
    private UserRepository userRepository;

    @Autowired
    private UserService userService;

    @Autowired
    private JwtUtils jwtUtils;

    @Operation(summary = "Obtener cliente por email",
            description = "Recupera los detalles de un cliente a partir de su email y últimos 4 dígitos del método de pago.") @ApiResponse(
                    responseCode = "200", description = "Cliente encontrado",
                    content = @Content(mediaType = "application/json")) @ApiResponse(responseCode = "400",
                            description = "Error al obtener el cliente") @GetMapping("/customers")
    public ResponseEntity<?> getCustomersByEmail(@RequestParam String email, @RequestParam Integer lasts4) {
        try {
            Map<String, Object> customerFinal = null;
            List<Map<String, Object>> customers = subscriptionService.getCustomersByEmail(email);

            for (Map<String, Object> customer : customers) {
                String customerId = (String) customer.get("id");
                Map<String, Object> paymentMethod = subscriptionService.getPaymentMethodsByCustomer(customerId, lasts4);

                if (paymentMethod != null) {
                    customerFinal = new HashMap<>(customer);
                    customerFinal.put("paymentMethod", paymentMethod);
                    break;
                }
            }

            return ResponseEntity.ok(customerFinal != null ? customerFinal : "Cliente no encontrado");
        } catch (Exception e) {
            return ResponseEntity.badRequest().body("Error al obtener clientes: " + e.getMessage());
        }
    }

    @Operation(summary = "Actualizar estado de una suscripción",
            description = "Actualiza el estado de una suscripción, activándola o desactivándola.") @ApiResponse(
                    responseCode = "200",
                    description = "Estado de la suscripción actualizado") @ApiResponse(responseCode = "400",
                            description = "Error al actualizar el estado") @PostMapping("/update-status")
    public ResponseEntity<?> updateSubscriptionStatus(@RequestParam String subscriptionId,
            @RequestParam boolean active) {
        try {
            Optional<SubscriptionInfantem> optionalSub = subscriptionInfantemRepository.findAll().stream()
                    .filter(sub -> subscriptionId.equals(sub.getStripeSubscriptionId())).findFirst();

            if (!optionalSub.isPresent()) {
                return ResponseEntity.badRequest().body("No se encontró ninguna suscripción con ID: " + subscriptionId);
            }

            SubscriptionInfantem subscription = optionalSub.get();
            User user = subscription.getUser();

            JwtResponse jwtResponse;

            if (active) {
                jwtResponse = subscriptionService.activateSubscription(user, subscriptionId);
            } else {
                jwtResponse = subscriptionService.desactivateSubscription(user, subscriptionId);
            }

            return ResponseEntity.ok(jwtResponse);

        } catch (Exception e) {
            return ResponseEntity.badRequest().body("Error al actualizar el estado: " + e.getMessage());
        }
    }

    @Operation(summary = "Cancelar una suscripción",
            description = "Cancela una suscripción existente y devuelve la información de la misma.") @ApiResponse(
                    responseCode = "200", description = "Suscripción cancelada exitosamente",
                    content = @Content(mediaType = "application/json",
                            schema = @Schema(implementation = SubscriptionInfantem.class))) @ApiResponse(
                                    responseCode = "400",
                                    description = "Error al cancelar la suscripción") @PostMapping("/cancel")
    public ResponseEntity<?> cancelSubscription(@RequestParam String subscriptionId) {
        try {
            SubscriptionInfantem cancelledSubscription = subscriptionService.cancelSubscription(subscriptionId);

            Map<String, Object> response = new HashMap<>();
            response.put("message", "Suscripción cancelada exitosamente");
            response.put("subscription", cancelledSubscription);
            response.put("active", false); // ← Confirmamos que está inactiva

            return ResponseEntity.ok(response);
        } catch (Exception e) {
            return ResponseEntity.badRequest().body("Error al cancelar la suscripción: " + e.getMessage());
        }
    }

    @Operation(summary = "Obtener una suscripción de un usuario por ID",
            description = "Recupera la suscripción de un usuario por su ID.") @ApiResponse(responseCode = "200",
                    description = "Suscripción encontrada",
                    content = @Content(mediaType = "application/json",
                            schema = @Schema(implementation = SubscriptionInfantem.class))) @ApiResponse(
                                    responseCode = "404",
                                    description = "Suscripción no encontrada") @GetMapping("/user/{id}")
    public ResponseEntity<Object> getSubscription(@PathVariable Long id) {
        Optional<SubscriptionInfantem> subscriptionUser = subscriptionService.getSubscriptionUserById(id);

        if (subscriptionUser.isPresent()) {
            return ResponseEntity.ok(subscriptionUser.get());
        } else {
            return ResponseEntity.ok().build(); // O podrías devolver un objeto vacío o un mensaje
        }
    }

    @Operation(summary = "Crear una nueva suscripción (versión nueva)",
            description = "Crea una nueva suscripción asociada a un usuario, versión nueva.") @ApiResponse(
                    responseCode = "200", description = "Suscripción creada exitosamente",
                    content = @Content(mediaType = "application/json",
                            schema = @Schema(implementation = SubscriptionInfantem.class))) @ApiResponse(
                                    responseCode = "400",
                                    description = "Error al crear la suscripción") @PostMapping("/create-payment-intent")
    public CreatePaymentResponse createPaymentIntent(@RequestBody CreatePaymentRequest request) throws StripeException {
        if (request.getAmount() == null || request.getCurrency() == null || request.getCustomerId() == null) {
            throw new IllegalArgumentException("Amount, currency, and customerId are required.");
        }

        PaymentIntentCreateParams params = PaymentIntentCreateParams.builder().setAmount(request.getAmount())
                .setCurrency(request.getCurrency()).setCustomer(request.getCustomerId())
                .setAutomaticPaymentMethods(
                        PaymentIntentCreateParams.AutomaticPaymentMethods.builder().setEnabled(true).build())
                .setSetupFutureUsage(PaymentIntentCreateParams.SetupFutureUsage.OFF_SESSION) // 🔥 CLAVE para Apple Pay,
                                                                                             // Google Pay,
                                                                                             // suscripciones
                .build();

        PaymentIntent paymentIntent = PaymentIntent.create(params);

        return new CreatePaymentResponse(paymentIntent.getClientSecret());
    }

    @Operation(summary = "Crear una nueva suscripción",
            description = "Crea una nueva suscripción asociada a un usuario.") @ApiResponse(responseCode = "200",
                    description = "Suscripción creada exitosamente",
                    content = @Content(mediaType = "application/json",
                            schema = @Schema(implementation = SubscriptionInfantem.class))) @ApiResponse(
                                    responseCode = "400",
                                    description = "Error al crear la suscripción") @PostMapping("/create-from-intent")
    public ResponseEntity<?> createSubscriptionFromIntent(@RequestParam String userId, @RequestParam String priceId,
            @RequestParam String paymentIntentId) {
        try {
            PaymentIntent intent = PaymentIntent.retrieve(paymentIntentId);
            String paymentMethodId = intent.getPaymentMethod();
            String customerId = intent.getCustomer();

            System.out.println("PaymentIntent ID: " + intent.getId());
            System.out.println("Customer ID from intent: " + customerId);
            System.out.println("PaymentMethod ID from intent: " + paymentMethodId);

            if (paymentMethodId == null || customerId == null) {
                return ResponseEntity.badRequest().body("Faltan datos del PaymentIntent.");
            }

            if (paymentMethodId == null || customerId == null) {
                return ResponseEntity.badRequest().body("Faltan datos del PaymentIntent.");
            }

            SubscriptionInfantem subscription = subscriptionService.createSubscriptionNew(Long.parseLong(userId),
                    priceId, paymentMethodId, customerId // ✅ NUEVO parámetro
            );

            return ResponseEntity.ok(subscription);
        } catch (Exception e) {
            return ResponseEntity.badRequest().body("Error al crear la suscripción: " + e.getMessage());
        }
    }

    @GetMapping("/customer-id")
    public ResponseEntity<?> createStripeCustomer(@RequestParam Long userId) throws Exception {
        Optional<User> userOpt = userRepository.findById(userId);
        if (userOpt.isEmpty()) {
            return ResponseEntity.status(HttpStatus.NOT_FOUND).body("Usuario no encontrado");
        }

        User user = userOpt.get();
        String customerId = subscriptionService.createCustomer(user.getEmail(), user.getName(),
                "Cliente creado para PaymentIntent");

        return ResponseEntity.ok(customerId);
    }

    @PostMapping("/create-subscription")
    public ResponseEntity<?> createSubscription(@RequestParam Long userId, @RequestParam String priceId,
            @RequestParam String paymentIntentId) {
        try {
            PaymentIntent intent = PaymentIntent.retrieve(paymentIntentId);
            String paymentMethodId = intent.getPaymentMethod();
            String customerId = intent.getCustomer();

            if (paymentMethodId == null || customerId == null) {
                return ResponseEntity.badRequest().body("Faltan datos del PaymentIntent.");
            }

            SubscriptionInfantem subscription = subscriptionService.createSubscriptionNew(userId, priceId,
                    paymentMethodId, customerId);

            return ResponseEntity.ok(subscription);
        } catch (Exception e) {
            return ResponseEntity.badRequest().body("Error al crear la suscripción: " + e.getMessage());
        }
    }

    @PostMapping("/create-subscription-from-payment-intent")
    public ResponseEntity<?> createSubscriptionAfterPaymentIntent(@RequestParam Long userId,
            @RequestParam String priceId, @RequestParam String paymentIntentId) {
        try {
            PaymentIntent intent = PaymentIntent.retrieve(paymentIntentId);
            String paymentMethodId = intent.getPaymentMethod();
            String customerId = intent.getCustomer();

            if (paymentMethodId == null || customerId == null) {
                return ResponseEntity.badRequest().body("Faltan datos del PaymentIntent.");
            }

            // ⏩ Timestamp en el futuro para evitar error de billing_cycle_anchor
            long futureTimestamp = Instant.now().plusSeconds(300).getEpochSecond(); // ahora + 5 minutos

            SubscriptionCreateParams params = SubscriptionCreateParams.builder().setCustomer(customerId)
                    .addItem(SubscriptionCreateParams.Item.builder().setPrice(priceId).build())
                    .setDefaultPaymentMethod(paymentMethodId)
                    .setPaymentBehavior(SubscriptionCreateParams.PaymentBehavior.DEFAULT_INCOMPLETE)
                    .setBillingCycleAnchor(futureTimestamp).build();

            Subscription stripeSubscription = Subscription.create(params);

            // Guardar en tu base de datos
            // Guardar en tu base de datos
            User user = userRepository.findById(userId)
                    .orElseThrow(() -> new RuntimeException("Usuario no encontrado"));

            userService.upgradeToPremium(user);

            SubscriptionInfantem newSubscription = new SubscriptionInfantem();
            newSubscription.setUser(user);
            newSubscription.setStartDate(LocalDate.now());
            newSubscription.setActive(true);
            newSubscription.setStripePaymentMethodId(paymentMethodId);
            newSubscription.setStripeSubscriptionId(stripeSubscription.getId());
            newSubscription.setStripeCustomerId(customerId);

            subscriptionInfantemRepository.save(newSubscription);

            // 🟡 Generar nuevo JWT tras cambio de rol (a premium)
            Authorities auth = user.getAuthorities();
            String newToken = jwtUtils.generateTokenFromUsername(user.getUsername(), auth, user.getId());
            List<String> roles = List.of(auth.getAuthority());

            JwtResponse jwtResponse = new JwtResponse(newToken, user.getId(), user.getUsername(), roles);

            // Puedes devolver ambos: JWT + info de suscripción
            Map<String, Object> response = new HashMap<>();
            response.put("subscription", newSubscription);
            response.put("token", jwtResponse);

            return ResponseEntity.ok(response);

        } catch (Exception e) {
            return ResponseEntity.badRequest().body("Error al crear la suscripción: " + e.getMessage());
        }
    }

}
