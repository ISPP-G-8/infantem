package com.isppG8.infantem.infantem.recipe;

import static org.junit.jupiter.api.Assertions.assertEquals;
import static org.junit.jupiter.api.Assertions.assertThrows;
import static org.junit.jupiter.api.Assertions.assertTrue;

import java.util.List;
import java.util.stream.Collectors;

import org.junit.jupiter.api.Test;
import org.mockito.Mockito;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.test.context.ActiveProfiles;
import org.springframework.test.context.bean.override.mockito.MockitoBean;
import org.springframework.transaction.annotation.Transactional;

import com.isppG8.infantem.infantem.exceptions.ResourceNotFoundException;
import com.isppG8.infantem.infantem.exceptions.ResourceNotOwnedException;
import com.isppG8.infantem.infantem.user.User;
import com.isppG8.infantem.infantem.user.UserService;

@SpringBootTest
@ActiveProfiles("test")
@Transactional
public class RecipeServiceTest {

    @MockitoBean
    private UserService userService;

    @Autowired
    private RecipeService recipeService;

    final int HUGE_BABY_AGE = 999;

    @Test
    public void recipeFilterByMinAgeTest() {
        final int BABY_AGE = 6;
        Mockito.when(userService.findCurrentUserId()).thenReturn(1);

        final List<Recipe> allRecipes = recipeService.getCurrentUserRecipes();
        List<Recipe> filtered_recipes = recipeService.getRecipeByMinAge(BABY_AGE);
        assertTrue(filtered_recipes.size() < allRecipes.size(),
                "Filtered recipe list size should be less than original list");

        Boolean allRecipesHasCorrectMinAge = filtered_recipes.stream()
                .allMatch(recipe -> BABY_AGE >= recipe.getMinRecommendedAge());

        assertTrue(allRecipesHasCorrectMinAge, "All recipes should has min recommended age less than " + BABY_AGE);

        List<Recipe> emptyFilteredRecipe = recipeService.getRecipeByMinAge(0);
        assertTrue(emptyFilteredRecipe.isEmpty(), "This filtered list should be empty: " + emptyFilteredRecipe);

        List<Recipe> noFilteredRecipes = recipeService.getRecipeByMinAge(HUGE_BABY_AGE);
        assertEquals(allRecipes, noFilteredRecipes, "All recipes should have min age less than" + HUGE_BABY_AGE);

    }

    @Test
    public void recipeFilterByMaxAgeTest() {

        Mockito.when(userService.findCurrentUserId()).thenReturn(1);
        final List<Recipe> allRecipes = recipeService.getCurrentUserRecipes();
        final int BABY_AGE = 10;

        List<Recipe> filtered_recipes = recipeService.getRecipeByMaxAge(BABY_AGE);
        assertTrue(filtered_recipes.size() <= allRecipes.size(),
                "Filtered recipe list size should be less than original list, Filtered size: " + filtered_recipes.size()
                        + "Original size: " + allRecipes.size());

        Boolean allRecipesHasCorrectMaxAge = filtered_recipes.stream()
                .allMatch(recipe -> BABY_AGE <= recipe.getMaxRecommendedAge());

        assertTrue(allRecipesHasCorrectMaxAge, "All recipes should has max recommended age greater than " + BABY_AGE);

        List<Recipe> emptyFilteredRecipe = recipeService.getRecipeByMaxAge(HUGE_BABY_AGE);
        assertTrue(emptyFilteredRecipe.isEmpty(), "This filtered list should be empty: " + emptyFilteredRecipe);

        List<Recipe> noFilteredRecipes = recipeService.getRecipeByMaxAge(0);
        assertEquals(allRecipes, noFilteredRecipes, "All recipes should have max age greater than 0");
    }

