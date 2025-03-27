package com.isppG8.infantem.infantem.subscription;

import com.isppG8.infantem.infantem.user.User;
import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.OneToOne;
import jakarta.persistence.Table;
import lombok.Getter;
import lombok.Setter;

import java.time.LocalDate;

@Entity
@Table(name = "subscription_table")
@Getter
@Setter
public class SubscriptionInfantem {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @OneToOne
    @JoinColumn(name = "user_id", nullable = false)
    private User user;

    private String stripeSubscriptionId;
    private String stripeCustomerId;
    private String stripePaymentMethodId;
    private LocalDate startDate;
    private boolean active;
    private LocalDate endDate;
    private String currentPeriodEnd;

}
