package com.isppG8.infantem.infantem.foodNutrient.dto;

import lombok.Getter;
import lombok.Setter;
import com.isppG8.infantem.infantem.nutrient.dto.NutrientDTO;
import com.isppG8.infantem.infantem.foodNutrient.FoodNutrient;

@Getter
@Setter
public class FoodNutrientDTO {

    private Long id;

    private Float amount;

    private NutrientDTO nutrient;

    private Long recipe;

    public FoodNutrientDTO() {

    }

    public FoodNutrientDTO(FoodNutrient foodNutrient) {
        this.id = foodNutrient.getId();
        this.amount = foodNutrient.getAmount();
        this.recipe = foodNutrient.getRecipe().getId();
        this.nutrient = new NutrientDTO(foodNutrient.getNutrient());
    }
}
