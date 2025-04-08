package com.isppG8.infantem.infantem.auth;

import com.isppG8.infantem.infantem.auth.resetPassword.PasswordResetRepository;
import com.isppG8.infantem.infantem.auth.resetPassword.PasswordResetService;
import com.isppG8.infantem.infantem.auth.resetPassword.PasswordResetToken;
import com.isppG8.infantem.infantem.user.User;
import com.isppG8.infantem.infantem.user.UserRepository;

import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.test.context.ActiveProfiles;
import org.springframework.transaction.annotation.Transactional;

import static org.assertj.core.api.Assertions.*;

@SpringBootTest
@ActiveProfiles("test")
@Transactional
public class AuthServiceTest {

    @Autowired
    private AuthService authService;

    @Autowired
    private PasswordResetService passwordResetService;

    @Autowired
    private PasswordResetRepository passwordResetRepository;

    @Autowired
    private UserRepository userRepository;

    @Autowired
    private PasswordEncoder passwordEncoder;

    private User user;

    @BeforeEach
    void setUp() {
        user = new User();
        user.setName("Test");
        user.setSurname("User");
        user.setEmail("test@example.com");
        user.setUsername("testuser");
        user.setPassword(passwordEncoder.encode("initialPass123"));
        userRepository.save(user);
    }

    @Test
    void testInitiatePasswordReset_userExists_sendsEmail() {
        assertThatCode(() -> authService.initiatePasswordReset("test@example.com"))
            .doesNotThrowAnyException();

        PasswordResetToken token = passwordResetRepository.findByUserId(user.getId()).orElse(null);
        assertThat(token).isNotNull();
        assertThat(token.getUser().getEmail()).isEqualTo("test@example.com");
    }

    @Test
    void testInitiatePasswordReset_userNotFound_doesNothing() {
        assertThatCode(() -> authService.initiatePasswordReset("noexiste@email.com"))
            .doesNotThrowAnyException();
    }

    @Test
    void testResetPassword_validToken_updatesPassword() {
        String token = passwordResetService.createToken(user);
        authService.resetPassword(token, "newPassword123");

        User updatedUser = userRepository.findById(user.getId().longValue()).orElseThrow();
        assertThat(passwordEncoder.matches("newPassword123", updatedUser.getPassword())).isTrue();
    }

    @Test
    void testResetPassword_invalidToken_throwsException() {
        assertThatThrownBy(() -> authService.resetPassword("invalid-token", "anyPass"))
                .isInstanceOf(RuntimeException.class);
    }
}
