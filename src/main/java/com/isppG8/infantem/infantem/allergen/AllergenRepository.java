package com.isppG8.infantem.infantem.allergen;

import java.util.Optional;
import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

public interface AllergenRepository extends JpaRepository<Allergen, Long> {

    Optional<Allergen> findByName(String name);

    @Query("SELECT a FROM Allergen a LEFT JOIN Recipe r ON r member of a.recipes LEFT JOIN Intake i on i member of r.intakes WHERE i.id=:intakeId")
    List<Allergen> getAllergensByIntakeId(Long intakeId);
}
