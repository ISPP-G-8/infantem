package com.isppG8.infantem.infantem.nutritionalContributionNutrient;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface NutritionalContributionNutrientRepository extends JpaRepository<NutritionalContributionNutrient, Long> {
}