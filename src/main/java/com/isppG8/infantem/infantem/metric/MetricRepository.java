package com.isppG8.infantem.infantem.metric;

import java.time.LocalDate;
import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

import com.isppG8.infantem.infantem.metric.dto.MetricDTO;
import com.isppG8.infantem.infantem.metric.dto.MetricSummary;

@Repository
public interface MetricRepository extends JpaRepository<Metric, Long> {

    @Query("SELECT DISTINCT m.date FROM Metric m WHERE m.baby.id = ?1 AND m.date BETWEEN ?2 AND ?3")
    List<LocalDate> findMetricsByUserIdAndDate(Integer babyId, LocalDate start, LocalDate end);

    @Query("SELECT new com.isppG8.infantem.infantem.metric.dto.MetricSummary(m.id, m.weight, m.height, m.headCircumference) FROM Metric m WHERE m.baby.id = ?1 AND ?2 = m.date")
    List<MetricSummary> findMetricSummaryByBabyIdAndDate(Integer babyId, LocalDate day);

    @Query("SELECT new com.isppG8.infantem.infantem.metric.dto.MetricDTO(m.id, m.weight, m.height, m.headCircumference, m.armCircumference, m.date) FROM Metric m WHERE m.baby.id = ?1 AND ?2 = m.date")
    List<MetricDTO> findMetricDTOByBabyIdAndDate(Integer babyId, LocalDate day);
}
