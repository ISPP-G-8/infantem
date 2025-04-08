package com.isppG8.infantem.infantem.dream;

import static org.mockito.ArgumentMatchers.*;
import static org.mockito.Mockito.*;
import static org.springframework.security.test.web.servlet.request.SecurityMockMvcRequestPostProcessors.csrf;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.*;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.*;
import static org.hamcrest.Matchers.*;

import java.time.LocalDateTime;
import java.util.List;
import org.junit.jupiter.api.Test;
import org.mockito.Mockito;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.autoconfigure.web.servlet.WebMvcTest;
import org.springframework.http.MediaType;
import org.springframework.security.test.context.support.WithMockUser;
import org.springframework.test.context.ActiveProfiles;
import org.springframework.test.context.bean.override.mockito.MockitoBean;
import org.springframework.test.web.servlet.MockMvc;
import com.isppG8.infantem.infantem.baby.Baby;
import com.isppG8.infantem.infantem.dream.dto.DreamDTO;
import com.isppG8.infantem.infantem.user.User;

@WebMvcTest(DreamController.class)
@WithMockUser(username = "testUser", roles = { "USER" })
@ActiveProfiles("test")
public class DreamControllerTest {

    @Autowired
    private MockMvc mockMvc;

    @MockitoBean
    private DreamService dreamService;

    private final String token = "dummy-token";

    @Test
    public void testGetAllDreams() throws Exception {
        Dream dream = createSampleDream();
        DreamDTO dreamDTO = new DreamDTO(dream);

        when(dreamService.getAllDreams()).thenReturn(List.of(dream));

        mockMvc.perform(get("/api/v1/dream").header("Authorization", "Bearer " + token).with(csrf())
                .contentType(MediaType.APPLICATION_JSON)).andExpect(status().isOk())
                .andExpect(jsonPath("$", hasSize(1))).andExpect(jsonPath("$[0].id", is(dreamDTO.getId().intValue())))
                .andExpect(jsonPath("$[0].dreamType", is(dreamDTO.getDreamType().toString())));
    }

    @Test
    public void testGetDreamById() throws Exception {
        Dream dream = createSampleDream();
        DreamDTO dreamDTO = new DreamDTO(dream);

        // Simular el servicio
        when(dreamService.getDreamById(1L)).thenReturn(dream);

        // Realizar la solicitud GET
        mockMvc.perform(get("/api/v1/dream/1").header("Authorization", "Bearer " + token).with(csrf())
                .contentType(MediaType.APPLICATION_JSON)).andExpect(status().isOk())
                .andExpect(jsonPath("$.id", is(dreamDTO.getId().intValue())))
                .andExpect(jsonPath("$.dreamType", is(dreamDTO.getDreamType().toString())));
    }

    @Test
    public void testCreateDream() throws Exception {
        String dreamJson = """
                    {
                        "dateStart": "2023-01-01T22:00:00",
                        "dateEnd": "2023-01-02T06:00:00",
                        "numWakeups": 1,
                        "dreamType": "DEEP",
                        "baby": {
                            "id": 1
                        }
                    }
                """;

        when(dreamService.createDream(Mockito.any(Dream.class))).thenReturn(createSampleDream());

        mockMvc.perform(post("/api/v1/dream").header("Authorization", "Bearer " + token).with(csrf())
                .contentType(MediaType.APPLICATION_JSON).content(dreamJson)).andExpect(status().isCreated())
                .andExpect(jsonPath("$.id", is(1))).andExpect(jsonPath("$.dreamType", is("DEEP")));
    }

    @Test
    public void testUpdateDream() throws Exception {
        String dreamJson = """
                    {
                        "dateStart": "2023-01-01T22:00:00",
                        "dateEnd": "2023-01-02T06:00:00",
                        "numWakeups": 1,
                        "dreamType": "DEEP",
                        "baby": {
                            "id": 1
                        }
                    }
                """;

        when(dreamService.updateDream(eq(1L), Mockito.any(Dream.class))).thenReturn(createSampleDream());

        mockMvc.perform(put("/api/v1/dream/1").header("Authorization", "Bearer " + token).with(csrf())
                .contentType(MediaType.APPLICATION_JSON).content(dreamJson)).andExpect(status().isOk())
                .andExpect(jsonPath("$.id", is(1))).andExpect(jsonPath("$.dreamType", is("DEEP")));
    }

    @Test
    public void testDeleteDream() throws Exception {
        doNothing().when(dreamService).deleteDream(1L);

        mockMvc.perform(delete("/api/v1/dream/1").header("Authorization", "Bearer " + token).with(csrf())
                .contentType(MediaType.APPLICATION_JSON)).andExpect(status().isNoContent());
    }

    @Test
    public void testGetAllDreamsEmpty() throws Exception {
        // Simular el servicio
        when(dreamService.getAllDreams()).thenReturn(List.of());

        // Realizar la solicitud GET
        mockMvc.perform(get("/api/v1/dream").header("Authorization", "Bearer " + token).with(csrf())
                .contentType(MediaType.APPLICATION_JSON)).andExpect(status().isOk())
                .andExpect(jsonPath("$", hasSize(0)));
    }

    private Dream createSampleDream() {

        User user = new User();
        user.setId(1);

        Baby baby = new Baby();
        baby.setId(1);
        baby.setUsers(List.of(user));

        Dream dream = new Dream();
        dream.setId(1L);
        dream.setDateStart(LocalDateTime.of(2023, 1, 1, 22, 0));
        dream.setDateEnd(LocalDateTime.of(2023, 1, 2, 6, 0));
        dream.setNumWakeups(1);
        dream.setDreamType(DreamType.DEEP);
        dream.setBaby(baby);

        return dream;
    }
}