    @Test
    public void recommendedRecipeFilterByMinAgeTest() {
        final int BABY_AGE = 6;

        final List<Recipe> allRecipes = recipeService.getAllRecommendedRecipes();
        List<Recipe> filtered_recipes = recipeService.getRecommendedRecipeByMinAge(BABY_AGE);
        assertTrue(filtered_recipes.size() < allRecipes.size(),
                "Filtered recipe list size should be less than original list");

        Boolean allRecipesHasCorrectMinAge = filtered_recipes.stream()
                .allMatch(recipe -> BABY_AGE >= recipe.getMinRecommendedAge());

        assertTrue(allRecipesHasCorrectMinAge, "All recipes should has min recommended age less than " + BABY_AGE);

        List<Recipe> emptyFilteredRecipe = recipeService.getRecommendedRecipeByMinAge(0);
        assertTrue(emptyFilteredRecipe.isEmpty(), "This filtered list should be empty: " + emptyFilteredRecipe);

        List<Recipe> noFilteredRecipes = recipeService.getRecommendedRecipeByMinAge(HUGE_BABY_AGE);
        assertEquals(allRecipes, noFilteredRecipes, "All recipes should have min age less than" + HUGE_BABY_AGE);

    }

    @Test
    public void recommendedRecipeFilterByMaxAgeTest() {

        final List<Recipe> allRecipes = recipeService.getAllRecommendedRecipes();
        final int BABY_AGE = 10;

        List<Recipe> filtered_recipes = recipeService.getRecommendedRecipeByMaxAge(BABY_AGE);
        assertTrue(filtered_recipes.size() <= allRecipes.size(),
                "Filtered recipe list size should be less than original list, Filtered size: " + filtered_recipes.size()
                        + "Original size: " + allRecipes.size());

        Boolean allRecipesHasCorrectMinAge = filtered_recipes.stream()
                .allMatch(recipe -> BABY_AGE <= recipe.getMaxRecommendedAge());

        assertTrue(allRecipesHasCorrectMinAge, "All recipes should has min recommended age greater than " + BABY_AGE);

        List<Recipe> emptyFilteredRecipe = recipeService.getRecommendedRecipeByMaxAge(HUGE_BABY_AGE);
        assertTrue(emptyFilteredRecipe.isEmpty(), "This filtered list should be empty: " + emptyFilteredRecipe);

        List<Recipe> noFilteredRecipes = recipeService.getRecommendedRecipeByMaxAge(0);
        assertEquals(allRecipes, noFilteredRecipes, "All recipes should have min age greater than 0");
    }

    @Test
    public void recipeFilterByIngredientTest() {

        Mockito.when(userService.findCurrentUserId()).thenReturn(1);
        final List<String> EXISTING_INGREDIENT = List.of("zanahoria");
        final List<String> NON_EXISTING_INGREDIENT = List.of("chocolate");

        List<Recipe> recipesWithIngredient = recipeService.getRecipeByIngredients(EXISTING_INGREDIENT);
        recipesWithIngredient.forEach(r -> r.setIngredients(r.getIngredients().toLowerCase()));
        assertTrue(recipesWithIngredient.size() > 0, "Recipes containing the nutrient should exist.");

        boolean allRecipesContainIngredient = recipesWithIngredient.stream()
                .allMatch(recipe -> recipe.getIngredients().toLowerCase().contains(EXISTING_INGREDIENT.get(0)));

        assertTrue(allRecipesContainIngredient,
                "All returned recipes should contain the ingredient " + recipesWithIngredient + EXISTING_INGREDIENT);

        List<Recipe> recipesWithNonExistingIngredient = recipeService.getRecipeByIngredients(NON_EXISTING_INGREDIENT);
        assertTrue(recipesWithNonExistingIngredient.isEmpty(),
                "No recipes should contain the nutrient " + NON_EXISTING_INGREDIENT);

        List<Recipe> recipesWithEmptyIngredient = recipeService.getRecipeByIngredients(List.of(""));
        assertTrue(recipesWithEmptyIngredient.isEmpty(), "No recipes should be returned for empty ingredient.");
    }

