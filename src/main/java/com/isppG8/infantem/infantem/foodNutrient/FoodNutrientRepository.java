package com.isppG8.infantem.infantem.foodNutrient;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface FoodNutrientRepository extends JpaRepository<FoodNutrient, Long> {
}
