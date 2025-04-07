package com.isppG8.infantem.infantem.metric;

import org.junit.jupiter.api.Test;
import org.mockito.Mockito;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.autoconfigure.web.servlet.WebMvcTest;
import org.springframework.boot.test.context.TestConfiguration;
import org.springframework.context.annotation.Bean;
import org.springframework.security.test.context.support.WithMockUser;
import org.springframework.test.context.ActiveProfiles;
import org.springframework.test.web.servlet.MockMvc;
import static org.hamcrest.Matchers.is;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.get;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.jsonPath;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.status;

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
    }

    @Autowired
    private MockMvc mockMvc;

    // Dummy token to simulate authentication
    private final String token = "dummy-token";

    @Autowired
    private MetricService metricService;

    @Test
    public void testGetMetricById() throws Exception {
        // Simulamos la entidad Metric
        Metric metric = new Metric();
        metric.setId(1);
        metric.setWeight(3.5);
        metric.setHeight(50.0);
        metric.setHeadCircumference(35.5);
        metric.setArmCircumference(17.1);

        // Simulamos que el servicio devuelve la entidad
        Mockito.when(metricService.getMetricById(1L)).thenReturn(metric);

        // Hacemos la petición al endpoint correcto con el ID
        mockMvc.perform(get("/api/v1/metrics/" + metric.getId()) // Nota el /1 al final
                .header("Authorization", "Bearer " + token)).andExpect(status().isOk())
                .andExpect(jsonPath("$.id", is(1))).andExpect(jsonPath("$.armCircumference", is(17.1)));
    }
}
