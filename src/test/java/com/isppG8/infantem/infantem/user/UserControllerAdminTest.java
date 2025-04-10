package com.isppG8.infantem.infantem.user;

import static org.mockito.ArgumentMatchers.any;
import static org.mockito.ArgumentMatchers.anyString;
import static org.mockito.ArgumentMatchers.eq;
import static org.mockito.Mockito.*;
import static org.springframework.security.test.web.servlet.request.SecurityMockMvcRequestPostProcessors.csrf;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.*;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.*;

import java.security.SecureRandom;
import java.util.List;

import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.autoconfigure.web.servlet.WebMvcTest;
import org.springframework.http.MediaType;
import org.springframework.security.test.context.support.WithMockUser;
import org.springframework.test.context.ActiveProfiles;
import org.springframework.test.context.bean.override.mockito.MockitoBean;
import org.springframework.test.web.servlet.MockMvc;
import org.springframework.context.annotation.Bean;
import org.springframework.boot.test.context.TestConfiguration;
import org.springframework.security.authentication.AuthenticationManager;

import com.isppG8.infantem.infantem.auth.Authorities;
import com.isppG8.infantem.infantem.auth.AuthoritiesService;
import com.isppG8.infantem.infantem.auth.AuthService;
import com.isppG8.infantem.infantem.auth.jwt.JwtUtils;
import com.isppG8.infantem.infantem.user.dto.UserDTO;

@WebMvcTest(UserControllerAdmin.class)
@WithMockUser(username = "testUser", roles = { "USER" })
@ActiveProfiles("test")
public class UserControllerAdminTest {

    @Autowired
    private MockMvc mockMvc;

    @MockitoBean
    private UserService userService;

    @MockitoBean
    private JwtUtils jwtUtils;

    @MockitoBean
    private AuthoritiesService authoritiesService;

    private User user;

    final String token = "dummy-token";

    @TestConfiguration
    static class TestConfig {
        @Bean
        public AuthoritiesService authoritiesService() {
            return mock(AuthoritiesService.class);
        }

        @Bean
        public AuthService authService() {
            return mock(AuthService.class);
        }

        @Bean
        public AuthenticationManager authenticationManager() {
            return mock(AuthenticationManager.class);
        }
    }

    @BeforeEach
    void setUp() {

        Authorities authorities = new Authorities();
        authorities.setAuthority("admin");
        user = new User();
        user.setId(1);
        user.setUsername("testUser");
        user.setEmail("test@example.com");
        user.setAuthorities(authorities);

        when(userService.getUserById(1L)).thenReturn(user);
        when(authoritiesService.isAdmin()).thenReturn(true);
        when(jwtUtils.getIdFromJwtToken(anyString())).thenReturn(String.valueOf(user.getId()));

    }

    @Test
    public void testGetAllUsers() throws Exception {
        UserDTO userDTO = new UserDTO(user);
        when(userService.getAllUsers()).thenReturn(List.of(user));

        mockMvc.perform(get("/api/v1/admin/users").header("Authorization", "Bearer " + token).with(csrf()))
                .andExpect(status().isOk()).andExpect(jsonPath("$[0].id").value(userDTO.getId()))
                .andExpect(jsonPath("$[0].username").value(userDTO.getUsername()));
    }

    @Test
    public void testGetUserById() throws Exception {
        UserDTO userDTO = new UserDTO(user);
        mockMvc.perform(get("/api/v1/admin/users/1").header("Authorization", "Bearer " + token).with(csrf())
                .contentType(MediaType.APPLICATION_JSON)).andExpect(status().isOk())
                .andExpect(jsonPath("$.id").value(userDTO.getId()))
                .andExpect(jsonPath("$.username").value(userDTO.getUsername()));
    }

    @Test
    public void testGetUserByIdNotYourUser() throws Exception {

        when(authoritiesService.isAdmin()).thenReturn(false);
        mockMvc.perform(get("/api/v1/admin/users/1").header("Authorization", "Bearer " + token).with(csrf()))
                .andExpect(status().isOk());
    }

