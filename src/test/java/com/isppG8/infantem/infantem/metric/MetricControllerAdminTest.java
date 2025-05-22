package com.isppG8.infantem.infantem.metric;

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

@WebMvcTest(MetricControllerAdmin.class)
@WithMockUser(username = "testUser", roles = { "USER" })
@ActiveProfiles("test")
public class MetricControllerAdminTest {

    @TestConfiguration
    static class TestConfig {
        @Bean
        public MetricService metricService() {
            return Mockito.mock(MetricService.class);
        }

        @Bean
        public AuthoritiesService authoritiesService() {
            return Mockito.mock(AuthoritiesService.class);
        }
    }

    @Autowired
    private MockMvc mockMvc;

    @Autowired
    private MetricService metricService;

    @MockitoBean
    private AuthoritiesService authoritiesService;

    private final String token = "dummy-token";

    private Metric createDummyMetric(int id) {
        Metric metric = new Metric();
        metric.setId(id);
        metric.setWeight(0.0);
        metric.setHeight(0.0);
        metric.setHeadCircumference(0.0);
        metric.setArmCircumference(0.0);

        Baby b = new Baby();
        b.setId(1);
        b.setName("Test Baby");
        metric.setBaby(b);

        return metric;
    }

    @Test
    public void testGetAllMetrics() throws Exception {
        Metric m1 = createDummyMetric(1);
        Metric m2 = createDummyMetric(2);
        List<Metric> metrics = List.of(m1, m2);
        Mockito.when(metricService.getAllMetricsByBabyId(Mockito.any(int.class))).thenReturn(metrics);
        Mockito.when(authoritiesService.isAdmin()).thenReturn(true);

        mockMvc.perform(get("/api/v1/admin/metrics/baby/1").header("Authorization", "Bearer " + token))
                .andExpect(status().isOk()).andExpect(jsonPath("$", hasSize(2))).andExpect(jsonPath("$[0].id", is(1)))
                .andExpect(jsonPath("$[1].id", is(2)));
        ;
    }

    @Test
    public void testGetMetricById_Success() throws Exception {
        Metric metric = createDummyMetric(1);
        Mockito.when(metricService.getMetricById(1l)).thenReturn(metric);
        Mockito.when(authoritiesService.isAdmin()).thenReturn(true);
        mockMvc.perform(get("/api/v1/admin/metrics/1").header("Authorization", "Bearer " + token))
                .andExpect(status().isOk()).andExpect(jsonPath("$.id", is(1))).andExpect(jsonPath("$.height", is(0.0)));
    }

    @Test
    public void testCreateMetric_Success() throws Exception {
        String metricJson = """
                {
                    "height": 0,
                    "weight": 0,
                    "armCircumference": 0,
                    "headCircumference": 0,
                    "baby": {"id": 1}
                }
                """;
        Metric savedMetric = createDummyMetric(1);
        Mockito.when(metricService.createMetric(Mockito.any(Metric.class))).thenReturn(savedMetric);
        Mockito.when(authoritiesService.isAdmin()).thenReturn(true);

        mockMvc.perform(post("/api/v1/admin/metrics").header("Authorization", "Bearer " + token).with(csrf())
                .contentType(MediaType.APPLICATION_JSON).content(metricJson)).andExpect(status().isCreated())
                .andExpect(jsonPath("$.id", is(1))).andExpect(jsonPath("$.height", is(0.0)));
    }

    @Test
    public void testUpdateMetric_Success() throws Exception {
        String metricJson = """
                {
                    "height": 1,
                    "weight": 0,
                    "armCircumference": 0,
                    "headCircumference": 0,
                    "baby": {"id": 1}
                }
                """;
        Metric updatedMetric = createDummyMetric(1);
        updatedMetric.setHeight(1.0);

        Mockito.when(authoritiesService.isAdmin()).thenReturn(true);
        Mockito.when(metricService.updateMetric(Mockito.eq(1L), Mockito.any(Metric.class))).thenReturn(updatedMetric);

        mockMvc.perform(put("/api/v1/admin/metrics/1").header("Authorization", "Bearer " + token).with(csrf())
                .contentType(MediaType.APPLICATION_JSON).content(metricJson)).andExpect(status().isOk())
                .andExpect(jsonPath("$.id", is(1))).andExpect(jsonPath("$.height", is(1.0)));
    }

    @Test
    public void testUpdateMetric_Invalid() throws Exception {
        String invalidJson = """
                          {
                              "name": "Updated Metric",
                "height": "140.0",
                              "baby": {"id": 1}
                          }
                          """;

        Mockito.when(authoritiesService.isAdmin()).thenReturn(true);

        mockMvc.perform(put("/api/v1/admin/metrics/1").header("Authorization", "Bearer " + token).with(csrf())
                .contentType(MediaType.APPLICATION_JSON).content(invalidJson)).andExpect(status().isBadRequest());
    }

    @Test
    public void testDeleteMetric_Success() throws Exception {
        Mockito.doNothing().when(metricService).deleteMetric(1L);
        Mockito.when(authoritiesService.isAdmin()).thenReturn(true);

        mockMvc.perform(delete("/api/v1/admin/metrics/1").header("Authorization", "Bearer " + token).with(csrf()))
                .andExpect(status().isNoContent());
    }

    @Test
    public void testDeleteMetric_NotFound() throws Exception {
        Mockito.doThrow(new ResourceNotFoundException("Not Found")).when(metricService).deleteMetric(999L);
        Mockito.when(authoritiesService.isAdmin()).thenReturn(true);

        mockMvc.perform(delete("/api/v1/admin/metrics/999").header("Authorization", "Bearer " + token).with(csrf()))
                .andExpect(status().isNotFound());
    }
}
