package com.isppG8.infantem.infantem.recipe.dto;

import java.util.ArrayList;
import java.util.List;

import com.isppG8.infantem.infantem.allergen.dto.AllergenDTO;
import com.isppG8.infantem.infantem.intake.dto.IntakeDTO;
import com.isppG8.infantem.infantem.recipe.Recipe;

import jakarta.validation.constraints.Max;
import jakarta.validation.constraints.Min;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;
import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
public class CustomRecipeDTO {

    @NotBlank
    private String name;

    private String description;

    private String ingredients;

    @Min(0)
    private Integer minRecommendedAge;

    @Min(0)
    @Max(36)
    private Integer maxRecommendedAge;

    private String elaboration;

    private byte[] recipePhoto;

    @NotNull
    private Integer user;

    private boolean isCustom;

    @NotNull
    private Long requestId;

    private List<AllergenDTO> allergens = new ArrayList<>();

    private List<IntakeDTO> intakes = new ArrayList<>();

    public RecipeDTO() {
    }

    public RecipeDTO(Recipe recipe) {
        this.name = recipe.getName();
        this.description = recipe.getDescription();
        this.ingredients = recipe.getIngredients();
        this.minRecommendedAge = recipe.getMinRecommendedAge();
        this.maxRecommendedAge = recipe.getMaxRecommendedAge();
        this.recipePhoto = recipe.getRecipePhoto();
        this.elaboration = recipe.getElaboration();
        this.isCustom = recipe.getIsCustom();
        if (recipe.getUser() == null) {
            this.user = null;
        } else {
            this.user = recipe.getUser().getId();
        }
        this.allergens = recipe.getAllergens().stream().map(AllergenDTO::new).toList();
        this.intakes = recipe.getIntakes().stream().map(IntakeDTO::new).toList();
    }

}
