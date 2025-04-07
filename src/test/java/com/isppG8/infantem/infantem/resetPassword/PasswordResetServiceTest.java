package com.isppG8.infantem.infantem.resetPassword;

import com.isppG8.infantem.infantem.auth.resetPassword.PasswordResetRepository;
import com.isppG8.infantem.infantem.auth.resetPassword.PasswordResetService;
import com.isppG8.infantem.infantem.auth.resetPassword.PasswordResetToken;
import com.isppG8.infantem.infantem.exceptions.ResourceNotFoundException;
import com.isppG8.infantem.infantem.user.User;
import com.isppG8.infantem.infantem.user.UserRepository;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.test.context.ActiveProfiles;
import org.springframework.transaction.annotation.Transactional;

import java.time.LocalDateTime;

import static org.assertj.core.api.Assertions.*;

@SpringBootTest
@ActiveProfiles("test")
@Transactional
public class PasswordResetServiceTest {

    @Autowired
    private PasswordResetService passwordResetService;

    @Autowired
    private PasswordResetRepository tokenRepository;

    @Autowired
    private UserRepository userRepository;

    private User user;

    @BeforeEach
    void setUp() {
        user = new User();
        user.setName("Test");
        user.setSurname("User");
        user.setEmail("test@example.com");
        user.setUsername("testuser");
        user.setPassword("encodedPassword");
        userRepository.save(user);
    }

    @Test
    void testCreateToken_createsValidToken() {
        String token = passwordResetService.createToken(user);
        PasswordResetToken stored = tokenRepository.findByToken(token).orElse(null);

        assertThat(stored).isNotNull();
        assertThat(stored.getUser().getId()).isEqualTo(user.getId());
        assertThat(stored.getExpirationDate()).isAfter(LocalDateTime.now());
    }

    @Test
    void testValidateToken_validToken_returnsToken() {
        String token = passwordResetService.createToken(user);
        PasswordResetToken validated = passwordResetService.validateToken(token);
        assertThat(validated).isNotNull();
        assertThat(validated.getToken()).isEqualTo(token);
    }

    @Test
    void testValidateToken_expiredToken_throwsException() {
        PasswordResetToken expiredToken = new PasswordResetToken();
        expiredToken.setToken("expired-token");
        expiredToken.setUser(user);
        expiredToken.setExpirationDate(LocalDateTime.now().minusMinutes(10));
        tokenRepository.save(expiredToken);

        assertThatThrownBy(() -> passwordResetService.validateToken("expired-token"))
                .isInstanceOf(RuntimeException.class).hasMessageContaining("expirado");
    }

    @Test
    void testInvalidateToken_removesToken() {
        String token = passwordResetService.createToken(user);
        PasswordResetToken stored = tokenRepository.findByToken(token).orElseThrow();
        passwordResetService.invalidateToken(stored);

        assertThat(tokenRepository.findByToken(token)).isEmpty();
    }

    @Test
    void testDeleteExpiredTokens_removesExpiredTokens() {
        PasswordResetToken expiredToken = new PasswordResetToken();
        expiredToken.setToken("expired-token");
        expiredToken.setUser(user);
        expiredToken.setExpirationDate(LocalDateTime.now().minusHours(1));
        tokenRepository.save(expiredToken);

        passwordResetService.deleteExpiredTokens();

        assertThat(tokenRepository.findByToken("expired-token")).isEmpty();
    }

    @Test
    void testValidateToken_nonExistingToken_throwsException() {
        assertThatThrownBy(() -> passwordResetService.validateToken("non-existent-token"))
                .isInstanceOf(ResourceNotFoundException.class).hasMessageContaining("Token");
    }

    @Test
    void testInvalidateToken_withNonExistingToken_doesNotThrow() {
        PasswordResetToken fakeToken = new PasswordResetToken();
        fakeToken.setToken("fake");
        fakeToken.setExpirationDate(LocalDateTime.now());
        fakeToken.setUser(user);

        assertThatCode(() -> passwordResetService.invalidateToken(fakeToken)).doesNotThrowAnyException();
    }

}
