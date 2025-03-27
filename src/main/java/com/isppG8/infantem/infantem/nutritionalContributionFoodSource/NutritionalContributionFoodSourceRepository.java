package com.isppG8.infantem.infantem.nutritionalContributionFoodSource;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface NutritionalContributionFoodSourceRepository
        extends JpaRepository<NutritionalContributionFoodSource, Long> {
}
