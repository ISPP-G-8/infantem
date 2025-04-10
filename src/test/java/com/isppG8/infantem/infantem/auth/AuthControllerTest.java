package com.isppG8.infantem.infantem.auth;

import static org.assertj.core.api.Assertions.assertThat;
import static org.mockito.ArgumentMatchers.any;
import static org.mockito.Mockito.doNothing;
import static org.mockito.Mockito.doThrow;
import static org.mockito.Mockito.when;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.get;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.post;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.jsonPath;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.status;

import java.util.Collections;

import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.autoconfigure.web.servlet.AutoConfigureMockMvc;
import org.springframework.boot.test.autoconfigure.web.servlet.WebMvcTest;
import org.springframework.http.MediaType;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.BadCredentialsException;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.authority.SimpleGrantedAuthority;
import org.springframework.test.context.ActiveProfiles;
import org.springframework.test.context.bean.override.mockito.MockitoBean;
import org.springframework.test.web.servlet.MockMvc;

import com.fasterxml.jackson.databind.ObjectMapper;
import com.isppG8.infantem.infantem.auth.email.EmailValidationService;
import com.isppG8.infantem.infantem.auth.jwt.JwtUtils;
import com.isppG8.infantem.infantem.auth.payload.request.EmailRequest;
import com.isppG8.infantem.infantem.auth.payload.request.LoginRequest;
import com.isppG8.infantem.infantem.auth.payload.request.ResetPasswordRequest;
import com.isppG8.infantem.infantem.auth.payload.request.SignupRequest;
import com.isppG8.infantem.infantem.config.services.UserDetailsImpl;
import com.isppG8.infantem.infantem.config.services.UserDetailsServiceImpl;
import com.isppG8.infantem.infantem.user.User;
import com.isppG8.infantem.infantem.user.UserService;

@WebMvcTest(AuthController.class)
@AutoConfigureMockMvc(addFilters = false)  // Esta es una forma sencilla de deshabilitar Spring Security para tests
@ActiveProfiles("test")
public class AuthControllerTest {

    @Autowired
    private MockMvc mockMvc;

    @Autowired
    private ObjectMapper objectMapper;

    @MockitoBean
    private AuthService authService;
    
    @MockitoBean
    private UserService userService;
    
    @MockitoBean
    private JwtUtils jwtUtils;
    
    @MockitoBean
    private AuthenticationManager authenticationManager;
    
    @MockitoBean
    private EmailValidationService emailValidationService;
    
    @MockitoBean
    private UserDetailsServiceImpl userDetailsService;

    private User testUser;
    private Authentication authentication;
    private UserDetailsImpl userDetails;

    @BeforeEach
    void setUp() {
        // Configurar usuario de prueba
        testUser = new User();
        testUser.setId(1);
        testUser.setUsername("testuser");
        testUser.setPassword("Password123!");
        testUser.setName("Test");
        testUser.setSurname("User");
        testUser.setEmail("test@example.com");
        
        // Configurar autoridad
        Authorities authority = new Authorities();
        authority.setId(1);
        authority.setAuthority("user");
        testUser.setAuthorities(authority);
        
        // Configurar UserDetails
        userDetails = new UserDetailsImpl(
            testUser.getId(),
            testUser.getUsername(),
            testUser.getPassword(),
            Collections.singletonList(new SimpleGrantedAuthority(authority.getAuthority()))
        );
        
        // Configurar Authentication
        authentication = org.mockito.Mockito.mock(Authentication.class);
        when(authentication.getPrincipal()).thenReturn(userDetails);
    }

    @Test
    void testSignin_success() throws Exception {
        // Configurar request
        LoginRequest loginRequest = new LoginRequest();
        loginRequest.setUsername("testuser");
        loginRequest.setPassword("Password123!");
        
        // Configurar mocks
        when(authenticationManager.authenticate(any(UsernamePasswordAuthenticationToken.class)))
            .thenReturn(authentication);
        when(jwtUtils.generateJwtToken(authentication)).thenReturn("test-jwt-token");
        
        // Ejecutar y verificar
        mockMvc.perform(post("/api/v1/auth/signin")
            .contentType(MediaType.APPLICATION_JSON)
            .content(objectMapper.writeValueAsString(loginRequest)))
            .andExpect(status().isOk())
            .andExpect(jsonPath("$.token").value("test-jwt-token"))
            .andExpect(jsonPath("$.id").value(testUser.getId()))
            .andExpect(jsonPath("$.username").value(testUser.getUsername()))
            .andExpect(jsonPath("$.roles[0]").value("user"));
    }
    