    @Test
    public void recommendedRecipeFilterByIngredientTest() {

        final List<String> EXISTING_INGREDIENT = List.of("pollo");
        final List<String> NON_EXISTING_INGREDIENT = List.of("chocolate");

        List<Recipe> recipesWithIngredient = recipeService.getRecommendedRecipeByIngredients(EXISTING_INGREDIENT);
        recipesWithIngredient.forEach(r -> r.setIngredients(r.getIngredients().toLowerCase()));
        assertTrue(recipesWithIngredient.size() > 0, "Recipes containing the nutrient should exist.");

        boolean allRecipesContainIngredient = recipesWithIngredient.stream()
                .allMatch(recipe -> recipe.getIngredients().toLowerCase().contains(EXISTING_INGREDIENT.get(0)));

        assertTrue(allRecipesContainIngredient,
                "All returned recipes should contain the ingredient " + recipesWithIngredient + EXISTING_INGREDIENT);

        List<Recipe> recipesWithNonExistingIngredient = recipeService
                .getRecommendedRecipeByIngredients(NON_EXISTING_INGREDIENT);
        assertTrue(recipesWithNonExistingIngredient.isEmpty(),
                "No recipes should contain the nutrient " + NON_EXISTING_INGREDIENT);

        List<Recipe> recipesWithEmptyIngredient = recipeService.getRecommendedRecipeByIngredients(List.of(""));
        assertTrue(recipesWithEmptyIngredient.isEmpty(), "No recipes should be returned for empty ingredient.");
    }

    @Test
    public void recipeFilterByAllergenTest() {

        Mockito.when(userService.findCurrentUserId()).thenReturn(1);
        final List<String> ALLERGEN = List.of("Gluten");

        List<Recipe> recipesWithIngredient = recipeService.getRecipesFilteringAllergens(ALLERGEN);
        assertTrue(recipesWithIngredient.size() > 0, "Recipes without containing the allergen should exist.");

        boolean allRecipesContainIngredient = recipesWithIngredient.stream().noneMatch(recipe -> recipe.getAllergens()
                .stream().map(allergen -> allergen.getName()).collect(Collectors.toList()).contains(ALLERGEN.get(0)));

        assertTrue(allRecipesContainIngredient,
                "All returned recipes should not contain the allergen " + recipesWithIngredient + ALLERGEN);
    }

    @Test
    public void recommendedRecipeFilterByAllergenTest() {

        final List<String> ALLERGEN = List.of("Huevo");

        List<Recipe> recipesWithIngredient = recipeService.getRecommendedRecipesFilteringAllergens(ALLERGEN);
        assertTrue(recipesWithIngredient.size() > 0, "Recipes containing the allergen should exist.");

        boolean allRecipesContainIngredient = recipesWithIngredient.stream().noneMatch(recipe -> recipe.getAllergens()
                .stream().map(allergen -> allergen.getName()).collect(Collectors.toList()).contains(ALLERGEN.get(0)));

        assertTrue(allRecipesContainIngredient,
                "All returned recipes should not contain the allergen " + recipesWithIngredient + ALLERGEN);
    }

    @Test
    public void recommendedRecipeFilterByNameTest() {

        final String EXISTING_NAME = "Puré";
        final String NON_EXISTING_NAME = "Unexisting Recipe";
        final String EMPTY_NAME = "";

        List<Recipe> recipesWithName = recipeService.getRecommendedRecipesByName(EXISTING_NAME);
        recipesWithName.forEach(r -> r.setIngredients(r.getName().toLowerCase()));
        assertTrue(recipesWithName.size() > 0, "Recipes containing the name should exist.");

        boolean allRecipesContainIngredient = recipesWithName.stream()
                .allMatch(recipe -> recipe.getName().toLowerCase().contains(EXISTING_NAME.toLowerCase()));

        assertTrue(allRecipesContainIngredient,
                "All returned recipes should contain the name " + recipesWithName + EXISTING_NAME);

        List<Recipe> recipesWithNonExistingName = recipeService.getRecommendedRecipesByName(NON_EXISTING_NAME);
        assertTrue(recipesWithNonExistingName.isEmpty(), "No recipes should contain the name " + NON_EXISTING_NAME);

        List<Recipe> recipesWithEmptyName = recipeService.getRecommendedRecipesByName(EMPTY_NAME);
        assertTrue(recipesWithEmptyName.isEmpty(), "No recipes should be returned for empty name.");
    }

