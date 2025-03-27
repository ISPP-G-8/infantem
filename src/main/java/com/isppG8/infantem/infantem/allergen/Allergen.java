package com.isppG8.infantem.infantem.allergen;

import java.util.ArrayList;
import java.util.List;

import com.fasterxml.jackson.annotation.JsonIdentityInfo;
import com.fasterxml.jackson.annotation.ObjectIdGenerators;
import com.isppG8.infantem.infantem.baby.Baby;
import com.isppG8.infantem.infantem.recipe.Recipe;

import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.JoinTable;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.ManyToMany;
import jakarta.validation.constraints.NotBlank;
import lombok.Getter;
import lombok.Setter;

@Entity
@Getter
@Setter
@JsonIdentityInfo(scope = Allergen.class, generator = ObjectIdGenerators.PropertyGenerator.class, property = "id")

public class Allergen {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @NotBlank
    private String name;

    @NotBlank
    private String description;

    @ManyToMany
    @JoinTable(name = "recipe_allergen", joinColumns = @JoinColumn(name = "recipe_id"), inverseJoinColumns = @JoinColumn(name = "allergen_id"))
    private List<Recipe> recipes = new ArrayList<>();

    @ManyToMany
    @JoinTable(name = "baby_allergen", joinColumns = @JoinColumn(name = "baby_id"), inverseJoinColumns = @JoinColumn(name = "allergen_id"))
    private List<Baby> babies = new ArrayList<>();

}
