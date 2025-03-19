package com.isppG8.infantem.infantem.recipe;

import static org.junit.jupiter.api.Assertions.*;
import java.util.List;

import org.junit.jupiter.api.Disabled;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.http.HttpStatus;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.web.server.ResponseStatusException;

@SpringBootTest
@Transactional
public class RecipeServiceTest {
    private RecipeService recipeService;


    @Autowired
    public RecipeServiceTest(RecipeService recipeService){
        this.recipeService = recipeService;
    }

/*
    @Test
    public void testGetRecommendedRecipesWithOutAllergens() {
        //Añadir test para null pointer
        List<Recipe> recipes = recipeService.getRecommendedRecipes(1);
        assertNotNull(recipes);
        assertEquals(recipes.size(), 4);
    }
*/

    //@Test
    //@Disabled
    /*
     * This test cannot be executed yet because Food entity still
     * has no relationship with allergen
     */

/*
    public void testGetRecommendedRecipesWithAllergens() {
        List<Recipe> recipes = recipeService.getRecommendedRecipes(2);
        assertNotNull(recipes);
        assertFalse(recipes.isEmpty());
    }
*/

    /*
    @Test
    public void testUserBabyNotFoundInRecipeRecommendations() {
        ResponseStatusException exception = assertThrows(ResponseStatusException.class, 
            () -> recipeService.getRecommendedRecipes(3423423));
        assertEquals(HttpStatus.NOT_FOUND, exception.getStatusCode());
    }

    @Test
    public void testSearchRecipes() {
        List<Recipe> recipes = recipeService.searchRecipes("Pollo");
        assertNotNull(recipes);
        assertFalse(recipes.isEmpty());
        assertEquals(recipes.size(), 1);
    }

    @Test
    public void testSaveFavoriteRecipe() {
        Long userId = 1L;
        Long recipeId = 1L;
        recipeService.saveFavoriteRecipe(userId, recipeId);
        List<Recipe> favoriteRecipes = recipeService.getFavoriteRecipes(userId);
        assertTrue(favoriteRecipes.stream().anyMatch(recipe -> recipe.getId().equals(recipeId)));
    }

    @Test
    public void testGetFavoriteRecipes() {
        Long userId = 1L;
        List<Recipe> favoriteRecipes = recipeService.getFavoriteRecipes(userId);
        assertNotNull(favoriteRecipes);
        assertFalse(favoriteRecipes.isEmpty());
        assertEquals(favoriteRecipes.size(), 2);
    }

*/
}