    @Test
    public void recipeFilterByNameTest() {
        Mockito.when(userService.findCurrentUserId()).thenReturn(1);
        final String EXISTING_NAME = "Batata";
        final String NON_EXISTING_NAME = "Unexisting Recipe";
        final String EMPTY_NAME = "";

        List<Recipe> recipesWithName = recipeService.getRecipesByName(EXISTING_NAME);
        recipesWithName.forEach(r -> r.setIngredients(r.getName().toLowerCase()));
        assertTrue(recipesWithName.size() > 0, "Recipes containing the name should exist." + recipesWithName);

        boolean allRecipesContainIngredient = recipesWithName.stream()
                .allMatch(recipe -> recipe.getName().toLowerCase().contains(EXISTING_NAME.toLowerCase()));

        assertTrue(allRecipesContainIngredient,
                "All returned recipes should contain the name " + recipesWithName + EXISTING_NAME);

        List<Recipe> recipesWithNonExistingName = recipeService.getRecipesByName(NON_EXISTING_NAME);
        assertTrue(recipesWithNonExistingName.isEmpty(), "No recipes should contain the name " + NON_EXISTING_NAME);

        List<Recipe> recipesWithEmptyName = recipeService.getRecipesByName(EMPTY_NAME);
        assertTrue(recipesWithEmptyName.isEmpty(),
                "No recipes should be returned for empty name." + recipesWithEmptyName);
    }

    @Test
    public void getAllRecommendedRecipesTest() {
        List<Recipe> recommendRecipes = recipeService.getAllRecommendedRecipes();
        assertEquals(7, recommendRecipes.size(), "Number of recommended recipes should be 7");
    }

    @Test
    public void getRecipesByCurrentUserTest() {

        Mockito.when(userService.findCurrentUserId()).thenReturn(1);
        List<Recipe> recipesUser = recipeService.getCurrentUserRecipes();
        assertEquals(5, recipesUser.size(), "The number of recipes found for user 1 should be 5");
        assertTrue(recipesUser.stream().allMatch(recipe -> recipe.getUser().getId() == 1L),
                "All recipes should belong to user 1");
    }

    @Test
    public void getRecipeByIdTest() {

        Mockito.when(userService.findCurrentUserId()).thenReturn(1);
        Recipe recipeId1 = recipeService.getRecipeById(1L);
        assertEquals(1L, recipeId1.getId(), "The recipe id should be 1");
        assertTrue(recipeId1.getDescription().contains("Puré de zanahoria"),
                "The recipe description should contain 'Puré de zanahoria'");

        Recipe recipeId6 = recipeService.getRecipeById(6L);
        assertEquals(6L, recipeId6.getId(), "The recipe id should be 6");
        assertTrue(recipeId6.getDescription().contains("Puré de pollo"),
                "The recipe description should contain 'Puré de pollo'");
    }

    @Test
    public void getRecipeByIdNotFoundTest() {

        Mockito.when(userService.findCurrentUserId()).thenReturn(1);
        assertThrows(ResourceNotFoundException.class, () -> recipeService.getRecipeById(999L),
                "Recipe 999 should not be found");
    }

    @Test
    public void getRecipeByIdNotOwnedTest() {

        Mockito.when(userService.findCurrentUserId()).thenReturn(2);
        assertThrows(ResourceNotOwnedException.class, () -> recipeService.getRecipeById(1L),
                "User 2 should not be able to get recipe 1");
    }

    @Test
    public void createRecipeTest() {
        User user = new User();
        user.setId(1);
        Mockito.when(userService.findCurrentUser()).thenReturn(user);
        Recipe recipe = new Recipe();
        recipe.setName("Test Recipe");
        recipe.setDescription("Test Description");
        recipe.setIngredients("Test Ingredients");
        recipe.setMinRecommendedAge(1);
        recipe.setMaxRecommendedAge(2);
        recipe.setElaboration("Test Elaboration");

        Recipe createdRecipe = recipeService.createRecipe(recipe);
        assertEquals(recipe.getName(), createdRecipe.getName(), "The recipe name should be 'Test Recipe'");
        assertEquals(recipe.getDescription(), createdRecipe.getDescription(),
                "The recipe description should be 'Test Description'");
        assertEquals(recipe.getIngredients(), createdRecipe.getIngredients(),
                "The recipe ingredients should be 'Test Ingredients'");
        assertEquals(recipe.getMinRecommendedAge(), createdRecipe.getMinRecommendedAge(),
                "The recipe min recommended age should be 1");
        assertEquals(recipe.getMaxRecommendedAge(), createdRecipe.getMaxRecommendedAge(),
                "The recipe max recommended age should be 2");
        assertEquals(recipe.getElaboration(), createdRecipe.getElaboration(),
                "The recipe elaboration should be 'Test Elaboration'");
    }

