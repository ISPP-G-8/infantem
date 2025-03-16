package com.isppG8.infantem.infantem.recipe;

import java.util.List;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import com.isppG8.infantem.infantem.exceptions.ResourceNotFoundException;
import com.isppG8.infantem.infantem.exceptions.ResourceNotOwnedException;
import com.isppG8.infantem.infantem.user.User;
import com.isppG8.infantem.infantem.user.UserService;


@Service
public class RecipeService {
    
    private RecipeRepository recipeRepository;
    private UserService userService;


    @Autowired
    public RecipeService(RecipeRepository recipeRepository, UserService userService) {
        this.recipeRepository = recipeRepository;
        this.userService = userService;
    }

    //TODO: change age to babyId
    @Transactional(readOnly = true)
    public List<Recipe> getRecommendedRecipes(Integer age) {
        return this.recipeRepository.findRecommendedRecipes(age);
    }

    //TODO: Valorate if it is necessary to change the method to just get the recipes of the current user
    @Transactional(readOnly = true)
    public List<Recipe> getRecipesByUserId(Long userId) {
        return this.recipeRepository.findRecipesByUserId(userId);
    }

    @Transactional(readOnly = true)
    public Recipe getRecipeById(Long recipeId) {
        Recipe recipe = this.recipeRepository.findById(recipeId)
                .orElseThrow(() -> new ResourceNotFoundException("Recipe", "id", recipeId));
        User user = userService.findCurrentUser();
        if(recipe.getUser() != null && recipe.getUser().getId() != user.getId()) {
            throw new ResourceNotOwnedException(recipe);
        }
        return recipe;
    }

    @Transactional
    public Recipe createRecipe(Recipe recipe) {
        User user = userService.findCurrentUser();
        recipe.setUser(user);
        return this.recipeRepository.save(recipe);
    }

    @Transactional
    public Recipe updateRecipe(Long recipeId, Recipe recipeDetails) {
        Recipe recipe = this.recipeRepository.findById(recipeId)
                .orElseThrow(() -> new ResourceNotFoundException("Recipe", "id", recipeId));
        User user = userService.findCurrentUser();

        // If the recipe does not belong to the current user, throw an exception
        if (recipe.getUser() == null || recipe.getUser().getId() != user.getId()) {
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
    public void deleteRecipe(Long recipeId) {
        Recipe recipe = this.recipeRepository.findById(recipeId)
                .orElseThrow(() -> new ResourceNotFoundException("Recipe", "id", recipeId));
        User user = userService.findCurrentUser();

        if (recipe.getUser() == null || recipe.getUser().getId() != user.getId()) {
            throw new ResourceNotOwnedException(recipe);
        }
        this.recipeRepository.delete(recipe);
    }

}




