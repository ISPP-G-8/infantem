package com.isppG8.infantem.infantem.metric;

import static org.junit.jupiter.api.Assertions.*;
import static org.mockito.Mockito.*;

import org.junit.jupiter.api.Test;
import org.mockito.Mock;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.http.ResponseEntity;
import org.springframework.test.context.ActiveProfiles;

import jakarta.transaction.Transactional;

@SpringBootTest
@ActiveProfiles("test")
@Transactional
public class MetricControllerTest {
    private MetricController metricController;

    @Mock
    private MetricService metricService;

    @Autowired
    public MetricControllerTest(MetricController metricController, MetricService metricService) {
        this.metricService = metricService;
        this.metricController = metricController;
    }

    @Test
    public void testGetMetricById() {
        Metric metric = new Metric();
        metric.setId(1);
        metric.setWeight(3.5);
        metric.setHeight(50.0);
        metric.setCephalicPerimeter(35);

        when(metricService.getMetricById(1L)).thenReturn(metric);
        ResponseEntity<Metric> response = metricController.getMetricById(1L);
        assertNotNull(response.getBody());
        assertEquals(3.5, response.getBody().getWeight());
    }
}
