package com.isppG8.infantem.infantem.metric;

import static org.junit.jupiter.api.Assertions.*;
import static org.mockito.Mockito.*;

import java.time.LocalDate;
import java.util.Optional;

import org.junit.jupiter.api.BeforeAll;
import org.junit.jupiter.api.Test;
import org.mockito.Mock;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.test.context.ActiveProfiles;

import jakarta.transaction.Transactional;

@SpringBootTest
@ActiveProfiles("test")
@Transactional
public class MetricServiceTest {

    @Mock
    private MetricRepository metricRepository;

    private MetricService metricService;

    @Autowired
    public MetricServiceTest(MetricService metricService, MetricRepository metricRepository) {
        this.metricService = metricService;
        this.metricRepository = metricRepository;
    }

    static Metric metric;

    @BeforeAll
    static void setUp() {
        metric = new Metric();
        metric.setId(1);
        metric.setWeight(3.5);
        metric.setHeight(50.0);
        metric.setHeadCircumference(35.5);
        metric.setArmCircumference(17.1);
        metric.setDate(LocalDate.now());
    }

    @Test
    public void testGetMetricById() {
        when(metricRepository.findById(1L)).thenReturn(Optional.of(metric));
        Metric foundMetric = metricService.getMetricById(1L);
        assertNotNull(foundMetric);
        assertEquals(3.5, foundMetric.getWeight());
    }
}
