package com.isppG8.infantem.infantem.allergen;

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

@WebMvcTest(AllergenControllerAdmin.class)
@WithMockUser(username = "testUser", roles = { "USER" })
@ActiveProfiles("test")
public class AllergenControllerAdminTest {

    @TestConfiguration
    static class TestConfig {
        @Bean
        public AllergenService allergenService() {
            return Mockito.mock(AllergenService.class);
        }

        @Bean
        public AuthoritiesService authoritiesService() {
            return Mockito.mock(AuthoritiesService.class);
        }
    }

    @Autowired
    private MockMvc mockMvc;

    @Autowired
    private AllergenService allergenService;

    @MockitoBean
    private AuthoritiesService authoritiesService;

    private final String token = "dummy-token";

    private Allergen createDummyAllergen(int intid) {
        Long id = Long.valueOf(intid);
        Allergen allergen = new Allergen();
        allergen.setId(id);
        allergen.setName("Test Allergen");
        allergen.setDescription("Test description");

        Baby b = new Baby();
        b.setId(1);
        b.setName("Test Baby");
        allergen.setBabies(List.of(b));

        return allergen;
    }

    @Test
    public void testGetAllAllergens() throws Exception {
        Allergen a1 = createDummyAllergen(1);
        Allergen a2 = createDummyAllergen(2);
        List<Allergen> allergens = List.of(a1, a2);
        Mockito.when(allergenService.getAllAllergens()).thenReturn(allergens);
        Mockito.when(authoritiesService.isAdmin()).thenReturn(true);

        mockMvc.perform(get("/api/v1/admin/allergens").header("Authorization", "Bearer " + token))
                .andExpect(status().isOk()).andExpect(jsonPath("$", hasSize(2))).andExpect(jsonPath("$[0].id", is(1)))
                .andExpect(jsonPath("$[1].id", is(2)));
        ;
    }

    @Test
    public void testGetAllergenById_Success() throws Exception {
        Allergen allergen = createDummyAllergen(1);
        Mockito.when(allergenService.getAllergenById(1l)).thenReturn(allergen);
        Mockito.when(authoritiesService.isAdmin()).thenReturn(true);
        mockMvc.perform(get("/api/v1/admin/allergens/1").header("Authorization", "Bearer " + token))
                .andExpect(status().isOk()).andExpect(jsonPath("$.id", is(1)))
                .andExpect(jsonPath("$.description", is("Test description")));
    }

    @Test
    public void testCreateAllergen_Success() throws Exception {
        String allergenJson = """
                {
                    "name": "Test Allergen",
                    "description": "Test description",
                    "baby": {"id": 1}
                }
                """;
        Allergen savedAllergen = createDummyAllergen(1);
        Mockito.when(allergenService.createAllergen(Mockito.any(Allergen.class))).thenReturn(savedAllergen);
        Mockito.when(authoritiesService.isAdmin()).thenReturn(true);

        mockMvc.perform(post("/api/v1/admin/allergens").header("Authorization", "Bearer " + token).with(csrf())
                .contentType(MediaType.APPLICATION_JSON).content(allergenJson)).andExpect(status().isCreated())
                .andExpect(jsonPath("$.id", is(1))).andExpect(jsonPath("$.description", is("Test description")));
    }

    @Test
    public void testUpdateAllergen_Success() throws Exception {
        String allergenJson = """
                {
                    "name": "Updated Allergen",
                    "description": "Updated description",
                    "baby": {"id": 1}
                }
                """;
        Allergen updatedAllergen = createDummyAllergen(1);
        updatedAllergen.setName("Updated Allergen");
        updatedAllergen.setDescription("Updated description");

        Mockito.when(authoritiesService.isAdmin()).thenReturn(true);
        Mockito.when(allergenService.updateAllergen(Mockito.eq(1L), Mockito.any(Allergen.class)))
                .thenReturn(updatedAllergen);

        mockMvc.perform(put("/api/v1/admin/allergens/1").header("Authorization", "Bearer " + token).with(csrf())
                .contentType(MediaType.APPLICATION_JSON).content(allergenJson)).andExpect(status().isOk())
                .andExpect(jsonPath("$.id", is(1))).andExpect(jsonPath("$.name", is("Updated Allergen")))
                .andExpect(jsonPath("$.description", is("Updated description")));
    }

    @Test
    public void testUpdateAllergen_Invalid() throws Exception {
        String invalidJson = """
                {
                    "name": "Updated Allergen",
                    "description": "",
                    "baby": {"id": 1}
                }
                """;

        Mockito.when(authoritiesService.isAdmin()).thenReturn(true);

        mockMvc.perform(put("/api/v1/admin/allergens/1").header("Authorization", "Bearer " + token).with(csrf())
                .contentType(MediaType.APPLICATION_JSON).content(invalidJson)).andExpect(status().isBadRequest());
    }

    @Test
    public void testDeleteAllergen_Success() throws Exception {
        Mockito.doNothing().when(allergenService).deleteAllergen(1L);
        Mockito.when(authoritiesService.isAdmin()).thenReturn(true);

        mockMvc.perform(delete("/api/v1/admin/allergens/1").header("Authorization", "Bearer " + token).with(csrf()))
                .andExpect(status().isNoContent());
    }

    @Test
    public void testDeleteAllergen_NotFound() throws Exception {
        Mockito.doThrow(new ResourceNotFoundException("Not Found")).when(allergenService).deleteAllergen(999L);
        Mockito.when(authoritiesService.isAdmin()).thenReturn(true);

        mockMvc.perform(delete("/api/v1/admin/allergens/999").header("Authorization", "Bearer " + token).with(csrf()))
                .andExpect(status().isNotFound());
    }
}
