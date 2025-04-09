package com.isppG8.infantem.infantem.advertisement;

import static org.hamcrest.Matchers.*;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.*;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.*;

import java.util.Arrays;
import java.util.List;

import org.junit.jupiter.api.Test;
import org.mockito.Mockito;
import org.springframework.boot.test.autoconfigure.web.servlet.AutoConfigureMockMvc;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.test.context.ActiveProfiles;
import org.springframework.transaction.annotation.Transactional;


import org.springframework.boot.test.context.TestConfiguration;
import org.springframework.context.annotation.Bean;
import org.springframework.security.test.context.support.WithMockUser;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.test.web.servlet.MockMvc;

@SpringBootTest
@ActiveProfiles("test")
@Transactional
@AutoConfigureMockMvc
@WithMockUser(username = "testUser", roles = { "USER" })
public class AdvertisementControllerTest {

    @TestConfiguration
    static class TestConfig {
        @Bean
        public AdvertisementService advertisementService() {
            return Mockito.mock(AdvertisementService.class);
        }
    }

    @Autowired
    private MockMvc mockMvc;

    @Autowired
    private AdvertisementService advertisementService;

    private final String token = "advert-token";

    private Advertisement createAdvertisement(Long id) {
        Advertisement advertisement = new Advertisement();
        advertisement.setId(id);
        advertisement.setCompanyName("Test Company");
        advertisement.setTitle("Test Title");
        advertisement.setTargetUrl("http://test.com");
        advertisement.setPhotoRoute("test.jpg");
        advertisement.setTimeSeen(0);
        advertisement.setTotalClicks(0);
        advertisement.setMaxMinutes(10);
        advertisement.setIsCompleted(false);
        return advertisement;
    }

    private Advertisement createAdvertisementByCompanyName(String companyName) {
        Advertisement advertisement = new Advertisement();
        advertisement.setId(1L);
        advertisement.setCompanyName(companyName);
        advertisement.setTitle("Test Title");
        advertisement.setTargetUrl("http://test.com");
        advertisement.setPhotoRoute("test.jpg");
        advertisement.setTimeSeen(0);
        advertisement.setTotalClicks(0);
        advertisement.setMaxMinutes(10);
        advertisement.setIsCompleted(false);
        return advertisement;
    }

    @Test
    public void testGetAllAdvertisements() throws Exception {
        Advertisement advertisement1 = createAdvertisement(1L);
        Advertisement advertisement2 = createAdvertisement(2L);
        List<Advertisement> advertisementList = Arrays.asList(advertisement1, advertisement2);
        Mockito.when(advertisementService.getAllAdvertisements()).thenReturn(advertisementList);

        mockMvc.perform(get("/api/v1/advertisements").header("Authorization", "Bearer " + token))
                .andExpect(status().isOk()).andExpect(jsonPath("$", hasSize(2))).andExpect(jsonPath("$[0].id", is(1)))
                .andExpect(jsonPath("$[1].id", is(2)));
    }

    @Test
    public void testGestAdvertisementById() throws Exception {
        Advertisement advertisement1 = createAdvertisement(1L);
        Mockito.when(advertisementService.getAdvertisementById(1L)).thenReturn(advertisement1);

        mockMvc.perform(get("/api/v1/advertisements/1").header("Authorization", "Bearer " + token))
                .andExpect(status().isOk()).andExpect(jsonPath("$.id", is(1)));
    }

    @Test
    public void testGestAdvertisementByCompanyName() throws Exception {
        Advertisement advertisement1 = createAdvertisementByCompanyName("Company");
        Mockito.when(advertisementService.getAdvertisementByCompanyName("Company"))
                .thenReturn(Arrays.asList(advertisement1));

        mockMvc.perform(get("/api/v1/advertisements/companyName/Company").header("Authorization", "Bearer " + token))
                .andExpect(status().isOk()).andExpect(jsonPath("$[0].companyName", is("Company")));
    }

    @Test
    public void testGetAdvertisementToShow() throws Exception {
        Advertisement advertisement1 = createAdvertisement(1L);
        Mockito.when(advertisementService.getAdvertisementToShow()).thenReturn(java.util.Optional.of(advertisement1));

        mockMvc.perform(get("/api/v1/advertisements/toShow").header("Authorization", "Bearer " + token))
                .andExpect(status().isOk()).andExpect(jsonPath("$.id", is(1)));
    }

