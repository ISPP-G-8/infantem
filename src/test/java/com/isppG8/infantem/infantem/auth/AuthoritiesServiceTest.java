package com.isppG8.infantem.infantem.auth;

import static org.junit.jupiter.api.Assertions.assertEquals;
import static org.junit.jupiter.api.Assertions.assertNotNull;
import static org.junit.jupiter.api.Assertions.assertThrows;
import static org.mockito.Mockito.when;

import java.util.Optional;

import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.mockito.Mock;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.test.context.ActiveProfiles;

import jakarta.transaction.Transactional;

@SpringBootTest
@ActiveProfiles("test")
@Transactional
class AuthoritiesServiceTest {

    @Autowired
    private AuthoritiesService authoritiesService;

    @Mock
    private AuthoritiesRepository authoritiesRepository;

    private Authorities userAuthority;
    private Authorities adminAuthority;

    @BeforeEach
    void setUp() {
        // Configurar las autoridades de prueba
        userAuthority = new Authorities();
        userAuthority.setId(1);
        userAuthority.setAuthority("user");

        adminAuthority = new Authorities();
        adminAuthority.setId(2);
        adminAuthority.setAuthority("admin");
    }

    @Test
    void testFindByAuthority_userRole() {
        // Configurar el comportamiento del repositorio mock
        when(authoritiesRepository.findByAuthority("user")).thenReturn(Optional.of(userAuthority));

        // Ejecutar el método a probar
        Authorities result = authoritiesService.findByAuthority("user");

        // Verificar resultados
        assertNotNull(result, "La autoridad no debería ser nula");
        assertEquals("user", result.getAuthority(), "La autoridad debería ser 'user'");
        assertEquals(1, result.getId(), "El ID de la autoridad debería ser 1");
    }

    @Test
    void testFindByAuthority_adminRole() {
        // Configurar el comportamiento del repositorio mock
        when(authoritiesRepository.findByAuthority("admin")).thenReturn(Optional.of(adminAuthority));

        // Ejecutar el método a probar
        Authorities result = authoritiesService.findByAuthority("admin");

        // Verificar resultados
        assertNotNull(result, "La autoridad no debería ser nula");
        assertEquals("admin", result.getAuthority(), "La autoridad debería ser 'admin'");
        assertEquals(2, result.getId(), "El ID de la autoridad debería ser 2");
    }

    @Test
    void testFindByAuthority_nonExistentRole() {
        // Configurar el comportamiento del repositorio mock para un rol que no existe
        when(authoritiesRepository.findByAuthority("non_existent")).thenReturn(Optional.empty());

        // Verificar que se lance una excepción cuando la autoridad no existe
        Exception exception = assertThrows(RuntimeException.class, () -> {
            authoritiesService.findByAuthority("non_existent");
        });

        // Verificar el mensaje de la excepción
        assertEquals("Authority does not exist", exception.getMessage(),
                "El mensaje de la excepción debería indicar que la autoridad no existe");
    }
}
