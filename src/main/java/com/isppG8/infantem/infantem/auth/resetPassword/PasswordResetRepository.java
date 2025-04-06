package com.isppG8.infantem.infantem.auth.resetPassword;

import java.time.LocalDateTime;
import java.util.Optional;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface PasswordResetRepository extends JpaRepository<PasswordResetToken, Long> {
    Optional<PasswordResetToken> findByToken(String token);

    Optional<PasswordResetToken> findByUserId(Integer userId);

    void deleteAllByExpirationDateBefore(LocalDateTime dateTime);

}
