package com.isppG8.infantem.infantem.allergen;

import java.util.Optional;

import org.springframework.data.jpa.repository.JpaRepository;

public interface AllergenRepository extends JpaRepository<Allergen, Long> {
    Optional<Allergen> findByName(String name);
}
