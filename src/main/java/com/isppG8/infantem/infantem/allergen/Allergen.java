package com.isppG8.infantem.infantem.allergen;


import com.isppG8.infantem.infantem.intake.IngredientRecipe;

import java.util.List;

import javax.validation.constraints.NotBlank;
import javax.validation.constraints.Size;

import jakarta.persistence.CascadeType;

import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.OneToMany;
import lombok.Getter;
import lombok.Setter;

@Entity
@Getter
@Setter
public class Allergen {

    @Id
    @GeneratedValue(strategy = GenerationType.SEQUENCE	, generator = "entity_seq")
    private Integer Id;

    @NotBlank
    @Size(min = 3, max = 100)
    private String name;

    @NotBlank
    @Size(min = 3, max = 200)
    private String description;

    //Relaciones

    @OneToMany(mappedBy = "id", cascade = CascadeType.ALL, orphanRemoval = true)
    private List<IngredientRecipe> ingredientsWithAllergen;
}


