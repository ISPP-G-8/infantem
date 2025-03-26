package com.isppG8.infantem.infantem.metric;

import java.time.LocalDate;
import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.isppG8.infantem.infantem.metric.dto.MetricSummary;

import jakarta.persistence.EntityNotFoundException;

@Service
public class MetricService {

    private MetricRepository metricRepository;

    @Autowired
    public MetricService(MetricRepository metricRepository) {
        this.metricRepository = metricRepository;
    }

    public Metric createMetric(Metric metric) {
        return metricRepository.save(metric);
    }

    public Metric getMetricById(Long id) {
        return metricRepository.findById(id)
                .orElseThrow(() -> new EntityNotFoundException("Metric not found with id: " + id));
    }

    public List<Metric> getAllMetricsByBabyId(Integer babyId) {
        return metricRepository.findAll().stream().filter(metric -> metric.getBaby().getId().equals(babyId)).toList();
    }

    public Metric updateMetric(Long id, Metric updatedMetric) {
        Metric metric = getMetricById(id);
        metric.setWeight(updatedMetric.getWeight());
        metric.setHeight(updatedMetric.getHeight());
        metric.setCephalicPerimeter(updatedMetric.getCephalicPerimeter());
        metric.setDate(updatedMetric.getDate());
        return metricRepository.save(metric);
    }

    public void deleteMetric(Long id) {
        Metric metric = getMetricById(id);
        metricRepository.delete(metric);
    }

    // Methods for calendar

    public List<LocalDate> getMetricsByUserIdAndDate(Integer babyId, LocalDate start, LocalDate end) {
        return this.metricRepository.findMetricsByUserIdAndDate(babyId, start, end);
    }

    public List<MetricSummary> getMetricSummaryByBabyIdAndDate(Integer babyId, LocalDate day) {
        return this.metricRepository.findMetricSummaryByBabyIdAndDate(babyId, day);
    }
}
