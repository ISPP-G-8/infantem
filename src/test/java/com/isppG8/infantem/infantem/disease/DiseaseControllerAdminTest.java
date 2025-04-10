package com.isppG8.infantem.infantem.disease;

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

@WebMvcTest(DiseaseControllerAdmin.class)
@WithMockUser(username = "testUser", roles = { "USER" })
@ActiveProfiles("test")
public class DiseaseControllerAdminTest {

    @TestConfiguration
    static class TestConfig {
        @Bean
        public DiseaseService diseaseService() {
            return Mockito.mock(DiseaseService.class);
        }

        @Bean
        public AuthoritiesService authoritiesService() {
            return Mockito.mock(AuthoritiesService.class);
        }
    }

    @Autowired
    private MockMvc mockMvc;

    @Autowired
    private DiseaseService diseaseService;

    @MockitoBean
    private AuthoritiesService authoritiesService;

    private final String token = "dummy-token";

    private Disease createDummyDisease(int id) {
        Disease disease = new Disease();
        disease.setId(id);
        disease.setName("Test Disease");
        disease.setStartDate(LocalDate.of(2023, 1, 1));
        disease.setEndDate(LocalDate.of(2023, 1, 3));
        disease.setSymptoms("Test symptoms");
        disease.setExtraObservations("Test observations");

        Baby b = new Baby();
        b.setId(1);
        b.setName("Test Baby");
        disease.setBaby(b);

        return disease;
    }

    @Test
    public void testGetAllDiseases() throws Exception {
        Disease d1 = createDummyDisease(1);
        Disease d2 = createDummyDisease(2);
        List<Disease> diseases = List.of(d1, d2);
        Mockito.when(diseaseService.getAll()).thenReturn(diseases);
        Mockito.when(authoritiesService.isAdmin()).thenReturn(true);

        mockMvc.perform(get("/api/v1/admin/disease").header("Authorization", "Bearer " + token))
                .andExpect(status().isOk()).andExpect(jsonPath("$", hasSize(2))).andExpect(jsonPath("$[0].id", is(1)))
                .andExpect(jsonPath("$[1].id", is(2)));
        ;
    }

    @Test
    public void testGetDiseaseById_Success() throws Exception {
        Disease disease = createDummyDisease(1);
        Mockito.when(diseaseService.getById(1l)).thenReturn(disease);
        Mockito.when(authoritiesService.isAdmin()).thenReturn(true);
        mockMvc.perform(get("/api/v1/admin/disease/1").header("Authorization", "Bearer " + token))
                .andExpect(status().isOk()).andExpect(jsonPath("$.id", is(1)))
                .andExpect(jsonPath("$.symptoms", is("Test symptoms")));
    }

    @Test
    public void testCreateDisease_Success() throws Exception {
        String diseaseJson = """
                {
                    "name": "Test Disease",
                    "startDate": "2023-01-01",
                    "endDate": "2023-01-03",
                    "symptoms": "Test symptoms",
                    "extraObservations": "Test observations",
                    "baby": {"id": 1}
                }
                """;
        Disease savedDisease = createDummyDisease(1);
        Mockito.when(diseaseService.save(Mockito.any(Disease.class))).thenReturn(savedDisease);
        Mockito.when(authoritiesService.isAdmin()).thenReturn(true);

        mockMvc.perform(post("/api/v1/admin/disease").header("Authorization", "Bearer " + token).with(csrf())
                .contentType(MediaType.APPLICATION_JSON).content(diseaseJson)).andExpect(status().isOk())
                .andExpect(jsonPath("$.id", is(1))).andExpect(jsonPath("$.symptoms", is("Test symptoms")));
    }

    @Test
    public void testUpdateDisease_Success() throws Exception {
        String diseaseJson = """
                {
                    "name": "Updated Disease",
                    "startDate": "2023-01-04",
                    "endDate": "2023-01-06",
                    "symptoms": "Updated symptoms",
                    "extraObservations": "Updated observations",
                    "baby": {"id": 1}
                }
                """;
        Disease updatedDisease = createDummyDisease(1);
        updatedDisease.setName("Updated Disease");
        updatedDisease.setStartDate(LocalDate.of(2023, 01, 04));
        updatedDisease.setEndDate(LocalDate.of(2023, 01, 06));
        updatedDisease.setSymptoms("Updated symptoms");
        updatedDisease.setExtraObservations("Updated observations");

        Mockito.when(authoritiesService.isAdmin()).thenReturn(true);
        Mockito.when(diseaseService.updateAdmin(Mockito.eq(1L), Mockito.any(Disease.class))).thenReturn(updatedDisease);

        mockMvc.perform(put("/api/v1/admin/disease/1").header("Authorization", "Bearer " + token).with(csrf())
                .contentType(MediaType.APPLICATION_JSON).content(diseaseJson)).andExpect(status().isOk())
                .andExpect(jsonPath("$.id", is(1))).andExpect(jsonPath("$.name", is("Updated Disease")))
                .andExpect(jsonPath("$.startDate", is("2023-01-04"))).andExpect(jsonPath("$.endDate", is("2023-01-06")))
                .andExpect(jsonPath("$.symptoms", is("Updated symptoms")))
                .andExpect(jsonPath("$.extraObservations", is("Updated observations")));
    }

    @Test
    public void testUpdateDisease_Invalid() throws Exception {
        String invalidJson = """
                {
                    "name": "Updated Disease",
                    "startDate": "2023-01-04",
                    "endDate": "2023-01-06",
                    "symptoms": "",
                    "extraObservations": "Updated observations",
                    "baby": {"id": 1}
                }
                """;

        Mockito.when(authoritiesService.isAdmin()).thenReturn(true);

        mockMvc.perform(put("/api/v1/admin/disease/1").header("Authorization", "Bearer " + token).with(csrf())
                .contentType(MediaType.APPLICATION_JSON).content(invalidJson)).andExpect(status().isBadRequest());
    }

    @Test
    public void testDeleteDisease_Success() throws Exception {
        Mockito.doNothing().when(diseaseService).delete(1L);
        Mockito.when(authoritiesService.isAdmin()).thenReturn(true);

        mockMvc.perform(delete("/api/v1/admin/disease/1").header("Authorization", "Bearer " + token).with(csrf()))
                .andExpect(status().isNoContent());
    }

    @Test
    public void testDeleteDisease_NotFound() throws Exception {
        Mockito.doThrow(new ResourceNotFoundException("Not Found")).when(diseaseService).delete(999L);
        Mockito.when(authoritiesService.isAdmin()).thenReturn(true);

        mockMvc.perform(delete("/api/v1/admin/disease/999").header("Authorization", "Bearer " + token).with(csrf()))
                .andExpect(status().isNotFound());
    }
}
