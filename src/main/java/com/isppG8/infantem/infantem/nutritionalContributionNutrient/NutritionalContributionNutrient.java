package com.isppG8.infantem.infantem.nutritionalContributionNutrient;

import jakarta.persistence.Entity;
import lombok.Getter;
import lombok.Setter;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.ManyToOne;
import jakarta.persistence.Table;
import com.isppG8.infantem.infantem.nutritionalContribution.NutritionalContribution;
import com.isppG8.infantem.infantem.nutrient.Nutrient;


@Entity
@Table(name = "nutritional_contribution_nutrient_table")
@Getter
@Setter
public class NutritionalContributionNutrient{

    //Id

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    //Atributos

    private Float reccomendedAmount;

    //Relaciones
    
    @ManyToOne
    private NutritionalContribution nutritionalContribution;

    @ManyToOne
    private Nutrient nutrient;


}