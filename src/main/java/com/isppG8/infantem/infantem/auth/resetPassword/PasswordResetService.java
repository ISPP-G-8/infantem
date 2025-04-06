package com.isppG8.infantem.infantem.auth.resetPassword;

import java.time.LocalDateTime;
import java.util.UUID;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import com.isppG8.infantem.infantem.exceptions.ResourceNotFoundException;
import com.isppG8.infantem.infantem.user.User;

@Service
public class PasswordResetService {

    private final PasswordResetRepository passwordResetRepository;

    @Autowired
    public PasswordResetService(PasswordResetRepository tokenRepository) {
        this.passwordResetRepository = tokenRepository;
    }

    @Transactional
    public String createToken(User user) {

        passwordResetRepository.findByUserId(user.getId()).ifPresent(passwordResetRepository::delete);

        String token = UUID.randomUUID().toString();
        PasswordResetToken resetToken = new PasswordResetToken();
        resetToken.setToken(token);
        resetToken.setUser(user);
        resetToken.setExpirationDate(LocalDateTime.now().plusMinutes(30));

        passwordResetRepository.save(resetToken);
        return token;
    }

    @Transactional(readOnly = true)
    public PasswordResetToken validateToken(String token) {
        PasswordResetToken resetToken = passwordResetRepository.findByToken(token)
                .orElseThrow(() -> new ResourceNotFoundException("Token", "id", token));

        if (resetToken.getExpirationDate().isBefore(LocalDateTime.now())) {
            throw new RuntimeException("El token ha expirado");
        }

        return resetToken;
    }

    public void invalidateToken(PasswordResetToken token) {
        passwordResetRepository.delete(token);
    }

}
