package com.isppG8.infantem.infantem.foodSource;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface FoodSourceRepository extends JpaRepository<FoodSource, Long> {
}
