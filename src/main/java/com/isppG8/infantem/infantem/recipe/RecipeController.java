package com.isppG8.infantem.infantem.recipe;

import java.util.ArrayList;
import java.util.List;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageImpl;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import com.isppG8.infantem.infantem.user.User;
import com.isppG8.infantem.infantem.user.UserService;

import com.isppG8.infantem.infantem.recipe.dto.RecipeDTO;

import jakarta.validation.Valid;

@RestController
@RequestMapping("/api/v1/recipes")
public class RecipeController {

    // TODO: add validation for only owner of the recipe can update or delete

    private RecipeService recipeService;

    private UserService userService;

    @Autowired
    public RecipeController(RecipeService recipeService, UserService userService) {
        this.recipeService = recipeService;
        this.userService = userService;
    }

    @GetMapping
    public ResponseEntity<Page<RecipeDTO>> getAllRecipes(
            @RequestParam(value = "maxAge", required = false) Integer maxAge,
            @RequestParam(value = "minAge", required = false) Integer minAge,
            @RequestParam(value = "ingredients", required = false) List<String> ingredients,
            @RequestParam(value = "allergens", required = false) List<String> allergens,
            @RequestParam(value = "page", defaultValue = "0") Integer page,
            @RequestParam(value = "size", defaultValue = "10") Integer size) {

        Pageable pageable = PageRequest.of(page, size);
        List<Recipe> recipes = new ArrayList<>(recipeService.getCurrentUserRecipes());

        if (maxAge != null) {
            List<Recipe> recipesByMaxAge = recipeService.getRecipeByMaxAge(maxAge);
            recipes.retainAll(recipesByMaxAge);
        }
        if (minAge != null) {
            List<Recipe> recipesByMinAge = recipeService.getRecipeByMinAge(minAge);
            recipes.retainAll(recipesByMinAge);
        }
        if (ingredients != null && !ingredients.isEmpty()) {
            List<Recipe> recipesByIngredients = recipeService.getRecipeByIngredients(ingredients);
            recipes.retainAll(recipesByIngredients);
        }
        if (allergens != null && !allergens.isEmpty()) {
            List<Recipe> recipesByAllergens = recipeService.getRecipesFilteringAllergens(allergens);
            recipes.retainAll(recipesByAllergens);
        }
        int start = (int) pageable.getOffset();
        int end = Math.min((start + pageable.getPageSize()), recipes.size());
        Page<Recipe> paginatedRecipes = new PageImpl<>(recipes.subList(start, end), pageable, recipes.size());

        return ResponseEntity.ok(paginatedRecipes.map(RecipeDTO::new));
    }

    @GetMapping("/recommended")
    public ResponseEntity<Page<RecipeDTO>> getAllRecommendedRecipes(
            @RequestParam(value = "maxAge", required = false) Integer maxAge,
            @RequestParam(value = "minAge", required = false) Integer minAge,
            @RequestParam(value = "ingredients", required = false) List<String> ingredients,
            @RequestParam(value = "allergens", required = false) List<String> allergens,
            @RequestParam(value = "page", defaultValue = "0") Integer page,
            @RequestParam(value = "size", defaultValue = "10") Integer size) {

        Pageable pageable = PageRequest.of(page, size);
        List<Recipe> recipes = new ArrayList<>(recipeService.getAllRecommendedRecipes());

        if (maxAge != null) {
            List<Recipe> recipesByMaxAge = recipeService.getRecommendedRecipeByMaxAge(maxAge);
            recipes.retainAll(recipesByMaxAge);
        }
        if (minAge != null) {
            List<Recipe> recipesByMinAge = recipeService.getRecommendedRecipeByMinAge(minAge);
            recipes.retainAll(recipesByMinAge);
        }
        if (ingredients != null && !ingredients.isEmpty()) {
            List<Recipe> recipesByIngredients = recipeService.getRecommendedRecipeByIngredients(ingredients);
            recipes.retainAll(recipesByIngredients);
        }
        if (allergens != null && !allergens.isEmpty()) {
            List<Recipe> recipesByAllergens = recipeService.getRecommendedRecipesFilteringAllergens(allergens);
            recipes.retainAll(recipesByAllergens);
        }
        int start = (int) pageable.getOffset();
        int end = Math.min((start + pageable.getPageSize()), recipes.size());
        Page<Recipe> paginatedRecipes = new PageImpl<>(recipes.subList(start, end), pageable, recipes.size());

        return ResponseEntity.ok(paginatedRecipes.map(RecipeDTO::new));
    }

    @GetMapping("/recommended/{babyId}")
    public ResponseEntity<List<RecipeDTO>> getRecommendedRecipes(@PathVariable Integer babyId) {
        List<Recipe> recipes = recipeService.getRecommendedRecipes(babyId);
        return ResponseEntity.ok(recipes.stream().map(RecipeDTO::new).toList());
    }

    @GetMapping("/recommended/age/{age}")
    public ResponseEntity<List<RecipeDTO>> getRecommendedRecipesByAge(@PathVariable Integer age) {
        List<Recipe> recipes = recipeService.getRecommendedRecipesByAge(age);
        return ResponseEntity.ok(recipes.stream().map(RecipeDTO::new).toList());
    }

    @GetMapping("/{id}")
    public ResponseEntity<Recipe> getRecipeById(@PathVariable Long id) {

        Recipe recipe = recipeService.getRecipeById(id);
        return ResponseEntity.ok(recipe);
    }

    @PostMapping
    public ResponseEntity<Recipe> createRecipe(@Valid @RequestBody Recipe recipe) {
        Recipe createdRecipe = recipeService.createRecipe(recipe);
        return ResponseEntity.status(201).body(createdRecipe);
    }

    @PutMapping("/{id}")
    public ResponseEntity<Recipe> updateRecipe(@PathVariable Long id, @Valid @RequestBody Recipe recipeDetails) {
        User user = userService.findCurrentUser();
        Recipe updatedRecipe = recipeService.updateRecipe(id, recipeDetails, user.getId());
        return ResponseEntity.ok(updatedRecipe);
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Void> deleteRecipe(@PathVariable Long id) {
        User user = userService.findCurrentUser();
        recipeService.deleteRecipe(id, user.getId());
        return ResponseEntity.ok().build();
    }

}
