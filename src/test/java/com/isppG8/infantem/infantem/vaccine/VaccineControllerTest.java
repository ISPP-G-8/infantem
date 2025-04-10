package com.isppG8.infantem.infantem.vaccine;

import static org.mockito.Mockito.*;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.*;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.*;

import java.time.LocalDate;
import java.util.List;

import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.mockito.Mockito;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.autoconfigure.web.servlet.WebMvcTest;
import org.springframework.http.MediaType;
import org.springframework.security.test.context.support.WithMockUser;
import org.springframework.test.context.ActiveProfiles;
import org.springframework.test.context.bean.override.mockito.MockitoBean;
import static org.springframework.security.test.web.servlet.request.SecurityMockMvcRequestPostProcessors.csrf;
import org.springframework.test.web.servlet.MockMvc;
import com.isppG8.infantem.infantem.exceptions.ResourceNotFoundException;
import com.isppG8.infantem.infantem.user.User;
import com.isppG8.infantem.infantem.user.UserService;
import com.isppG8.infantem.infantem.vaccine.dto.VaccineDTO;

@WebMvcTest(VaccineController.class)
@ActiveProfiles("test")
@WithMockUser(username = "testUser", roles = { "USER" })
public class VaccineControllerTest {

    @Autowired
    private MockMvc mockMvc;

    @MockitoBean
    private VaccineService vaccineService;

    @MockitoBean
    private UserService userService;

    private Vaccine vaccine;
    private User user;
    private final String token = "Bearer dummy-token";

    @BeforeEach
    void setUp() {
        user = new User();
        user.setId(1);
        vaccine = new Vaccine();
        vaccine.setId(1L);
        vaccine.setType("MMR");
        vaccine.setVaccinationDate(LocalDate.of(2023, 6, 1));
        Mockito.when(userService.findCurrentUser()).thenReturn(user);
    }

    @Test
    public void testGetAllVaccines() throws Exception {
        VaccineDTO vaccineDTO = new VaccineDTO(vaccine);
        when(vaccineService.getAll()).thenReturn(List.of(vaccine));

        mockMvc.perform(get("/api/v1/vaccines").header("Authorization", "Bearer " + token).with(csrf())
                .contentType(MediaType.APPLICATION_JSON)).andExpect(status().isOk())
                .andExpect(jsonPath("$[0].type").value(vaccineDTO.getType()));
    }

    @Test
    public void testGetVaccineById() throws Exception {
        VaccineDTO vaccineDTO = new VaccineDTO(vaccine);
        when(vaccineService.getById(1L)).thenReturn(vaccine);

        mockMvc.perform(get("/api/v1/vaccines/1").header("Authorization", "Bearer " + token).with(csrf())
                .contentType(MediaType.APPLICATION_JSON)).andExpect(status().isOk())
                .andExpect(jsonPath("$.type").value(vaccineDTO.getType()));
    }

    @Test
    public void testGetVaccineByIdNotFound() throws Exception {
        doThrow(new ResourceNotFoundException("Vaccine", "id", 999L)).when(vaccineService).getById(999L);
        mockMvc.perform(get("/api/v1/vaccines/999").header("Authorization", "Bearer " + token).with(csrf())
                .contentType(MediaType.APPLICATION_JSON)).andExpect(status().isNotFound());
    }

    @Test
    public void testCreateVaccine() throws Exception {
        when(vaccineService.save(Mockito.any(Vaccine.class))).thenReturn(vaccine);

        String vaccineJson = """
                    {
                        "id": 1,
                        "type": "MMR",
                        "vaccinationDate": "2023-06-01",
                        "baby": {
                            "id": 1,
                            "name": "Juan",
                            "birthDate": "2023-01-01",
                            "genre": "MALE",
                            "weight": 3.5,
                            "height": 49,
                            "headCircumference": 35,
                            "foodPreference": "Leche"
                        }
                    }
                """;

        mockMvc.perform(post("/api/v1/vaccines").header("Authorization", "Bearer " + token).with(csrf())
                .contentType(MediaType.APPLICATION_JSON).content(vaccineJson)).andExpect(status().isCreated())
                .andExpect(jsonPath("$.type").value(vaccine.getType()));
    }

    @Test
    public void testDeleteVaccine() throws Exception {
        doNothing().when(vaccineService).delete(1L);

        mockMvc.perform(delete("/api/v1/vaccines/1").header("Authorization", "Bearer " + token).with(csrf())
                .contentType(MediaType.APPLICATION_JSON)).andExpect(status().isNoContent());
    }

    @Test
    public void testDeleteVaccineNotFound() throws Exception {
        doThrow(new ResourceNotFoundException("Vaccine", "id", 999L)).when(vaccineService).delete(999L);
        mockMvc.perform(delete("/api/v1/vaccines/999").header("Authorization", "Bearer " + token).with(csrf())
                .contentType(MediaType.APPLICATION_JSON)).andExpect(status().isNotFound());
    }
}
