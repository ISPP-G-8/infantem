package com.isppG8.infantem.infantem.recipe;

import java.util.ArrayList;
import java.util.List;

import jakarta.validation.constraints.Max;
import jakarta.validation.constraints.Min;
import jakarta.validation.constraints.NotBlank;

import com.fasterxml.jackson.annotation.JsonBackReference;
import com.isppG8.infantem.infantem.allergen.Allergen;
import com.isppG8.infantem.infantem.foodNutrient.FoodNutrient;
import com.isppG8.infantem.infantem.intake.Intake;
import com.isppG8.infantem.infantem.user.User;
import com.fasterxml.jackson.annotation.JsonIdentityInfo;
import com.fasterxml.jackson.annotation.ObjectIdGenerators;

import jakarta.persistence.CascadeType;
import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.JoinTable;
import jakarta.persistence.ManyToMany;
import jakarta.persistence.ManyToOne;
import jakarta.persistence.OneToMany;
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

    // TODO string??? -.-
    @Column(nullable = true)
    private String photo_route;

    @Column(nullable = true)
    private String ingredients;

    @Min(0)
    private Integer minRecommendedAge;

    @Min(0)
    @Max(36)
    private Integer maxRecommendedAge;

    @Column(nullable = true)
    private String elaboration;

    // Recipes made by nutritionists are not associated with any user
    @ManyToOne(optional = true)
    @JsonBackReference
    private User user;

    @ManyToMany(mappedBy = "recipes")
    private List<Allergen> allergens = new ArrayList<>();

    @ManyToMany(mappedBy = "recipes", cascade = CascadeType.ALL)
    private List<Intake> intakes = new ArrayList<>();

    @OneToMany(mappedBy = "recipe", cascade = CascadeType.ALL, orphanRemoval = true)
    private List<FoodNutrient> foodNutrients = new ArrayList<>();
}
