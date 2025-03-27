package com.isppG8.infantem.infantem.dream;

import java.time.LocalDateTime;
import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

import com.isppG8.infantem.infantem.util.Tuple;

public interface DreamRepository extends JpaRepository<Dream, Long> {

    @Query("SELECT DISTINCT new com.isppG8.infantem.infantem.util.Tuple(d.dateStart, d.dateEnd) FROM Dream d WHERE d.baby.id = ?1 AND (d.dateStart BETWEEN ?2 AND ?3 OR d.dateEnd BETWEEN ?2 AND ?3)")
    List<Tuple<LocalDateTime, LocalDateTime>> findDreamDatesByBabyIdAndDate(Integer babyId, LocalDateTime start,
            LocalDateTime end);

    @Query("SELECT d FROM Dream d WHERE d.baby.id = ?1 AND d.dateStart BETWEEN ?2 AND ?3 OR d.dateEnd BETWEEN ?2 AND ?3")
    List<Dream> findDreamSummaryByBabyIdAndDate(Integer babyId, LocalDateTime start, LocalDateTime end);
}
