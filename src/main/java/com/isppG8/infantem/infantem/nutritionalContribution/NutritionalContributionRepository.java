package com.isppG8.infantem.infantem.nutritionalContribution;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface NutritionalContributionRepository extends JpaRepository<NutritionalContribution, Long> {
}
