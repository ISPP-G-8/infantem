package com.isppG8.infantem.infantem.config;

import com.stripe.Stripe;
import io.github.cdimascio.dotenv.Dotenv;
import org.springframework.context.annotation.Configuration;

@Configuration
public class StripeConfig {

    private final String stripeApiKey;

    public StripeConfig() {

        String apiKey = System.getenv("STRIPE_SECRET_KEY");

        if (apiKey == null) {
            Dotenv dotenv = Dotenv.load();
            apiKey = dotenv.get("STRIPE_SECRET_KEY");
        }
        this.stripeApiKey = apiKey;

        // Configurar la clave de API de Stripe globalmente
        Stripe.apiKey = this.stripeApiKey;
    }

    public String getStripeApiKey() {
        return stripeApiKey;
    }
}
