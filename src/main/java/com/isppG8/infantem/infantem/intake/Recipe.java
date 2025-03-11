package com.isppG8.infantem.infantem.intake;

import java.util.List;

import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.OneToMany;
import jakarta.persistence.Table;
import lombok.Getter;
import lombok.Setter;

@Entity
@Table(name = "recipe_table")
@Getter @Setter
public class Recipe {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;
    private Integer minRecommendedAge;
    private Integer maxRecommendedAge; // range?
    private String elaboration;

    @OneToMany
    private List<IngredientRecipe> ingredients;
    
}
