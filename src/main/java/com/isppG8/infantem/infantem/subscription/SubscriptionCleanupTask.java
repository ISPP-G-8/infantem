package com.isppG8.infantem.infantem.subscription;

import org.springframework.scheduling.annotation.Scheduled;
import org.springframework.stereotype.Component;

@Component
public class SubscriptionCleanupTask {

    private final SubscriptionInfantemService subscriptionService;

    public SubscriptionCleanupTask(SubscriptionInfantemService subscriptionService) {
        this.subscriptionService = subscriptionService;
    }

    // Ejecutar todos los días a las 2:00 AM
    @Scheduled(cron = "0 0 2 * * *")
    public void cleanExpiredSubscriptions() {
        try {
            subscriptionService.deleteExpiredSubscriptions();
        } catch (Exception e) {
            System.err.println("Error al eliminar suscripciones expiradas: " + e.getMessage());
        }
    }
}
