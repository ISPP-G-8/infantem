package com.isppG8.infantem.infantem.foodSource;

import jakarta.persistence.Entity;
import lombok.Getter;
import lombok.Setter;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.OneToMany;
import jakarta.persistence.Table;
import java.util.List;
import com.isppG8.infantem.infantem.nutritionalContributionFoodSource.NutritionalContributionFoodSource;


@Entity
@Table(name = "food_source_table")
@Getter
@Setter
public class FoodSource{

    //Id

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    //Atributos

    private FoodSourceType type;

    //Relaciones

    @OneToMany
    private List<NutritionalContributionFoodSource> nutritionalContributionFoodSources;


}