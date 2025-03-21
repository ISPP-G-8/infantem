package com.isppG8.infantem.infantem.nutritionalContributionFoodSource;

import jakarta.persistence.Entity;
import lombok.Getter;
import lombok.Setter;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.ManyToOne;
import jakarta.persistence.Table;
import com.fasterxml.jackson.annotation.JsonIdentityInfo;
import com.fasterxml.jackson.annotation.ObjectIdGenerators;
import com.isppG8.infantem.infantem.nutritionalContribution.NutritionalContribution;
import com.isppG8.infantem.infantem.foodSource.FoodSource;



@Entity
@Table(name = "nutr_contr_food_source_table")
@JsonIdentityInfo(scope = NutritionalContributionFoodSource.class, generator = ObjectIdGenerators.PropertyGenerator.class, property = "id")
@Getter
@Setter
public class NutritionalContributionFoodSource{

    //Id
    
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;
    
    //Atributos

    //Relaciones

    @ManyToOne
    private FoodSource foodSource;

    @ManyToOne
    private NutritionalContribution NutritionalContribution;



}
