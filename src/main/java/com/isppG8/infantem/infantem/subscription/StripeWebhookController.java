package com.isppG8.infantem.infantem.subscription;

import com.google.gson.JsonSyntaxException;
import com.stripe.exception.SignatureVerificationException;
import com.stripe.exception.StripeException;
import com.stripe.model.Event;
import com.stripe.net.Webhook;
import io.github.cdimascio.dotenv.Dotenv;
import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.responses.ApiResponse;
import io.swagger.v3.oas.annotations.tags.Tag;

import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestHeader;
import org.springframework.web.bind.annotation.RequestMapping;

@Tag(name = "Stripe Webhook", description = "Gestión de eventos de webhook de Stripe")
@RestController
@RequestMapping("/stripe/webhook")
public class StripeWebhookController {

    private final String endpointSecret;
    private final SubscriptionInfantemService subscriptionService;

    public StripeWebhookController(SubscriptionInfantemService subscriptionService) {
        this.subscriptionService = subscriptionService;

        String webhook = System.getenv("STRIPE_WEBHOOK_SECRET");
        if (webhook == null) {
            Dotenv dotenv = Dotenv.load();
            webhook = dotenv.get("STRIPE_WEBHOOK_SECRET");
        }
        this.endpointSecret = webhook;
    }

    @Operation(summary = "Recibir eventos de webhook de Stripe",
            description = "Recibe eventos de Stripe para gestionar suscripciones y pagos.") @ApiResponse(
                    responseCode = "200",
                    description = "Evento recibido correctamente") @ApiResponse(responseCode = "400",
                            description = "Falta la firma del webhook o firma inválida") @ApiResponse(
                                    responseCode = "400", description = "Payload inválido") @PostMapping
    public ResponseEntity<String> handleWebhook(@RequestBody String payload,
            @RequestHeader("Stripe-Signature") String sigHeader) throws StripeException {
        if (sigHeader == null) {
            return ResponseEntity.status(HttpStatus.BAD_REQUEST).body("Falta la firma del webhook");
        }

        try {
            Event event = Webhook.constructEvent(payload, sigHeader, endpointSecret);
            switch (event.getType()) {
                case "checkout.session.completed":
                    subscriptionService.handleCheckoutSessionCompleted(event);
                    break;
                case "invoice.payment_succeeded":
                    subscriptionService.handleInvoicePaymentSucceeded(event);
                    break;
                case "customer.subscription.deleted":
                    subscriptionService.handleSubscriptionCanceled(event);
                    break;
                case "customer.subscription.created":
                    subscriptionService.handleSubscriptionCreated(event);
                    break;
                default:
                    System.out.println("Evento no manejado: " + event.getType());
            }
            return ResponseEntity.ok("Evento recibido correctamente");

        } catch (SignatureVerificationException e) {
            return ResponseEntity.status(HttpStatus.BAD_REQUEST).body("Firma inválida del webhook");
        } catch (JsonSyntaxException e) {
            return ResponseEntity.status(HttpStatus.BAD_REQUEST).body("Payload inválido");
        }
    }
}
