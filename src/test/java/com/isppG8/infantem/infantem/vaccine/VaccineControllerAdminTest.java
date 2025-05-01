package com.isppG8.infantem.infantem.vaccine;

import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.delete;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.get;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.post;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.put;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.status;
import static org.hamcrest.Matchers.is;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.jsonPath;
import static org.hamcrest.Matchers.hasSize;

import java.time.LocalDate;
import java.util.List;

import org.junit.jupiter.api.Test;
import org.mockito.Mockito;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.autoconfigure.web.servlet.WebMvcTest;
import org.springframework.test.context.bean.override.mockito.MockitoBean;
import org.springframework.boot.test.context.TestConfiguration;
import org.springframework.context.annotation.Bean;
import org.springframework.http.MediaType;
import org.springframework.security.test.context.support.WithMockUser;
import org.springframework.test.context.ActiveProfiles;
import org.springframework.test.web.servlet.MockMvc;
import static org.springframework.security.test.web.servlet.request.SecurityMockMvcRequestPostProcessors.csrf;

import com.isppG8.infantem.infantem.baby.Baby;
import com.isppG8.infantem.infantem.auth.AuthoritiesService;
import com.isppG8.infantem.infantem.exceptions.ResourceNotFoundException;

@WebMvcTest(VaccineControllerAdmin.class)
@WithMockUser(username = "testUser", roles = { "USER" })
@ActiveProfiles("test")
public class VaccineControllerAdminTest {

    @TestConfiguration
    static class TestConfig {
        @Bean
        public VaccineService vaccineService() {
            return Mockito.mock(VaccineService.class);
        }

        @Bean
        public AuthoritiesService authoritiesService() {
            return Mockito.mock(AuthoritiesService.class);
        }
    }

    @Autowired
    private MockMvc mockMvc;

    @Autowired
    private VaccineService vaccineService;

    @MockitoBean
    private AuthoritiesService authoritiesService;

    private final String token = "dummy-token";

    private Vaccine createDummyVaccine(int intid) {
        Vaccine vaccine = new Vaccine();
        Long id = Long.valueOf(intid);
        vaccine.setId(id);
        vaccine.setType("Test Vaccine");
        vaccine.setVaccinationDate(LocalDate.of(2023, 1, 1));

        Baby b = new Baby();
        b.setId(1);
        b.setName("Test Baby");
        vaccine.setBaby(b);

        return vaccine;
    }

    @Test
    public void testGetAllVaccines() throws Exception {
        Vaccine v1 = createDummyVaccine(1);
        Vaccine v2 = createDummyVaccine(2);
        List<Vaccine> vaccines = List.of(v1, v2);
        Mockito.when(vaccineService.getAll()).thenReturn(vaccines);
        Mockito.when(authoritiesService.isAdmin()).thenReturn(true);

        mockMvc.perform(get("/api/v1/admin/vaccines").header("Authorization", "Bearer " + token))
                .andExpect(status().isOk()).andExpect(jsonPath("$", hasSize(2))).andExpect(jsonPath("$[0].id", is(1)))
                .andExpect(jsonPath("$[1].id", is(2)));
        ;
    }

    @Test
    public void testGetVaccineById_Success() throws Exception {
        Vaccine vaccine = createDummyVaccine(1);
        Mockito.when(vaccineService.getById(1l)).thenReturn(vaccine);
        Mockito.when(authoritiesService.isAdmin()).thenReturn(true);
        mockMvc.perform(get("/api/v1/admin/vaccines/1").header("Authorization", "Bearer " + token))
                .andExpect(status().isOk()).andExpect(jsonPath("$.id", is(1)))
                .andExpect(jsonPath("$.type", is("Test Vaccine")));
    }

    @Test
    public void testCreateVaccine_Success() throws Exception {
        String vaccineJson = """
                {
                    "type": "Test Vaccine",
                    "vaccinationDate": "2023-01-01",
                    "baby": {"id": 1}
                }
                """;
        Vaccine savedVaccine = createDummyVaccine(1);
        Mockito.when(vaccineService.save(Mockito.any(Vaccine.class))).thenReturn(savedVaccine);
        Mockito.when(authoritiesService.isAdmin()).thenReturn(true);

        mockMvc.perform(post("/api/v1/admin/vaccines").header("Authorization", "Bearer " + token).with(csrf())
                .contentType(MediaType.APPLICATION_JSON).content(vaccineJson)).andExpect(status().isCreated())
                .andExpect(jsonPath("$.id", is(1))).andExpect(jsonPath("$.type", is("Test Vaccine")));
    }

    @Test
    public void testDeleteVaccine_Success() throws Exception {
        Mockito.doNothing().when(vaccineService).delete(1L);
        Mockito.when(authoritiesService.isAdmin()).thenReturn(true);

        mockMvc.perform(delete("/api/v1/admin/vaccines/1").header("Authorization", "Bearer " + token).with(csrf()))
                .andExpect(status().isNoContent());
    }

    @Test
    public void testDeleteVaccine_NotFound() throws Exception {
        Mockito.doThrow(new ResourceNotFoundException("Not Found")).when(vaccineService).delete(999L);
        Mockito.when(authoritiesService.isAdmin()).thenReturn(true);

        mockMvc.perform(delete("/api/v1/admin/vaccines/999").header("Authorization", "Bearer " + token).with(csrf()))
                .andExpect(status().isNotFound());
    }
}
