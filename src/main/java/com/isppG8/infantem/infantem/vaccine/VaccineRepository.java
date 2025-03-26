package com.isppG8.infantem.infantem.vaccine;

import java.time.LocalDate;
import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

import com.isppG8.infantem.infantem.vaccine.dto.VaccineSummary;

public interface VaccineRepository extends JpaRepository<Vaccine, Long> {

    @Query("SELECT DISTINCT v.vaccinationDate FROM Vaccine v WHERE v.baby.id = ?1 AND v.vaccinationDate BETWEEN ?2 AND ?3")
    List<LocalDate> getVaccinesByBabyIdAndDate(Integer babyId, LocalDate start, LocalDate end);

    @Query("SELECT new com.isppG8.infantem.infantem.vaccine.dto.VaccineSummary(v.id, v.type) FROM FROM Vaccine v WHERE v.baby.id = ?1 AND v.vaccinationDate = ?2")
    List<VaccineSummary> getVaccineSummaryByBabyIdAndDate(Integer babyId, LocalDate day);

}
