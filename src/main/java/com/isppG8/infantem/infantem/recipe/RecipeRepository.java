package com.isppG8.infantem.infantem.recipe;

import java.util.List;

import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.CrudRepository;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

@Repository
public interface RecipeRepository extends CrudRepository<Recipe, Long> {

    @Query("SELECT r FROM Recipe r WHERE r.user IS NULL")
    List<Recipe> findAllRecommendedRecipes();

    @Query("SELECT r FROM Recipe r WHERE r.minRecommendedAge <= :age AND r.maxRecommendedAge >= :age AND r.user IS NULL")
    List<Recipe> findRecommendedRecipes(@Param("age") Integer age);

    @Query("SELECT r FROM Recipe r WHERE r.user.id = :userId")
    List<Recipe> findRecipesByUserId(@Param("userId") Integer userId);

    @Query("SELECT r FROM Recipe r WHERE r.user.id = :userId AND r.minRecommendedAge <= :age ")
    List<Recipe> findRecipeByMinAge(@Param("age") Integer age, @Param("userId") Integer userId);

    @Query("SELECT r FROM Recipe r WHERE r.user.id = :userId AND r.maxRecommendedAge >= :age")
    List<Recipe> findRecipeByMaxAge(@Param("age") Integer age, @Param("userId") Integer userId);

    @Query("SELECT r FROM Recipe r WHERE r.user.id = :userId AND :ingredient IS NOT NULL AND :ingredient <> '' AND LOWER(r.ingredients) LIKE LOWER(CONCAT('%', :ingredient, '%'))")
    List<Recipe> findRecipeByIngredient(String ingredient, @Param("userId") Integer userId);

    @Query("SELECT DISTINCT r FROM Recipe r JOIN r.foodNutrients fn JOIN fn.nutrient n WHERE r.user.id = :userId AND n.name = :nutrientName")
    List<Recipe> findRecipeByNutrient(@Param("nutrientName") String nutrientName, @Param("userId") Integer userId);

    @Query("SELECT r FROM Recipe r WHERE r.user.id = :userId AND NOT EXISTS (SELECT 1 FROM r.allergens a WHERE a.name IN :allergens)")
    List<Recipe> findRecipesWithoutAllergen(@Param("allergens") List<String> allergens,
            @Param("userId") Integer userId);

    @Query("SELECT r FROM Recipe r WHERE r.user IS NULL AND r.minRecommendedAge <= :age ")
    List<Recipe> findRecommendedRecipeByMinAge(@Param("age") Integer age);

    @Query("SELECT r FROM Recipe r WHERE r.user IS NULL AND r.maxRecommendedAge >= :age")
    List<Recipe> findRecommendedRecipeByMaxAge(@Param("age") Integer age);

    @Query("SELECT r FROM Recipe r WHERE r.user IS NULL AND :ingredient IS NOT NULL AND :ingredient <> '' AND LOWER(r.ingredients) LIKE LOWER(CONCAT('%', :ingredient, '%'))")
    List<Recipe> findRecipeRecommendedByIngredient(String ingredient);

    @Query("SELECT DISTINCT r FROM Recipe r JOIN r.foodNutrients fn JOIN fn.nutrient n WHERE r.user IS NULL AND n.name = :nutrientName")
    List<Recipe> findRecommendedRecipeByNutrient(@Param("nutrientName") String nutrientName);

    @Query("SELECT r FROM Recipe r WHERE r.user IS NULL AND NOT EXISTS (SELECT 1 FROM r.allergens a WHERE a.name IN :allergens)")
    List<Recipe> findRecommendedRecipesWithoutAllergen(@Param("allergens") List<String> allergens);

    @Query("SELECT r FROM Recipe r WHERE r.user IS NULL AND r.minRecommendedAge <= :age AND r.maxRecommendedAge >= :age")
    List<Recipe> findRecommendedRecipesByAge(@Param("age") Integer age);

}
