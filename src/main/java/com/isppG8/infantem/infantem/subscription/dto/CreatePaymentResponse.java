package com.isppG8.infantem.infantem.subscription.dto;

public class CreatePaymentResponse {
    private String clientSecret;

    public CreatePaymentResponse(String clientSecret) {
        this.clientSecret = clientSecret;
    }

    // Getter
    public String getClientSecret() {
        return clientSecret;
    }
}
