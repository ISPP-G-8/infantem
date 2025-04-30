package com.isppG8.infantem.infantem.subscription.dto;

public class CreatePaymentRequest {
    private Long amount;
    private String currency;
    private String customerId; // 🔥 Añadido

    // Getters y Setters
    public Long getAmount() {
        return amount;
    }

    public void setAmount(Long amount) {
        this.amount = amount;
    }

    public String getCurrency() {
        return currency;
    }

    public void setCurrency(String currency) {
        this.currency = currency;
    }

    public String getCustomerId() {
        return customerId;
    }

    public void setCustomerId(String customerId) {
        this.customerId = customerId;
    }
}
