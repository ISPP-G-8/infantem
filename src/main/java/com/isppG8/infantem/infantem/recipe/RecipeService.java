package com.isppG8.infantem.infantem.recipe;

import java.util.ArrayList;
import java.util.List;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import com.isppG8.infantem.infantem.baby.Baby;
import com.isppG8.infantem.infantem.baby.BabyService;
import com.isppG8.infantem.infantem.exceptions.ResourceNotFoundException;
import com.isppG8.infantem.infantem.exceptions.ResourceNotOwnedException;
import com.isppG8.infantem.infantem.user.UserService;
import java.time.LocalDate;
import java.time.Period;

@Service
public class RecipeService {

    private RecipeRepository recipeRepository;
    private UserService userService;
    private BabyService babyService;

    @Autowired
    public RecipeService(RecipeRepository recipeRepository, UserService userService, BabyService babyService) {
        this.recipeRepository = recipeRepository;
        this.userService = userService;
        this.babyService = babyService;
    }

    private Integer getCurrentUserId() {
        return this.userService.findCurrentUserId();
    }

    @Transactional(readOnly = true)
    public List<Recipe> getAllRecommendedRecipes() {
        return this.recipeRepository.findAllRecommendedRecipes();
    }

    @Transactional(readOnly = true)
    public List<Recipe> getRecommendedRecipes(Integer babyId)
            throws ResourceNotFoundException, ResourceNotOwnedException {

        Baby baby = this.babyService.findById(babyId);
        LocalDate birthDate = baby.getBirthDate();
        int age = Period.between(birthDate, LocalDate.now()).getYears();
        return this.recipeRepository.findRecommendedRecipes(age);
    }

    @Transactional(readOnly = true)
    public List<Recipe> getCurrentUserRecipes() throws ResourceNotFoundException {
        Integer userId = this.getCurrentUserId();
        return this.recipeRepository.findRecipesByUserId(userId);
    }

    @Transactional(readOnly = true)
    public Recipe getRecipeById(Long recipeId) throws ResourceNotFoundException, ResourceNotOwnedException {
        Integer userId = this.getCurrentUserId();
        Recipe recipe = this.recipeRepository.findById(recipeId)
                .orElseThrow(() -> new ResourceNotFoundException("Recipe", "id", recipeId));

        if (recipe.getUser() != null && recipe.getUser().getId() != userId) {
            throw new ResourceNotOwnedException(recipe);
        }
        return recipe;
    }

    @Transactional
    public Recipe createRecipe(Recipe recipe) {
        recipe.setUser(userService.findCurrentUser());
        return this.recipeRepository.save(recipe);
    }

    @Transactional
    public Recipe updateRecipe(Long recipeId, Recipe recipeDetails, Integer userId) {
        Recipe recipe = this.recipeRepository.findById(recipeId)
                .orElseThrow(() -> new ResourceNotFoundException("Recipe", "id", recipeId));

        // If the recipe does not belong to the current user, throw an exception
        if (recipe.getUser() == null || recipe.getUser().getId() != userId) {
            throw new ResourceNotOwnedException(recipe);
        }

        recipe.setName(recipeDetails.getName());
        recipe.setDescription(recipeDetails.getDescription());
        recipe.setIngredients(recipeDetails.getIngredients());
        recipe.setMinRecommendedAge(recipeDetails.getMinRecommendedAge());
        recipe.setMaxRecommendedAge(recipeDetails.getMaxRecommendedAge());
        recipe.setElaboration(recipeDetails.getElaboration());

        return this.recipeRepository.save(recipe);
    }

    @Transactional
    public void deleteRecipe(Long recipeId, Integer userId) {
        Recipe recipe = this.recipeRepository.findById(recipeId)
                .orElseThrow(() -> new ResourceNotFoundException("Recipe", "id", recipeId));

        if (recipe.getUser() == null || recipe.getUser().getId() != userId) {
            throw new ResourceNotOwnedException(recipe);
        }
        this.recipeRepository.delete(recipe);
    }

    @Transactional(readOnly = true)
    public List<Recipe> getRecipeByMinAge(Integer age) throws ResourceNotFoundException {
        Integer userId = this.getCurrentUserId();
        return this.recipeRepository.findRecipeByMinAge(age, userId);
    }

    @Transactional(readOnly = true)
    public List<Recipe> getRecipeByMaxAge(Integer age) throws ResourceNotFoundException {
        Integer userId = this.getCurrentUserId();
        return this.recipeRepository.findRecipeByMaxAge(age, userId);
    }

    @Transactional(readOnly = true)
    public List<Recipe> getRecipeByIngredients(List<String> ingredients) throws ResourceNotFoundException {
        Integer userId = this.getCurrentUserId();
        List<Recipe> recipes = new ArrayList<>();
        for (String ingredient : ingredients) {
            System.out.println(ingredient);
            recipes.addAll(this.recipeRepository.findRecipeByIngredient(ingredient, userId));
        }
        return recipes;
    }

    @Transactional(readOnly = true)
    public List<Recipe> getRecipesFilteringAllergens(List<String> allergens) throws ResourceNotFoundException {
        Integer userId = this.getCurrentUserId();
        return recipeRepository.findRecipesWithoutAllergen(allergens, userId);
    }

    @Transactional(readOnly = true)
    public List<Recipe> getRecommendedRecipeByMinAge(Integer age) {
        return this.recipeRepository.findRecommendedRecipeByMinAge(age);
    }

    @Transactional(readOnly = true)
    public List<Recipe> getRecommendedRecipeByMaxAge(Integer age) {
        return this.recipeRepository.findRecommendedRecipeByMaxAge(age);
    }

    @Transactional(readOnly = true)
    public List<Recipe> getRecommendedRecipeByIngredients(List<String> ingredients) {
        List<Recipe> recipes = new ArrayList<>();
        for (String ingredient : ingredients) {
            System.out.println(ingredient);
            recipes.addAll(this.recipeRepository.findRecipeRecommendedByIngredient(ingredient));
        }
        return recipes;
    }

    @Transactional(readOnly = true)
    public List<Recipe> getRecommendedRecipesFilteringAllergens(List<String> allergens) {
        return recipeRepository.findRecommendedRecipesWithoutAllergen(allergens);
    }

    @Transactional(readOnly = true)
    public List<Recipe> getRecommendedRecipesByAge(Integer age) {
        return this.recipeRepository.findRecommendedRecipesByAge(age);
    }

    @Transactional(readOnly = true)
    public List<Recipe> getRecommendedRecipesByName(String name) {
        return this.recipeRepository.findRecipeRecommendedByName(name);
    }

    @Transactional(readOnly = true)
    public List<Recipe> getRecipesByName(String name) throws ResourceNotFoundException {
        Integer userId = this.getCurrentUserId();
        return this.recipeRepository.findRecipeByName(name, userId);
    }

}
