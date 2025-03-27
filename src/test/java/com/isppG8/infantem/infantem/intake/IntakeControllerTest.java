package com.isppG8.infantem.infantem.intake;

import com.isppG8.infantem.infantem.baby.Baby;
import com.isppG8.infantem.infantem.exceptions.ResourceNotFoundException;
import com.isppG8.infantem.infantem.recipe.Recipe;
import org.junit.jupiter.api.Test;
import org.mockito.Mockito;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.autoconfigure.web.servlet.WebMvcTest;
import org.springframework.boot.test.context.TestConfiguration;
import org.springframework.context.annotation.Bean;
import org.springframework.http.MediaType;
import org.springframework.security.test.context.support.WithMockUser;
import org.springframework.test.context.ActiveProfiles;
import org.springframework.test.web.servlet.MockMvc;

import java.time.LocalDateTime;
import java.util.Arrays;
import java.util.Collections;
import java.util.List;

import static org.hamcrest.Matchers.hasSize;
import static org.hamcrest.Matchers.is;
import static org.springframework.security.test.web.servlet.request.SecurityMockMvcRequestPostProcessors.csrf;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.delete;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.get;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.post;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.put;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.jsonPath;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.status;

@WebMvcTest(IntakeController.class)
@WithMockUser(username = "testUser", roles = { "USER" })
@ActiveProfiles("test")
public class IntakeControllerTest {

    @TestConfiguration
    static class TestConfig {
        @Bean
        public IntakeService intakeService() {
            return Mockito.mock(IntakeService.class);
        }
    }

    @Autowired
    private MockMvc mockMvc;

    @Autowired
    private IntakeService intakeService;

    // Dummy token to simulate authentication
    private final String token = "dummy-token";

    private Intake createDummyIntake(Long id) {
        Intake intake = new Intake();
        intake.setId(id);
        intake.setDate(LocalDateTime.of(2025, 3, 23, 10, 15, 30));
        intake.setQuantity(10);
        intake.setObservations("Test observations");

        Recipe recipe = new Recipe();
        intake.setRecipes(Collections.singletonList(recipe));

        Baby baby = new Baby();
        baby.setId(1);
        intake.setBaby(baby);

        intake.setIntakeSymptom(null);

        return intake;
    }

    @Test
    public void testGetAllIntakes() throws Exception {
        Intake intake1 = createDummyIntake(1L);
        Intake intake2 = createDummyIntake(2L);
        List<Intake> intakeList = Arrays.asList(intake1, intake2);
        Mockito.when(intakeService.getAllIntakes()).thenReturn(intakeList);

        mockMvc.perform(get("/api/v1/intake").header("Authorization", "Bearer " + token)).andExpect(status().isOk())
                .andExpect(jsonPath("$", hasSize(2))).andExpect(jsonPath("$[0].id", is(1)))
                .andExpect(jsonPath("$[1].id", is(2)));
    }

    @Test
    public void testGetIntakeById() throws Exception {
        Intake intake = createDummyIntake(1L);
        Mockito.when(intakeService.getIntakeById(1L)).thenReturn(intake);

        mockMvc.perform(get("/api/v1/intake/1").header("Authorization", "Bearer " + token)).andExpect(status().isOk())
                .andExpect(jsonPath("$.id", is(1))).andExpect(jsonPath("$.observations", is("Test observations")));
    }

    @Test
    public void testCreateIntake() throws Exception {
        String intakeJson = """
                {
                    "date": "2025-03-23T10:15:30",
                    "quantity": 10,
                    "observations": "Test observations",
                    "recipes": [{"id":1}],
                    "baby": {"id": 1}
                }
                """;

        // Simulate that the service assigns an ID when saving
        Intake savedIntake = createDummyIntake(1L);
        Mockito.when(intakeService.saveIntake(Mockito.any(Intake.class))).thenReturn(savedIntake);

        mockMvc.perform(post("/api/v1/intake").header("Authorization", "Bearer " + token).with(csrf())
                .contentType(MediaType.APPLICATION_JSON).content(intakeJson)).andExpect(status().isOk())
                .andExpect(jsonPath("$.id", is(1))).andExpect(jsonPath("$.observations", is("Test observations")));
    }

    @Test
    public void testUpdateIntake() throws Exception {
        String intakeJson = """
                {
                    "date": "2025-03-23T10:15:30",
                    "quantity": 20,
                    "observations": "Updated observations",
                    "recipes": [{"id":1}],
                    "baby": {"id": 1}
                }
                """;

        Intake updatedIntake = createDummyIntake(1L);
        updatedIntake.setQuantity(20);
        updatedIntake.setObservations("Updated observations");

        Mockito.when(intakeService.updateIntake(Mockito.eq(1L), Mockito.any(Intake.class))).thenReturn(updatedIntake);

        mockMvc.perform(put("/api/v1/intake/1").header("Authorization", "Bearer " + token).with(csrf())
                .contentType(MediaType.APPLICATION_JSON).content(intakeJson)).andExpect(status().isOk())
                .andExpect(jsonPath("$.id", is(1))).andExpect(jsonPath("$.quantity", is(20)))
                .andExpect(jsonPath("$.observations", is("Updated observations")));
    }

    @Test
    public void testDeleteIntake() throws Exception {
        Mockito.doNothing().when(intakeService).deleteIntake(1L);

        mockMvc.perform(delete("/api/v1/intake/1").header("Authorization", "Bearer " + token).with(csrf()))
                .andExpect(status().isNoContent());
    }

    @Test
    public void testCreateIntake_Invalid() throws Exception {
        String invalidJson = "{}";

        mockMvc.perform(post("/api/v1/intake").header("Authorization", "Bearer " + token).with(csrf())
                .contentType(MediaType.APPLICATION_JSON).content(invalidJson)).andExpect(status().isBadRequest());
    }

    @Test
    public void testUpdateIntake_Invalid() throws Exception {
        String invalidJson = """
                {
                    "date": "2025-03-23T10:15:30",
                    "quantity": -5,
                    "observations": "",
                    "recipes": [{"id":1}],
                    "baby": {"id": 1}
                }
                """;

        mockMvc.perform(put("/api/v1/intake/1").header("Authorization", "Bearer " + token).with(csrf())
                .contentType(MediaType.APPLICATION_JSON).content(invalidJson)).andExpect(status().isBadRequest());
    }

    @Test
    public void testGetIntakeById_NotFound() throws Exception {
        Mockito.when(intakeService.getIntakeById(999L)).thenThrow(new ResourceNotFoundException("Not Found"));

        mockMvc.perform(get("/api/v1/intake/999").header("Authorization", "Bearer " + token))
                .andExpect(status().isNotFound());
    }

    @Test
    public void testDeleteIntake_NotFound() throws Exception {
        Mockito.doThrow(new ResourceNotFoundException("Not Found")).when(intakeService).deleteIntake(999L);

        mockMvc.perform(delete("/api/v1/intake/999").header("Authorization", "Bearer " + token).with(csrf()))
                .andExpect(status().isNotFound());
    }
}
