package com.isppG8.infantem.infantem.subscription;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.media.Content;
import io.swagger.v3.oas.annotations.media.Schema;
import io.swagger.v3.oas.annotations.responses.ApiResponse;
import io.swagger.v3.oas.annotations.tags.Tag;

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

    @Operation(summary = "Crear una nueva suscripción",
            description = "Crea una nueva suscripción asociada a un usuario.") @ApiResponse(responseCode = "200",
                    description = "Suscripción creada exitosamente",
                    content = @Content(mediaType = "application/json",
                            schema = @Schema(implementation = SubscriptionInfantem.class))) @ApiResponse(
                                    responseCode = "400",
                                    description = "Error al crear la suscripción") @PostMapping("/create")
    public ResponseEntity<?> createSubscription(@RequestParam String userId, // Ahora se recibe el ID del usuario
            @RequestParam String customerId, @RequestParam String priceId, @RequestParam String paymentMethodId) {
        try {
            Long id = Long.parseLong(userId); // Convertir el ID a Long
            SubscriptionInfantem subscription = subscriptionService.createSubscription(id, customerId, priceId,
                    paymentMethodId);
            return ResponseEntity.ok(subscription); // Devuelve la SubscriptionInfantem
        } catch (Exception e) {
            return ResponseEntity.badRequest().body("Error al crear la suscripción: " + e.getMessage());
        }
    }

    @Operation(summary = "Crear una nueva suscripción (versión nueva)",
            description = "Crea una nueva suscripción asociada a un usuario, versión nueva.") @ApiResponse(
                    responseCode = "200", description = "Suscripción creada exitosamente",
                    content = @Content(mediaType = "application/json",
                            schema = @Schema(implementation = SubscriptionInfantem.class))) @ApiResponse(
                                    responseCode = "400",
                                    description = "Error al crear la suscripción") @PostMapping("/create/new")
    public ResponseEntity<?> createSubscriptionNew(@RequestParam String userId, @RequestParam String priceId,
            @RequestParam String paymentMethodId) {
        try {
            Long id = Long.parseLong(userId); // Convertir el ID a Long
            SubscriptionInfantem subscription = subscriptionService.createSubscriptionNew(id, priceId, paymentMethodId);
            return ResponseEntity.ok(subscription); // Devuelve la SubscriptionInfantem
        } catch (Exception e) {
            return ResponseEntity.badRequest().body("Error al crear la suscripción: " + e.getMessage());
        }
    }

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
            @RequestParam boolean isActive) {
        try {
            subscriptionService.updateSubscriptionStatus(subscriptionId, isActive);
            return ResponseEntity.ok("Estado de la suscripción actualizado.");
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
}
