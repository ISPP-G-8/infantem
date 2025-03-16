package com.isppG8.infantem.infantem.recipe;

import java.util.List;
import java.util.Optional;

import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.CrudRepository;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

@Repository
public interface RecipeRepository extends CrudRepository<Recipe, Long> {

    
    @Query("SELECT r FROM Recipe r WHERE r.minRecommendedAge <= :age AND r.maxRecommendedAge >= :age AND r.user IS NULL")
    List<Recipe> findRecommendedRecipes(@Param("age") Integer age);

    @Query("SELECT r FROM Recipe r WHERE r.user.id = :userId")
    List<Recipe> findRecipesByUserId(@Param("userId") Long userId);

}
