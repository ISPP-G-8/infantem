package com.isppG8.infantem.infantem.recipe;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface CustomRecipeRequestRepository extends JpaRepository<CustomRecipeRequest, Long> {

}
