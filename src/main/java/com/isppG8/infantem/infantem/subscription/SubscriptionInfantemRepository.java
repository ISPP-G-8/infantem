package com.isppG8.infantem.infantem.subscription;

import java.util.List;
import java.util.Optional;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import com.isppG8.infantem.infantem.user.User;
import java.time.LocalDate;

public interface SubscriptionInfantemRepository extends JpaRepository<SubscriptionInfantem, Long> {

    @Query("SELECT s FROM SubscriptionInfantem s WHERE s.startDate >= :firstDayOfMonth AND s.startDate < :nextMonth")
    List<SubscriptionInfantem> findSubscriptionsExpiringThisMonth(@Param("firstDayOfMonth") LocalDate firstDayOfMonth,
            @Param("nextMonth") LocalDate nextMonth);

    @Query("SELECT s FROM SubscriptionInfantem s WHERE s.user = :user AND s.active = true")
    Optional<SubscriptionInfantem> findByUserAndActiveTrue(@Param("user") User user);

    @Query("SELECT s FROM SubscriptionInfantem s WHERE s.user = :user")
    Optional<SubscriptionInfantem> findByUser(@Param("user") User user);

    @Query("SELECT s FROM SubscriptionInfantem s WHERE s.id = :subscriptionId")
    Optional<SubscriptionInfantem> findBySubscriptionId(String subscriptionId);

    @Query("SELECT s FROM SubscriptionInfantem s WHERE s.stripeSubscriptionId = :stripeSubscriptionId")
    Optional<SubscriptionInfantem> findByStripeSubscriptionId(
            @Param("stripeSubscriptionId") String stripeSubscriptionId);

    @Query("SELECT s FROM SubscriptionInfantem s WHERE s.stripeCustomerId = :stripeCustomerId")
    Optional<User> findByStripeCustomerId(String stripeCustomerId);

    @Query("SELECT s FROM SubscriptionInfantem s WHERE s.user.id = :userId")
    Optional<SubscriptionInfantem> findSubscriptionByUserId(@Param("userId") Long userId);

}
