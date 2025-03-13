package com.isppG8.infantem.infantem.intake;

import java.time.LocalDateTime;
import java.util.ArrayList;
import java.util.List;

import jakarta.validation.constraints.NotNull;

import com.fasterxml.jackson.annotation.JsonIdentityInfo;
import com.fasterxml.jackson.annotation.ObjectIdGenerators;
import com.isppG8.infantem.infantem.baby.Baby;
import com.isppG8.infantem.infantem.recipe.Recipe;

import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.JoinTable;
import jakarta.persistence.ManyToMany;
import jakarta.persistence.ManyToOne;
import jakarta.persistence.Table;
import lombok.Getter;
import lombok.Setter;

@Entity
@Table(name = "intake_table")
@Getter
@Setter
@JsonIdentityInfo(generator = ObjectIdGenerators.PropertyGenerator.class, property = "id")
public class Intake {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;
    private LocalDateTime date;

    private double quantity;

    private String observations;
    public String description;

    @ManyToMany()
    @JoinTable(
        name = "intake_recipe",
        joinColumns = @JoinColumn(name = "intake_id"),
        inverseJoinColumns = @JoinColumn(name = "recipe_id")
    )
    @NotNull
    private List<Recipe> recipes = new ArrayList<>();

    @ManyToOne
    private IntakeSymptom IntakeSymptom;

    @ManyToOne
    @JoinColumn(name = "baby_id")
    private Baby baby;
}
