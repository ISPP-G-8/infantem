package com.isppG8.infantem.infantem.baby;

import java.time.LocalDate;
import java.util.Arrays;
import java.util.List;

import org.junit.jupiter.api.Test;
import org.mockito.Mockito;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.autoconfigure.web.servlet.WebMvcTest;
import org.springframework.boot.test.context.TestConfiguration;
import org.springframework.context.annotation.Bean;
import org.springframework.http.MediaType;
import org.springframework.security.test.context.support.WithMockUser;
import org.springframework.test.web.servlet.MockMvc;

import com.isppG8.infantem.infantem.baby.dto.BabyDTO;
import com.isppG8.infantem.infantem.exceptions.ResourceNotFoundException;

import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.delete;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.get;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.post;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.put;
import static org.hamcrest.Matchers.hasSize;
import static org.hamcrest.Matchers.is;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.jsonPath;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.status;
import static org.springframework.security.test.web.servlet.request.SecurityMockMvcRequestPostProcessors.csrf;

@WebMvcTest(BabyController.class)
@WithMockUser(username = "testUser", roles = { "USER" })
public class BabyControllerTest {

    @TestConfiguration
    static class TestConfig {
        @Bean
        public BabyService babyService() {
            return Mockito.mock(BabyService.class);
        }
    }

    @Autowired
    private MockMvc mockMvc;

    @Autowired
    private BabyService babyService;

    private final String token = "dummy-token";

    private Baby createDummyBaby(Integer id) {
        Baby baby = new Baby();
        baby.setId(id);
        baby.setName("Test baby");
        baby.setBirthDate(LocalDate.of(2025, 3, 23));
        baby.setGenre(Genre.MALE);
        baby.setWeight(10.0);
        baby.setHeight(10);
        baby.setCephalicPerimeter(10);
        baby.setFoodPreference("Test food preference");
        return baby;
    }

    private BabyDTO createDummyBabyDTO(Integer id) {
        BabyDTO baby = new BabyDTO();
        baby.setId(id);
        baby.setName("Test baby");
        baby.setBirthDate(LocalDate.of(2025, 3, 23));
        baby.setGenre(Genre.MALE);
        baby.setWeight(10.0);
        baby.setHeight(10);
        baby.setCephalicPerimeter(10);
        baby.setFoodPreference("Test food preference");
        return baby;
    }

    @Test
    public void TestFindBabies() throws Exception {
        Baby b1 = createDummyBaby(1);
        Baby b2 = createDummyBaby(2);
        List<Baby> babies = Arrays.asList(b1, b2);
        Mockito.when(babyService.findBabiesByUser()).thenReturn(babies);

        mockMvc.perform(get("/api/v1/baby").header("Authorization", "Bearer " + token)).andExpect(status().isOk())
                .andExpect(jsonPath("$", hasSize(2))).andExpect(jsonPath("$[0].id", is(1)))
                .andExpect(jsonPath("$[1].id", is(2)));
    }

    @Test
    public void TestFindById() throws Exception {
        Baby b1 = createDummyBaby(1);
        Mockito.when(babyService.findById(1)).thenReturn(b1);

        mockMvc.perform(get("/api/v1/baby/1").header("Authorization", "Bearer " + token)).andExpect(status().isOk())
                .andExpect(jsonPath("$.id", is(1))).andExpect(jsonPath("$.foodPreference", is("Test food preference")));
    }

    @Test
    public void TestCreateBaby() throws Exception {
        String babyJson = """
                {
                    "name": "Test baby",
                    "birthDate": "2025-03-23",
                    "genre": "MALE",
                    "weight": 10.0,
                    "height": 10,
                    "cephalicPerimeter": 10,
                    "foodPreference": "Test food preference"
                }
                """;
        Baby savedBaby = createDummyBaby(1);
        Mockito.when(babyService.createBaby(Mockito.any(BabyDTO.class))).thenReturn(savedBaby);

        mockMvc.perform(post("/api/v1/baby").header("Authorization", "Bearer " + token).with(csrf())
                .contentType(MediaType.APPLICATION_JSON).content(babyJson)).andExpect(status().isCreated())
                .andExpect(jsonPath("$.id", is(1))).andExpect(jsonPath("$.foodPreference", is("Test food preference")));
    }

