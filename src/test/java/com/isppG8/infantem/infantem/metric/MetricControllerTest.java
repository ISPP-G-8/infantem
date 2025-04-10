package com.isppG8.infantem.infantem.metric;

import org.junit.jupiter.api.Test;
import org.mockito.Mockito;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.autoconfigure.web.servlet.WebMvcTest;
import org.springframework.boot.test.context.TestConfiguration;
import org.springframework.context.annotation.Bean;
import org.springframework.http.MediaType;
import org.springframework.security.test.context.support.WithMockUser;
import org.springframework.test.context.ActiveProfiles;
import org.springframework.test.context.bean.override.mockito.MockitoBean;
import org.springframework.test.web.servlet.MockMvc;
import static org.springframework.security.test.web.servlet.request.SecurityMockMvcRequestPostProcessors.csrf;

import com.fasterxml.jackson.databind.ObjectMapper;
import com.fasterxml.jackson.datatype.jsr310.JavaTimeModule;
import com.fasterxml.jackson.datatype.jsr310.ser.LocalDateSerializer;
import com.isppG8.infantem.infantem.baby.Baby;
import com.isppG8.infantem.infantem.baby.BabyService;
import com.isppG8.infantem.infantem.exceptions.ResourceNotFoundException;

import static org.hamcrest.Matchers.*;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.*;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.*;
import static org.mockito.ArgumentMatchers.any;
import static org.mockito.ArgumentMatchers.anyLong;
import static org.mockito.ArgumentMatchers.anyInt;

import java.time.LocalDate;
import java.time.format.DateTimeFormatter;
import java.util.Arrays;
import java.util.List;

@WebMvcTest(MetricController.class)
@WithMockUser(username = "testUser", roles = { "USER" })
@ActiveProfiles("test")
public class MetricControllerTest {

    @TestConfiguration
    static class TestConfig {
        @Bean
        public MetricService metricService() {
            return Mockito.mock(MetricService.class);
        }

        @Bean
        public ObjectMapper objectMapper() {
            ObjectMapper mapper = new ObjectMapper();
            JavaTimeModule module = new JavaTimeModule();
            module.addSerializer(LocalDate.class, new LocalDateSerializer(DateTimeFormatter.ISO_LOCAL_DATE));
            mapper.registerModule(module);
            return mapper;
        }
    }

    @Autowired
    private MockMvc mockMvc;

    @MockitoBean
    private BabyService babyService;

    @Autowired
    private MetricService metricService;

    @Autowired
    private ObjectMapper objectMapper;

    private final String token = "dummy-token";
    private final LocalDate testDate = LocalDate.of(2023, 1, 1);

    @Test
    public void testGetMetricById() throws Exception {
        Metric metric = new Metric();
        metric.setId(1);
        metric.setWeight(3.5);
        metric.setHeight(50.0);
        metric.setHeadCircumference(35.5);
        metric.setArmCircumference(17.1);
        metric.setDate(testDate);

        Mockito.when(metricService.getMetricById(1L)).thenReturn(metric);

        mockMvc.perform(get("/api/v1/metrics/1").header("Authorization", "Bearer " + token)).andExpect(status().isOk())
                .andExpect(jsonPath("$.id", is(1))).andExpect(jsonPath("$.armCircumference", is(17.1)));
    }

    @Test
    public void testGetMetricById_NotFound() throws Exception {
        Mockito.when(metricService.getMetricById(anyLong())).thenReturn(null);

        mockMvc.perform(get("/api/v1/metrics/999").header("Authorization", "Bearer " + token))
                .andExpect(status().isInternalServerError());
    }

    @Test
    public void testCreateMetric_Success() throws Exception {
        Baby baby = new Baby();
        baby.setId(1);

        Metric metricRequest = new Metric();
        metricRequest.setWeight(3.5);
        metricRequest.setHeight(50.0);
        metricRequest.setHeadCircumference(35.5);
        metricRequest.setArmCircumference(17.1);
        metricRequest.setDate(testDate);

        Metric createdMetric = new Metric();
        createdMetric.setId(1);
        createdMetric.setBaby(baby);
        createdMetric.setWeight(metricRequest.getWeight());
        createdMetric.setHeight(metricRequest.getHeight());
        createdMetric.setHeadCircumference(metricRequest.getHeadCircumference());
        createdMetric.setArmCircumference(metricRequest.getArmCircumference());
        createdMetric.setDate(metricRequest.getDate());

        Mockito.when(babyService.findById(1)).thenReturn(baby);
        Mockito.when(metricService.createMetric(any(Metric.class))).thenReturn(createdMetric);

        mockMvc.perform(post("/api/v1/metrics?babyId=1").header("Authorization", "Bearer " + token).with(csrf()) // Token
                                                                                                                 // CSRF
                                                                                                                 // añadido
                                                                                                                 // aquí
                .contentType(MediaType.APPLICATION_JSON).content(objectMapper.writeValueAsString(metricRequest)))
                .andExpect(status().isCreated()).andExpect(jsonPath("$.id", is(1)))
                .andExpect(jsonPath("$.weight", is(3.5)));
    }

