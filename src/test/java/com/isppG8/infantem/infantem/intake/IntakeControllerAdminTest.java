package com.isppG8.infantem.infantem.intake;

import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.delete;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.get;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.post;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.put;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.status;
import static org.hamcrest.Matchers.is;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.jsonPath;
import static org.hamcrest.Matchers.hasSize;

import java.time.LocalDateTime;
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
import com.isppG8.infantem.infantem.recipe.Recipe;
import com.isppG8.infantem.infantem.auth.AuthoritiesService;
import com.isppG8.infantem.infantem.exceptions.ResourceNotFoundException;

@WebMvcTest(IntakeControllerAdmin.class)
@WithMockUser(username = "testUser", roles = { "USER" })
@ActiveProfiles("test")
public class IntakeControllerAdminTest {

    @TestConfiguration
    static class TestConfig {
        @Bean
        public IntakeService intakeService() {
            return Mockito.mock(IntakeService.class);
        }

        @Bean
        public AuthoritiesService authoritiesService() {
            return Mockito.mock(AuthoritiesService.class);
        }
    }

    @Autowired
    private MockMvc mockMvc;

    @Autowired
    private IntakeService intakeService;

    @Autowired
    private AuthoritiesService authoritiesService;

    private final String token = "dummy-token";

    private Intake createDummyIntake(int intid) {
        Long id = Long.valueOf(intid);
        Intake intake = new Intake();
        intake.setId(id);
        intake.setQuantity(1);
        intake.setDate(LocalDateTime.of(2023, 1, 1, 0, 0, 0));
        intake.setObservations("Test observations");

        Baby b = new Baby();
        b.setId(1);
        b.setName("Test Baby");
        intake.setBaby(b);

        Recipe r = new Recipe();
        r.setId(1L);
        r.setName("Test recipe");
        intake.setRecipes(List.of(r));

        return intake;
    }

    @Test
    public void testGetAllIntakes() throws Exception {
        Intake i1 = createDummyIntake(1);
        Intake i2 = createDummyIntake(2);
        List<Intake> intakes = List.of(i1, i2);
        Mockito.when(intakeService.getAllIntakesAdmin()).thenReturn(intakes);
        Mockito.when(authoritiesService.isAdmin()).thenReturn(true);

        mockMvc.perform(get("/api/v1/admin/intake").header("Authorization", "Bearer " + token))
                .andExpect(status().isOk()).andExpect(jsonPath("$", hasSize(2))).andExpect(jsonPath("$[0].id", is(1)))
                .andExpect(jsonPath("$[1].id", is(2)));
        ;
    }

    @Test
    public void testGetIntakeById_Success() throws Exception {
        Intake intake = createDummyIntake(1);
        Mockito.when(intakeService.getIntakeByIdAdmin(1l)).thenReturn(intake);
        Mockito.when(authoritiesService.isAdmin()).thenReturn(true);
        mockMvc.perform(get("/api/v1/admin/intake/1").header("Authorization", "Bearer " + token))
                .andExpect(status().isOk()).andExpect(jsonPath("$.id", is(1)))
                .andExpect(jsonPath("$.observations", is("Test observations")));
    }

    @Test
    public void testCreateIntake_Success() throws Exception {
        String intakeJson = """
                                 {
                                     "name": "Test Intake",
                                     "date": "2023-01-01T00:00:00",
                                     "observations": "Test observations",
                "quantity": "2",
                                     "baby": {"id": 1},
                       "recipes": [{"id": 1}]
                                 }
                                 """;
        Intake savedIntake = createDummyIntake(1);
        Mockito.when(intakeService.saveIntakeAdmin(Mockito.any(Intake.class))).thenReturn(savedIntake);
        Mockito.when(authoritiesService.isAdmin()).thenReturn(true);

        mockMvc.perform(post("/api/v1/admin/intake").header("Authorization", "Bearer " + token).with(csrf())
                .contentType(MediaType.APPLICATION_JSON).content(intakeJson)).andExpect(status().isOk())
                .andExpect(jsonPath("$.id", is(1))).andExpect(jsonPath("$.observations", is("Test observations")));
    }

    @Test
    public void testUpdateIntake_Success() throws Exception {
        String intakeJson = """
                             {
                                 "name": "Updated Intake",
                                 "date": "2023-01-04T00:00:00",
                   	      "quantity": "2",
                                 "observations": "Updated observations",
                                 "baby": {"id": 1},
                "recipes": [{"id": 1}]

                             }
                             """;
        Intake updatedIntake = createDummyIntake(1);
        updatedIntake.setQuantity(2);
        updatedIntake.setDate(LocalDateTime.of(2023, 01, 04, 0, 0, 0));
        updatedIntake.setObservations("Updated observations");

        Mockito.when(authoritiesService.isAdmin()).thenReturn(true);
        Mockito.when(intakeService.updateIntakeAdmin(Mockito.eq(1L), Mockito.any(Intake.class)))
                .thenReturn(updatedIntake);

        mockMvc.perform(put("/api/v1/admin/intake/1").header("Authorization", "Bearer " + token).with(csrf())
                .contentType(MediaType.APPLICATION_JSON).content(intakeJson)).andExpect(status().isOk())
                .andExpect(jsonPath("$.id", is(1))).andExpect(jsonPath("$.quantity", is(2)))
                .andExpect(jsonPath("$.observations", is("Updated observations")));
    }

    @Test
    public void testUpdateIntake_Invalid() throws Exception {
        String invalidJson = """
                {
                    "name": "Updated Intake",
                    "date": "2023-01-04T00:00:00",
                    "observations": "",
                    "baby": {"id": 1}
                }
                """;

        Mockito.when(authoritiesService.isAdmin()).thenReturn(true);

        mockMvc.perform(put("/api/v1/admin/intake/1").header("Authorization", "Bearer " + token).with(csrf())
                .contentType(MediaType.APPLICATION_JSON).content(invalidJson)).andExpect(status().isBadRequest());
    }

    @Test
    public void testDeleteIntake_Success() throws Exception {
        Mockito.doNothing().when(intakeService).deleteIntakeAdmin(1L);
        Mockito.when(authoritiesService.isAdmin()).thenReturn(true);

        mockMvc.perform(delete("/api/v1/admin/intake/1").header("Authorization", "Bearer " + token).with(csrf()))
                .andExpect(status().isNoContent());
    }

    @Test
    public void testDeleteIntake_NotFound() throws Exception {
        Mockito.doThrow(new ResourceNotFoundException("Not Found")).when(intakeService).deleteIntakeAdmin(999L);
        Mockito.when(authoritiesService.isAdmin()).thenReturn(true);

        mockMvc.perform(delete("/api/v1/admin/intake/999").header("Authorization", "Bearer " + token).with(csrf()))
                .andExpect(status().isNotFound());
    }
}