    @Test
    public void TestUpdateBaby() throws Exception {
        String babyJson = """
                {
                    "name": "Test baby 2.0",
                    "birthDate": "2025-03-23",
                    "genre": "MALE",
                    "weight": 20.0,
                    "height": 10,
                    "cephalicPerimeter": 10,
                    "foodPreference": "Updated food preference"
                }
                """;
        BabyDTO updatedBaby = createDummyBabyDTO(1);
        updatedBaby.setName("Test baby 2.0");
        updatedBaby.setWeight(20.0);
        updatedBaby.setFoodPreference("Updated food preference");

        Baby returnedBaby = createDummyBaby(1);
        returnedBaby.setName("Test baby 2.0");
        returnedBaby.setWeight(20.0);
        returnedBaby.setFoodPreference("Updated food preference");

        Mockito.when(babyService.updateBaby(Mockito.eq(1), Mockito.any(BabyDTO.class))).thenReturn(returnedBaby);

        mockMvc.perform(put("/api/v1/baby/1").header("Authorization", "Bearer " + token).with(csrf())
                .contentType(MediaType.APPLICATION_JSON).content(babyJson)).andExpect(status().isOk())
                .andExpect(jsonPath("$.id", is(1))).andExpect(jsonPath("$.name", is("Test baby 2.0")))
                .andExpect(jsonPath("$.weight", is(20.0)))
                .andExpect(jsonPath("$.foodPreference", is("Updated food preference")));
    }

    @Test
    public void testDeleteBaby() throws Exception {
        Mockito.doNothing().when(babyService).deleteBaby(1);

        mockMvc.perform(delete("/api/v1/baby/1").header("Authorization", "Bearer " + token).with(csrf()))
                .andExpect(status().isNoContent());
    }

    @Test
    public void TestCreateBaby_Invalid() throws Exception {
        String invalidJson = """
                {
                }
                """;

        mockMvc.perform(post("/api/v1/baby").header("Authorization", "Bearer " + token).with(csrf())
                .contentType(MediaType.APPLICATION_JSON).content(invalidJson)).andExpect(status().isBadRequest());
    }

    @Test
    public void TestUpdateBaby_Invalid() throws Exception {
        String invalidJson = """
                {
                    "name": "Test baby 2.0",
                    "birthDate": "2025-03-23",
                    "genre": "MALE",
                    "weight": -20.0,
                    "height": -10,
                    "cephalicPerimeter": 10,
                    "foodPreference": "Updated food preference",
                    "allergens": [
                        { "id": 1 },
                        { "id": 2 }
                    ]
                }
                """;

        mockMvc.perform(put("/api/v1/baby/1").header("Authorization", "Bearer " + token).with(csrf())
                .contentType(MediaType.APPLICATION_JSON).content(invalidJson)).andExpect(status().isBadRequest());
    }

    @Test
    public void TestGetBabyById_NotFound() throws Exception {
        Mockito.when(babyService.findById(999)).thenThrow(new ResourceNotFoundException("Not Found"));

        mockMvc.perform(get("/api/v1/baby/999").header("Authorization", "Bearer " + token))
                .andExpect(status().isNotFound());
    }

    @Test
    public void TestDeleteBaby_NotFound() throws Exception {
        Mockito.doThrow(new ResourceNotFoundException("Not Found")).when(babyService).deleteBaby(999);

        mockMvc.perform(delete("/api/v1/baby/999").header("Authorization", "Bearer " + token).with(csrf()))
                .andExpect(status().isNotFound());
    }

}
