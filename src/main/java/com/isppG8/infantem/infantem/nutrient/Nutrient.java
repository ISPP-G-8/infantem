package com.isppG8.infantem.infantem.nutrient;

import jakarta.persistence.Entity;
import java.util.List;
import lombok.Getter;
import lombok.Setter;

import com.isppG8.infantem.infantem.foodNutrient.FoodNutrient;
import com.isppG8.infantem.infantem.nutritionalContributionNutrient.NutritionalContributionNutrient;
import com.fasterxml.jackson.annotation.JsonIdentityInfo;
import com.fasterxml.jackson.annotation.ObjectIdGenerators;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.OneToMany;
import jakarta.persistence.Table;


@Entity
@Table(name = "nutrient_table")
@JsonIdentityInfo(scope = Nutrient.class, generator = ObjectIdGenerators.PropertyGenerator.class, property = "id")
@Getter
@Setter
public class Nutrient{

    //Id

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    //Atributos

    private String name;
    private NutrientType type;
    private String unit;

    //Relaciones

    @OneToMany
    private List<FoodNutrient> foodNutrients;

    @OneToMany
    private List<NutritionalContributionNutrient> NutritionalContributionsNutrients;


}