    @Test
    void testSignin_invalidCredentials() throws Exception {
        // Configurar request
        LoginRequest loginRequest = new LoginRequest();
        loginRequest.setUsername("testuser");
        loginRequest.setPassword("wrongpassword");
        
        // Configurar mocks
        when(authenticationManager.authenticate(any(UsernamePasswordAuthenticationToken.class)))
            .thenThrow(new BadCredentialsException("Bad credentials"));
        
        // Ejecutar y verificar
        mockMvc.perform(post("/api/v1/auth/signin")
            .contentType(MediaType.APPLICATION_JSON)
            .content(objectMapper.writeValueAsString(loginRequest)))
            .andExpect(status().isBadRequest())
            .andExpect(jsonPath("$.message").value("Bad Credentials!"));
    }

    
    @Test
    void testGetAuthenticatedUser_noToken() throws Exception {
        // Ejecutar y verificar
        mockMvc.perform(get("/api/v1/auth/me"))
            .andExpect(status().isBadRequest())
            .andExpect(jsonPath("$.message").value("Bad Credentials!"));
    }
    
    @Test
    void testGetAuthenticatedUser_invalidToken() throws Exception {
        // Configurar mocks
        when(jwtUtils.validateJwtToken("invalid-token")).thenReturn(false);
        
        // Ejecutar y verificar
        mockMvc.perform(get("/api/v1/auth/me")
            .header("Authorization", "Bearer invalid-token"))
            .andExpect(status().isBadRequest())
            .andExpect(jsonPath("$.message").value("Bad Credentials!"));
    }
    
    @Test
    void testValidateToken_valid() throws Exception {
        // Configurar mocks
        when(jwtUtils.validateJwtToken("valid-token")).thenReturn(true);
        
        // Ejecutar y verificar
        mockMvc.perform(get("/api/v1/auth/validate")
            .param("token", "valid-token"))
            .andExpect(status().isOk())
            .andExpect(jsonPath("$").value(true));
    }
    
    @Test
    void testValidateToken_invalid() throws Exception {
        // Configurar mocks
        when(jwtUtils.validateJwtToken("invalid-token")).thenReturn(false);
        
        // Ejecutar y verificar
        mockMvc.perform(get("/api/v1/auth/validate")
            .param("token", "invalid-token"))
            .andExpect(status().isOk())
            .andExpect(jsonPath("$").value(false));
    }
    
    @Test
    void testSignup_success() throws Exception {
        // Configurar request
        SignupRequest signupRequest = new SignupRequest();
        signupRequest.setUsername("newuser");
        signupRequest.setPassword("Password123!");
        signupRequest.setName("New");
        signupRequest.setSurname("User");
        signupRequest.setEmail("new@example.com");
        signupRequest.setCode(123456);
        
        // Configurar mocks
        when(userService.findByUsername("newuser")).thenReturn(null);
        when(userService.findByEmail("new@example.com")).thenReturn(null);
        when(emailValidationService.validateCode("new@example.com", 123456)).thenReturn(true);
        doNothing().when(authService).createUser(any(SignupRequest.class));
        when(authenticationManager.authenticate(any(UsernamePasswordAuthenticationToken.class)))
            .thenReturn(authentication);
        when(jwtUtils.generateJwtToken(any(Authentication.class))).thenReturn("new-jwt-token");
        
        // Ejecutar y verificar
        mockMvc.perform(post("/api/v1/auth/signup")
            .contentType(MediaType.APPLICATION_JSON)
            .content(objectMapper.writeValueAsString(signupRequest)))
            .andExpect(status().isOk())
            .andExpect(jsonPath("$.token").value("new-jwt-token"))
            .andExpect(jsonPath("$.username").value(testUser.getUsername()));
    }
    
    @Test
    void testSignup_usernameExists() throws Exception {
        // Configurar request
        SignupRequest signupRequest = new SignupRequest();
        signupRequest.setUsername("existinguser");
        signupRequest.setPassword("Password123!");
        signupRequest.setName("New");
        signupRequest.setSurname("User");
        signupRequest.setEmail("new@example.com");
        signupRequest.setCode(123456);
        
        // Configurar mocks
        when(userService.findByUsername("existinguser")).thenReturn(testUser);
        when(userService.findByEmail("new@example.com")).thenReturn(null);
        
        // Ejecutar y verificar
        mockMvc.perform(post("/api/v1/auth/signup")
            .contentType(MediaType.APPLICATION_JSON)
            .content(objectMapper.writeValueAsString(signupRequest)))
            .andExpect(status().isBadRequest())
            .andExpect(jsonPath("$.message").value("Ese usuario ya está siendo utilizado"));
    }
    