    @Test
    public void updateRecipeTest() {
        Recipe recipe = new Recipe();
        recipe.setName("Updated Recipe");
        recipe.setDescription("Updated Description");
        recipe.setIngredients("Updated Ingredients");
        recipe.setMinRecommendedAge(3);
        recipe.setMaxRecommendedAge(4);
        recipe.setElaboration("Updated Elaboration");

        Recipe updatedRecipe = recipeService.updateRecipe(1L, recipe, 1);

        assertEquals(1L, updatedRecipe.getId(), "The recipe id should be 1");
        assertEquals(recipe.getName(), updatedRecipe.getName(), "The recipe name should be 'Updated Recipe'");
        assertEquals(recipe.getDescription(), updatedRecipe.getDescription(),
                "The recipe description should be 'Updated Description'");
        assertEquals(recipe.getIngredients(), updatedRecipe.getIngredients(),
                "The recipe ingredients should be 'Updated Ingredients'");
        assertEquals(recipe.getMinRecommendedAge(), updatedRecipe.getMinRecommendedAge(),
                "The recipe min recommended age should be 3");
        assertEquals(recipe.getMaxRecommendedAge(), updatedRecipe.getMaxRecommendedAge(),
                "The recipe max recommended age should be 4");
    }

    @Test
    public void updateRecipeNotFoundTest() {
        Recipe recipe = new Recipe();
        recipe.setName("Updated Recipe");
        recipe.setDescription("Updated Description");
        recipe.setIngredients("Updated Ingredients");
        recipe.setMinRecommendedAge(3);
        recipe.setMaxRecommendedAge(4);
        recipe.setElaboration("Updated Elaboration");

        assertThrows(ResourceNotFoundException.class, () -> recipeService.updateRecipe(999L, recipe, 1),
                "Recipe 999 should not be found");
    }

    @Test
    public void updateRecipeNotOwnedTest() {
        Recipe recipe = new Recipe();
        recipe.setName("Updated Recipe");
        recipe.setDescription("Updated Description");
        recipe.setIngredients("Updated Ingredients");
        recipe.setMinRecommendedAge(3);
        recipe.setMaxRecommendedAge(4);
        recipe.setElaboration("Updated Elaboration");

        assertThrows(ResourceNotOwnedException.class, () -> recipeService.updateRecipe(1L, recipe, 2),
                "User 2 should not be able to update recipe 1");

        assertThrows(ResourceNotOwnedException.class, () -> recipeService.updateRecipe(6L, recipe, 2),
                "User 2 should not be able to update recipe 6");
    }

    @Test
    public void deleteRecipeTest() {

        Mockito.when(userService.findCurrentUserId()).thenReturn(1);
        recipeService.deleteRecipe(1L, 1);
        assertThrows(ResourceNotFoundException.class, () -> recipeService.getRecipeById(1L),
                "Recipe 1 should not be found");
    }

    @Test
    public void deleteRecipeNotFoundTest() {
        assertThrows(ResourceNotFoundException.class, () -> recipeService.deleteRecipe(999L, 1),
                "Recipe 999 should not be found");
    }

    @Test
    public void deleteRecipeNotOwnedTest() {
        assertThrows(ResourceNotOwnedException.class, () -> recipeService.deleteRecipe(1L, 2),
                "User 2 should not be able to delete recipe 1");

        assertThrows(ResourceNotOwnedException.class, () -> recipeService.deleteRecipe(6L, 2),
                "User 2 should not be able to delete recipe 6");
    }

}
