package com.isppG8.infantem.infantem.recipe;

import java.util.ArrayList;
import java.util.List;

import jakarta.validation.constraints.Max;
import jakarta.validation.constraints.Min;
import jakarta.validation.constraints.NotBlank;
import jakarta.persistence.Lob;

import com.fasterxml.jackson.annotation.JsonBackReference;
import com.isppG8.infantem.infantem.allergen.Allergen;
import com.isppG8.infantem.infantem.intake.Intake;
import com.isppG8.infantem.infantem.user.User;
import com.fasterxml.jackson.annotation.JsonIdentityInfo;
import com.fasterxml.jackson.annotation.ObjectIdGenerators;
import com.isppG8.infantem.infantem.recipe.dto.CustomRecipeDTO;
import com.isppG8.infantem.infantem.recipe.dto.RecipeCreateDTO;

import jakarta.persistence.CascadeType;
import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.JoinTable;
import jakarta.persistence.ManyToMany;
import jakarta.persistence.ManyToOne;
import jakarta.persistence.Table;
import jakarta.persistence.Column;
import lombok.Getter;
import lombok.Setter;

@Entity
@Table(name = "recipe_table")
@JsonIdentityInfo(scope = Recipe.class, generator = ObjectIdGenerators.PropertyGenerator.class, property = "id")
@Getter
@Setter
public class Recipe {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @NotBlank
    private String name;

    @Column(nullable = true)
    private String description;

    @Lob
    private byte[] recipePhoto;

    @Column(nullable = true)
    private String ingredients;

    @Min(0)
    private Integer minRecommendedAge;

    @Min(0)
    @Max(36)
    private Integer maxRecommendedAge;

    @Column(nullable = true)
    private String elaboration;

    @Column(nullable = false, columnDefinition = "BOOLEAN DEFAULT false")
    // Change to BIT DEFAULT 0 for SQL Server
    private boolean isCustom = false;

    // Recipes made by nutritionists are not associated with any user
    @ManyToOne(optional = true)
    @JsonBackReference
    private User user;

    @ManyToMany
    @JoinTable(name = "recipe_allergen", joinColumns = @JoinColumn(name = "recipe_id"), inverseJoinColumns = @JoinColumn(name = "allergen_id"))
    private List<Allergen> allergens = new ArrayList<>();

    @ManyToMany(mappedBy = "recipes", cascade = CascadeType.ALL)
    private List<Intake> intakes = new ArrayList<>();

    public Recipe() {
    }

    public Recipe(RecipeCreateDTO dto) {
        this.name = dto.getName();
        this.description = dto.getDescription();
        this.ingredients = dto.getIngredients();
        this.minRecommendedAge = dto.getMinRecommendedAge();
        this.maxRecommendedAge = dto.getMaxRecommendedAge();
        this.elaboration = dto.getElaboration();
        this.isCustom = dto.isCustom();
    }

    public Recipe(CustomRecipeDTO custom) {
        this.name = custom.getName();
        this.description = custom.getDescription();
        this.recipePhoto = custom.getRecipePhoto();
        this.ingredients = custom.getIngredients();
        this.minRecommendedAge = custom.getMinRecommendedAge();
        this.maxRecommendedAge = custom.getMaxRecommendedAge();
        this.elaboration = custom.getElaboration();
        this.isCustom = true;
        this.allergens = custom.getAllergens();
    }

}