    @Test
    public void testUpdateAdvertisement() throws Exception {
        Advertisement updatedAdvertisement = createAdvertisement(1L);
        updatedAdvertisement.setCompanyName("Updated Company");

        Mockito.when(advertisementService.updateAdvertisement(Mockito.eq(1L), Mockito.any(Advertisement.class)))
                .thenReturn(updatedAdvertisement);

        mockMvc.perform(put("/api/v1/advertisements/1").header("Authorization", "Bearer " + token)
                .contentType("application/json").content("{\"companyName\":\"Updated Company\"}"))
                .andExpect(status().isOk()).andExpect(jsonPath("$.companyName", is("Updated Company")));

        Mockito.verify(advertisementService, Mockito.times(1)).updateAdvertisement(Mockito.eq(1L),
                Mockito.argThat(adv -> adv.getCompanyName().equals("Updated Company")));
    }

    @Test
    public void testStartViewingAdvertisement() throws Exception {
        Long advertisementId = 1L;
        Mockito.doNothing().when(advertisementService).startViewingAdvertisement(advertisementId);

        mockMvc.perform(post("/api/v1/advertisements/start-viewing/" + advertisementId).header("Authorization",
                "Bearer " + token)).andExpect(status().isOk());

        Mockito.verify(advertisementService, Mockito.times(1)).startViewingAdvertisement(advertisementId);
    }

    @Test
    public void testStopViewingAdvertisement() throws Exception {
        Long advertisementId = 1L;
        Advertisement updatedAdvertisement = createAdvertisement(advertisementId);
        updatedAdvertisement.setTimeSeen(5); // Simula que se ha visto durante 5 segundos

        Mockito.when(advertisementService.stopViewingAdvertisement(advertisementId)).thenReturn(updatedAdvertisement);

        mockMvc.perform(post("/api/v1/advertisements/stop-viewing/" + advertisementId).header("Authorization",
                "Bearer " + token)).andExpect(status().isOk())
                .andExpect(jsonPath("$.id", is(advertisementId.intValue()))).andExpect(jsonPath("$.timeSeen", is(5)));

        Mockito.verify(advertisementService, Mockito.times(1)).stopViewingAdvertisement(advertisementId);
    }

    @Test
    public void testCompleteAdvertisement() throws Exception {
        Long advertisementId = 1L;
        Advertisement completedAdvertisement = createAdvertisement(advertisementId);
        completedAdvertisement.setIsCompleted(true);

        Mockito.when(advertisementService.completeAdvertisement(advertisementId)).thenReturn(completedAdvertisement);

        mockMvc.perform(
                post("/api/v1/advertisements/complete/" + advertisementId).header("Authorization", "Bearer " + token))
                .andExpect(status().isOk()).andExpect(jsonPath("$.id", is(advertisementId.intValue())))
                .andExpect(jsonPath("$.isCompleted", is(true)));

        Mockito.verify(advertisementService, Mockito.times(1)).completeAdvertisement(advertisementId);
    }

    @Test
    public void testUpdateAdvertisementClicks() throws Exception {
        Long advertisementId = 1L;
        Advertisement updatedAdvertisement = createAdvertisement(advertisementId);
        updatedAdvertisement.setTotalClicks(1); // Simula un click

        Mockito.when(advertisementService.updateAdvertisementClicks(advertisementId)).thenReturn(updatedAdvertisement);

        mockMvc.perform(
                post("/api/v1/advertisements/clicks/" + advertisementId).header("Authorization", "Bearer " + token))
                .andExpect(status().isOk()).andExpect(jsonPath("$.id", is(advertisementId.intValue())))
                .andExpect(jsonPath("$.totalClicks", is(1)));

        Mockito.verify(advertisementService, Mockito.times(1)).updateAdvertisementClicks(advertisementId);
    }

    @Test
    public void testDeleteAdvertisement() throws Exception {
        Long advertisementId = 1L;
        Mockito.doNothing().when(advertisementService).deleteAdvertisement(advertisementId);

        mockMvc.perform(delete("/api/v1/advertisements/" + advertisementId).header("Authorization", "Bearer " + token))
                .andExpect(status().isOk());

        Mockito.verify(advertisementService, Mockito.times(1)).deleteAdvertisement(advertisementId);
    }

}
