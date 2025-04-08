package com.isppG8.infantem.infantem.recipe.dto;

import com.isppG8.infantem.infantem.recipe.Recipe;
import com.isppG8.infantem.infantem.allergen.dto.AllergenDTO;
import com.isppG8.infantem.infantem.intake.dto.IntakeDTO;

import java.util.List;
import java.util.ArrayList;

import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
public class RecipeDTO {

    private Long id;

    private String name;

    private String description;

    private String ingredients;

    private Integer minRecommendedAge;

    private Integer maxRecommendedAge;

    private String elaboration;

    private Integer user;

    private List<AllergenDTO> allergens = new ArrayList<>();

    private List<IntakeDTO> intakes = new ArrayList<>();

    public RecipeDTO() {
    }

    public RecipeDTO(Recipe recipe) {
        this.id = recipe.getId();
        this.name = recipe.getName();
        this.description = recipe.getDescription();
        this.ingredients = recipe.getIngredients();
        this.minRecommendedAge = recipe.getMinRecommendedAge();
        this.maxRecommendedAge = recipe.getMaxRecommendedAge();
        this.elaboration = recipe.getElaboration();
        if (recipe.getUser() == null) {
            this.user = null;
        } else {
            this.user = recipe.getUser().getId();
        }
        this.allergens = recipe.getAllergens().stream().map(AllergenDTO::new).toList();
        this.intakes = recipe.getIntakes().stream().map(IntakeDTO::new).toList();
    }

}
