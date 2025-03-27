package com.isppG8.infantem.infantem.disease;

import java.time.LocalDate;
import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

import com.isppG8.infantem.infantem.disease.dto.DiseaseSummary;
import com.isppG8.infantem.infantem.util.Tuple;

public interface DiseaseRepository extends JpaRepository<Disease, Long> {

    @Query("SELECT DISTINCT new com.isppG8.infantem.infantem.util.Tuple(d.startDate, d.endDate) FROM Disease d WHERE d.baby.id = ?1 AND (d.startDate BETWEEN ?2 AND ?3 OR d.endDate BETWEEN ?2 AND ?3)")
    List<Tuple<LocalDate, LocalDate>> findDiseaseDatesByBabyIdAndDate(Integer babyId, LocalDate start, LocalDate end);

    @Query("SELECT new com.isppG8.infantem.infantem.disease.dto.DiseaseSummary(d.id, d.name) FROM Disease d WHERE d.baby.id = ?1 AND ?2 BETWEEN d.startDate AND d.endDate")
    List<DiseaseSummary> findDiseaseSummaryByBabyIdAndDate(Integer babyId, LocalDate day);

}