    @Test
    public void testGetUserByIdUserNotFound() throws Exception {
        // Configura el mock para que el token sea válido pero el usuario no exista
        when(jwtUtils.getIdFromJwtToken("dummy-token")).thenReturn("1");
        when(userService.getUserById(1L)).thenReturn(null);

        mockMvc.perform(get("/api/v1/admin/users/1").header("Authorization", "Bearer " + token).with(csrf())
                .contentType(MediaType.APPLICATION_JSON)).andExpect(status().isBadRequest())
                .andExpect(jsonPath("$.message").value("Something went wrong"));
    }

    @Test
    public void testUpdateUser() throws Exception {
        User updatedUser = new User();
        updatedUser.setId(1);
        updatedUser.setUsername("updatedUser");
        updatedUser.setEmail("updated@example.com");
        updatedUser.setName("Antonio");
        updatedUser.setSurname("Jiménez");
        String password = SecureRandom.getInstanceStrong().toString();
        updatedUser.setPassword(password);

        when(userService.updateUser(eq(1L), any(UserDTO.class))).thenReturn(updatedUser);

        String userJson = """
                {
                    "username": "updatedUser",
                    "email": "updated@example.com",
                    "name": "Antonio",
                    "surname": "Jiménez",
                    "password": """ + '"' + user.getPassword() + '"' + """
                    }
                """;
        ;

        mockMvc.perform(put("/api/v1/admin/users/1").header("Authorization", "Bearer " + token).with(csrf())
                .contentType(MediaType.APPLICATION_JSON).content(userJson)).andExpect(status().isOk())
                .andExpect(jsonPath("$.username").value("updatedUser"))
                .andExpect(jsonPath("$.email").value("updated@example.com"));
    }

    @Test
    public void testUpdateUserNotYourUser() throws Exception {
        when(authoritiesService.isAdmin()).thenReturn(false);
        User updatedUser = new User();
        updatedUser.setId(1);
        updatedUser.setUsername("updatedUser");
        updatedUser.setEmail("updated@example.com");
        updatedUser.setName("Antonio");
        updatedUser.setSurname("Jiménez");
        String password = SecureRandom.getInstanceStrong().toString();
        updatedUser.setPassword(password);

        String userJson = """
                {
                    "username": "updatedUser",
                    "email": "updated@example.com",
                    "name": "Antonio",
                    "surname": "Jiménez",
                    "password": """ + '"' + user.getPassword() + '"' + """
                    }
                """;
        mockMvc.perform(put("/api/v1/admin/users/1").header("Authorization", "Bearer " + token).with(csrf())
                .contentType(MediaType.APPLICATION_JSON).content(userJson)).andExpect(status().isOk());
    }

    @Test
    public void testDeleteUser() throws Exception {
        when(userService.deleteUser(1L)).thenReturn(true);

        mockMvc.perform(delete("/api/v1/admin/users/1").header("Authorization", "Bearer " + token).with(csrf()))
                .andExpect(status().isOk()).andExpect(jsonPath("$.message").value("User deleted successfully"));
    }

    @Test
    public void testDeleteUserNotYourUser() throws Exception {
        when(authoritiesService.isAdmin()).thenReturn(false);
        mockMvc.perform(delete("/api/v1/admin/users/1").header("Authorization", "Bearer " + token).with(csrf()))
                .andExpect(status().isOk());
    }

    @Test
    public void testDeleteUserSomethingWentWrong() throws Exception {
        when(userService.deleteUser(1L)).thenReturn(false);

        mockMvc.perform(delete("/api/v1/admin/users/1").header("Authorization", "Bearer " + token).with(csrf()))
                .andExpect(status().isBadRequest()).andExpect(jsonPath("$.message").value("Something went wrong"));
    }
}
