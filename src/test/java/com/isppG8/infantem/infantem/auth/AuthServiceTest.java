package com.isppG8.infantem.infantem.auth;

import static org.junit.jupiter.api.Assertions.assertEquals;
import static org.junit.jupiter.api.Assertions.assertNotNull;
import static org.junit.jupiter.api.Assertions.assertTrue;

import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.test.context.ActiveProfiles;

import com.isppG8.infantem.infantem.auth.payload.request.SignupRequest;
import com.isppG8.infantem.infantem.user.User;
import com.isppG8.infantem.infantem.user.UserService;

import jakarta.transaction.Transactional;

@SpringBootTest
@ActiveProfiles("test")
@Transactional
class AuthServiceTest {

    private AuthService authService;

    private UserService userService;

    private PasswordEncoder encoder;

    @Autowired
    public AuthServiceTest(AuthService authService, UserService userService, PasswordEncoder encoder) {
        this.authService = authService;
        this.userService = userService;
        this.encoder = encoder;
    }

    private SignupRequest request;

    @BeforeEach
    void setUpRequest() {
        request = new SignupRequest();
        request.setUsername("testUser");
        request.setPassword("password123");
        request.setName("Test");
        request.setSurname("User");
        request.setEmail("test@example.com");
        request.setCode(123456);
    }

    @Test
    void testCreateUser() {
        this.authService.createUser(request);

        // Get new user
        User newUser = userService.findByUsername(request.getUsername());

        assertNotNull(newUser, "User should be created successfully");
        assertEquals("Test", newUser.getName(), "User name should match");
        assertEquals("user", newUser.getAuthorities().getAuthority(), "User authority should be 'user'");
        assertTrue(encoder.matches(request.getPassword(), newUser.getPassword()),
                "Raw password should match the encoded password stored in the user");

    }
}