    @Test
    public void testCreateMetric_BabyNotFound() throws Exception {
        Metric metricRequest = new Metric();
        metricRequest.setWeight(3.5);
        metricRequest.setDate(testDate);

        Mockito.when(babyService.findById(anyInt())).thenReturn(null);

        mockMvc.perform(post("/api/v1/metrics?babyId=999").header("Authorization", "Bearer " + token).with(csrf())
                .contentType(MediaType.APPLICATION_JSON).content(objectMapper.writeValueAsString(metricRequest)))
                .andExpect(status().isBadRequest());
    }

    @Test
    public void testCreateMetric_InternalServerError() throws Exception {
        Baby baby = new Baby();
        baby.setId(1);

        Metric metricRequest = new Metric();
        metricRequest.setWeight(3.5);
        metricRequest.setDate(testDate);

        Mockito.when(babyService.findById(1)).thenReturn(baby);
        Mockito.when(metricService.createMetric(any(Metric.class))).thenThrow(new RuntimeException());

        mockMvc.perform(post("/api/v1/metrics?babyId=1").header("Authorization", "Bearer " + token).with(csrf())
                .contentType(MediaType.APPLICATION_JSON).content(objectMapper.writeValueAsString(metricRequest)))
                .andExpect(status().isInternalServerError());
    }

    @Test
    public void testGetAllMetricsByBabyId() throws Exception {
        Metric metric1 = new Metric();
        metric1.setId(1);
        metric1.setWeight(3.5);
        metric1.setHeight(50.0);
        metric1.setDate(testDate);

        Metric metric2 = new Metric();
        metric2.setId(2);
        metric2.setWeight(4.0);
        metric2.setHeight(55.0);
        metric2.setDate(testDate);

        List<Metric> metrics = Arrays.asList(metric1, metric2);

        Mockito.when(metricService.getAllMetricsByBabyId(1)).thenReturn(metrics);

        mockMvc.perform(get("/api/v1/metrics/baby/1").header("Authorization", "Bearer " + token))
                .andExpect(status().isOk()).andExpect(jsonPath("$", hasSize(2))).andExpect(jsonPath("$[0].id", is(1)))
                .andExpect(jsonPath("$[1].id", is(2)));
    }

    @Test
    public void testGetAllMetricsByBabyId_EmptyList() throws Exception {
        Mockito.when(metricService.getAllMetricsByBabyId(anyInt())).thenReturn(Arrays.asList());

        mockMvc.perform(get("/api/v1/metrics/baby/1").header("Authorization", "Bearer " + token))
                .andExpect(status().isOk()).andExpect(jsonPath("$", hasSize(0)));
    }

    @Test
    public void testUpdateMetric_Success() throws Exception {
        Metric metric = new Metric();
        metric.setId(1);
        metric.setWeight(4.0);
        metric.setHeight(55.0);
        metric.setDate(testDate);

        Mockito.when(metricService.updateMetric(anyLong(), any(Metric.class))).thenReturn(metric);

        mockMvc.perform(put("/api/v1/metrics/1").header("Authorization", "Bearer " + token).with(csrf())
                .contentType(MediaType.APPLICATION_JSON).content(objectMapper.writeValueAsString(metric)))
                .andExpect(status().isOk()).andExpect(jsonPath("$.id", is(1))).andExpect(jsonPath("$.weight", is(4.0)));
    }

    @Test
    public void testUpdateMetric_NotFound() throws Exception {
        Metric metric = new Metric();
        metric.setId(999);
        metric.setWeight(4.0);
        metric.setDate(testDate);

        Mockito.when(metricService.updateMetric(anyLong(), any(Metric.class))).thenReturn(null);

        mockMvc.perform(put("/api/v1/metrics/999").header("Authorization", "Bearer " + token).with(csrf())
                .contentType(MediaType.APPLICATION_JSON).content(objectMapper.writeValueAsString(metric)))
                .andExpect(status().isNotFound());
    }

    @Test
    public void testDeleteMetric_Success() throws Exception {
        Mockito.doNothing().when(metricService).deleteMetric(anyLong());

        mockMvc.perform(delete("/api/v1/metrics/1").header("Authorization", "Bearer " + token).with(csrf()))
                .andExpect(status().isNoContent());
    }

    @Test
    public void testDeleteMetric_NotFound() throws Exception {
        // Configura el mock para lanzar excepción
        Mockito.doThrow(new ResourceNotFoundException("Metric not found")).when(metricService).deleteMetric(anyLong());

        mockMvc.perform(delete("/api/v1/metrics/999").header("Authorization", "Bearer " + token).with(csrf())) // Añade
                                                                                                               // el
                                                                                                               // token
                                                                                                               // CSRF
                                                                                                               // aquí
                .andExpect(status().isNotFound());
    }
}
