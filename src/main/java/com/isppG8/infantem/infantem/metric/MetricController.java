package com.isppG8.infantem.infantem.metric;

import java.util.List;
import java.util.stream.Collectors;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.isppG8.infantem.infantem.metric.dto.MetricSummary;

@RestController
@RequestMapping("/api/v1/metrics")
public class MetricController {

    private final MetricService metricService;

    @Autowired
    public MetricController(MetricService metricService) {
        this.metricService = metricService;
    }

    @PostMapping
    public ResponseEntity<Metric> createMetric(@RequestBody Metric metric) {
        Metric createdMetric = metricService.createMetric(metric);
        return new ResponseEntity<>(createdMetric, HttpStatus.CREATED);
    }

    @GetMapping("/{id}")
    public ResponseEntity<MetricSummary> getMetricById(@PathVariable Long id) {
        Metric metric = metricService.getMetricById(id);
        MetricSummary metricDTO = new MetricSummary(
            metric.getId(),
            metric.getWeight(),
            metric.getHeight(),
            metric.getHeadCircumference(),
            metric.getArmCircumference()
        );
        return ResponseEntity.ok(metricDTO);
    }

    @GetMapping("/baby/{babyId}")
    public ResponseEntity<List<MetricSummary>> getAllMetricsByBabyId(@PathVariable Integer babyId) {
        List<MetricSummary> metrics = metricService.getAllMetricsByBabyId(babyId).stream()
            .map(metric -> new MetricSummary(
                metric.getId(),
                metric.getWeight(),
                metric.getHeight(),
                metric.getHeadCircumference(),
                metric.getArmCircumference()
            ))
            .collect(Collectors.toList());
        return ResponseEntity.ok(metrics);
    }

    @PutMapping("/{id}")
    public ResponseEntity<Metric> updateMetric(@PathVariable Long id, @RequestBody Metric metric) {
        Metric updatedMetric = metricService.updateMetric(id, metric);
        return ResponseEntity.ok(updatedMetric);
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Void> deleteMetric(@PathVariable Long id) {
        metricService.deleteMetric(id);
        return ResponseEntity.noContent().build();
    }
}
