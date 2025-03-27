package com.isppG8.infantem.infantem.subscription;

import com.google.gson.JsonSyntaxException;
import com.stripe.exception.SignatureVerificationException;
import com.stripe.exception.StripeException;
import com.stripe.model.Event;
import com.stripe.net.Webhook;
import io.github.cdimascio.dotenv.Dotenv;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestHeader;
import org.springframework.web.bind.annotation.RequestMapping;

@RestController
@RequestMapping("/stripe/webhook")
public class StripeWebhookController {

    private final String endpointSecret;
    private final SubscriptionInfantemService subscriptionService;

    public StripeWebhookController(SubscriptionInfantemService subscriptionService) {
        this.subscriptionService = subscriptionService;

        // Cargar el secreto desde .env
        Dotenv dotenv = Dotenv.load();
        this.endpointSecret = dotenv.get("STRIPE_WEBHOOK_SECRET");
    }

    @PostMapping
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
