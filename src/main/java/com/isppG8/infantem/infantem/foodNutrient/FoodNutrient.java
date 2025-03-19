package com.isppG8.infantem.infantem.foodNutrient;

import jakarta.persistence.Entity;
import lombok.Getter;
import lombok.Setter;
import com.fasterxml.jackson.annotation.JsonIdentityInfo;
import com.fasterxml.jackson.annotation.ObjectIdGenerators;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.ManyToOne;
import jakarta.persistence.Table;
import com.isppG8.infantem.infantem.nutrient.Nutrient;
import com.isppG8.infantem.infantem.recipe.Recipe;


@Entity
@Table(name = "food_nutrient_table")
@JsonIdentityInfo(scope = FoodNutrient.class, generator = ObjectIdGenerators.PropertyGenerator.class, property = "id")
@Getter
@Setter
public class FoodNutrient{

    //Id

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    //Atributos

    private Float amount;

    //Relaciones

    @ManyToOne
    private Nutrient nutrient;

    @ManyToOne
    private Recipe recipe;


}
