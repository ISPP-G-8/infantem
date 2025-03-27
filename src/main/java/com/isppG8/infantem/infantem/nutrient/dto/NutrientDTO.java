package com.isppG8.infantem.infantem.nutrient.dto;

import lombok.Getter;
import lombok.Setter;

import com.isppG8.infantem.infantem.nutrient.Nutrient;
import com.isppG8.infantem.infantem.nutrient.NutrientType;

@Getter
@Setter
public class NutrientDTO {

    private Long id;

    private String name;

    private NutrientType type;

    private String unit;

    public NutrientDTO() {

    }

    public NutrientDTO(Nutrient nutrient) {
        this.id = nutrient.getId();
        this.name = nutrient.getName();
        this.type = nutrient.getType();
        this.unit = nutrient.getUnit();
    }

}
