package com.isppG8.infantem.infantem.intake;

import java.util.List;

import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.CrudRepository;

public interface FoodRepository extends CrudRepository<Food, Long> {

    @Query("SELECT f FROM Food f")
    List<Food> findAll();
}
