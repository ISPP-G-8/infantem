package com.isppG8.infantem.infantem.nutritionalContribution;

import jakarta.persistence.Entity;
import lombok.Getter;
import lombok.Setter;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.OneToMany;
import jakarta.persistence.OneToOne;
import jakarta.persistence.Table;
import java.util.List;

import com.fasterxml.jackson.annotation.JsonIdentityInfo;
import com.fasterxml.jackson.annotation.ObjectIdGenerators;
import com.isppG8.infantem.infantem.baby.Baby;
import com.isppG8.infantem.infantem.nutritionalContributionFoodSource.NutritionalContributionFoodSource;
import com.isppG8.infantem.infantem.nutritionalContributionNutrient.NutritionalContributionNutrient;


@Entity
@Table(name = "nutr_contr_table")
@Getter
@Setter
@JsonIdentityInfo(generator = ObjectIdGenerators.PropertyGenerator.class, property = "id")
public class NutritionalContribution{


    //Id

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    //Atributos

    private Integer minAgeMonths;
    private Integer maxAgeMonths;

    //Relaciones

    @OneToOne
    private Baby baby;

    @OneToMany
    private List<NutritionalContributionNutrient> nutritionalContributionNutrient;

    @OneToMany
    private List<NutritionalContributionFoodSource> nutritionalContributionFoodSources;

}