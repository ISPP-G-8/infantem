package com.isppG8.infantem.infantem.auth;

import com.fasterxml.jackson.databind.ObjectMapper;
import com.isppG8.infantem.infantem.auth.payload.request.EmailRequest;
import com.isppG8.infantem.infantem.auth.payload.request.ResetPasswordRequest;
import com.isppG8.infantem.infantem.auth.payload.response.MessageResponse;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.mockito.Mockito;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.autoconfigure.web.servlet.AutoConfigureMockMvc;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.http.MediaType;
import org.springframework.test.context.ActiveProfiles;
import org.springframework.test.context.bean.override.mockito.MockitoBean;
import org.springframework.test.web.servlet.MockMvc;
import org.springframework.test.web.servlet.setup.MockMvcBuilders;
import org.springframework.transaction.annotation.Transactional;

import static org.assertj.core.api.Assertions.assertThat;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.post;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.*;

@SpringBootTest
@AutoConfigureMockMvc
@ActiveProfiles("test")
@Transactional
public class AuthControllerTest {

    @Autowired
    private ObjectMapper objectMapper;

    @Autowired
    private AuthController authController;

    @MockitoBean
    private AuthService authService;

    private MockMvc mockMvc;

    @BeforeEach
    void setUp() {
        mockMvc = MockMvcBuilders.standaloneSetup(authController).build();
    }

    @Test
    void testRecoverPassword_returnsOk() throws Exception {
        EmailRequest emailRequest = new EmailRequest();
        emailRequest.setEmail("test@example.com");

        Mockito.doNothing().when(authService).initiatePasswordReset("test@example.com");

        mockMvc.perform(post("/api/v1/auth/recover-password")
                        .contentType(MediaType.APPLICATION_JSON)
                        .content(objectMapper.writeValueAsString(emailRequest)))
                .andExpect(status().isOk())
                .andExpect(jsonPath("$.message").value(
                        "Si el correo está registrado, se ha enviado un enlace para restablecer la contraseña."));
    }

    @Test
    void testRecoverPassword_withNullEmail_returnsBadRequest() throws Exception {
        EmailRequest emailRequest = new EmailRequest();
        emailRequest.setEmail(null);

        mockMvc.perform(post("/api/v1/auth/recover-password")
                        .contentType(MediaType.APPLICATION_JSON)
                        .content(objectMapper.writeValueAsString(emailRequest)))
                .andExpect(status().isBadRequest())
                .andExpect(result ->
                        assertThat(result.getResponse().getContentAsString()).contains("El email es nulo"));
    }

    @Test
    void testResetPassword_returnsOk() throws Exception {
        ResetPasswordRequest request = new ResetPasswordRequest();
        request.setToken("abc123");
        request.setNewPassword("newPass123@");

        Mockito.doNothing().when(authService).resetPassword("abc123", "newPass123@");

        mockMvc.perform(post("/api/v1/auth/reset-password")
                        .contentType(MediaType.APPLICATION_JSON)
                        .content(objectMapper.writeValueAsString(request)))
                .andExpect(status().isOk())
                .andExpect(jsonPath("$.message").value("Contraseña restablecida correctamente."));
    }

    @Test
    void testResetPassword_withNullToken_returnsBadRequest() throws Exception {
        ResetPasswordRequest request = new ResetPasswordRequest();
        request.setToken(null);
        request.setNewPassword("newPass123");

        mockMvc.perform(post("/api/v1/auth/reset-password")
                        .contentType(MediaType.APPLICATION_JSON)
                        .content(objectMapper.writeValueAsString(request)))
                .andExpect(status().isBadRequest());
    }

    @Test
    void testResetPassword_withNullPassword_returnsBadRequest() throws Exception {
        ResetPasswordRequest request = new ResetPasswordRequest();
        request.setToken("abc123");
        request.setNewPassword(null);

        mockMvc.perform(post("/api/v1/auth/reset-password")
                        .contentType(MediaType.APPLICATION_JSON)
                        .content(objectMapper.writeValueAsString(request)))
                .andExpect(status().isBadRequest());
    }
}