    @Test
    void testSignup_emailExists() throws Exception {
        // Configurar request
        SignupRequest signupRequest = new SignupRequest();
        signupRequest.setUsername("newuser");
        signupRequest.setPassword("Password123!");
        signupRequest.setName("New");
        signupRequest.setSurname("User");
        signupRequest.setEmail("test@example.com");
        signupRequest.setCode(123456);
        
        // Configurar mocks
        when(userService.findByUsername("newuser")).thenReturn(null);
        when(userService.findByEmail("test@example.com")).thenReturn(testUser);
        
        // Ejecutar y verificar
        mockMvc.perform(post("/api/v1/auth/signup")
            .contentType(MediaType.APPLICATION_JSON)
            .content(objectMapper.writeValueAsString(signupRequest)))
            .andExpect(status().isBadRequest())
            .andExpect(jsonPath("$.message").value("Ese email ya está siendo utilizado"));
    }
    
    @Test
    void testSignup_invalidCode() throws Exception {
        // Configurar request
        SignupRequest signupRequest = new SignupRequest();
        signupRequest.setUsername("newuser");
        signupRequest.setPassword("Password123!");
        signupRequest.setName("New");
        signupRequest.setSurname("User");
        signupRequest.setEmail("new@example.com");
        signupRequest.setCode(123456);
        
        // Configurar mocks
        when(userService.findByUsername("newuser")).thenReturn(null);
        when(userService.findByEmail("new@example.com")).thenReturn(null);
        when(emailValidationService.validateCode("new@example.com", 123456)).thenReturn(false);
        
        // Ejecutar y verificar
        mockMvc.perform(post("/api/v1/auth/signup")
            .contentType(MediaType.APPLICATION_JSON)
            .content(objectMapper.writeValueAsString(signupRequest)))
            .andExpect(status().isBadRequest())
            .andExpect(jsonPath("$.message").value("Error: Wrong validation code"));
    }
    
    @Test
    void testGenerateCode_success() throws Exception {
        // Configurar request
        EmailRequest emailRequest = new EmailRequest();
        emailRequest.setEmail("test@example.com");
        emailRequest.setUsername("testuser");
        
        // Configurar mocks
        doNothing().when(emailValidationService).createEmailValidation(any(EmailRequest.class));
        
        // Ejecutar y verificar
        mockMvc.perform(post("/api/v1/auth/email")
            .contentType(MediaType.APPLICATION_JSON)
            .content(objectMapper.writeValueAsString(emailRequest)))
            .andExpect(status().isOk())
            .andExpect(jsonPath("$.message").value("Code sent successfully!"));
    }
    
    @Test
    void testGenerateCode_missingData() throws Exception {
        // Configurar request con datos incompletos
        EmailRequest emailRequest = new EmailRequest();
        emailRequest.setEmail("test@example.com");
        emailRequest.setUsername(null);
        
        // Ejecutar y verificar
        mockMvc.perform(post("/api/v1/auth/email")
            .contentType(MediaType.APPLICATION_JSON)
            .content(objectMapper.writeValueAsString(emailRequest)))
            .andExpect(status().isBadRequest())
            .andExpect(jsonPath("$.message").value("Validation failed"));
    }
    
    @Test
    void testGenerateCode_serviceError() throws Exception {
        // Configurar request
        EmailRequest emailRequest = new EmailRequest();
        emailRequest.setEmail("test@example.com");
        emailRequest.setUsername("testuser");
        
        // Configurar mocks para lanzar excepción
        doThrow(new RuntimeException("Email service error")).when(emailValidationService).createEmailValidation(any(EmailRequest.class));
        
        // Ejecutar y verificar
        mockMvc.perform(post("/api/v1/auth/email")
            .contentType(MediaType.APPLICATION_JSON)
            .content(objectMapper.writeValueAsString(emailRequest)))
            .andExpect(status().isBadRequest())
            .andExpect(jsonPath("$.message").value("Email service error"));
    }
    
    @Test
    void testRecoverPassword_returnsOk() throws Exception {
        EmailRequest emailRequest = new EmailRequest();
        emailRequest.setEmail("test@example.com");

        doNothing().when(authService).initiatePasswordReset("test@example.com");

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
                .andExpect(result -> assertThat(result.getResponse().getContentAsString()).contains("El email es nulo"));
    }

    @Test
    void testResetPassword_returnsOk() throws Exception {
        ResetPasswordRequest request = new ResetPasswordRequest();
        request.setToken("abc123");
        request.setNewPassword("newPass123@");

        doNothing().when(authService).resetPassword("abc123", "newPass123@");

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
