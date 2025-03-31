package com.isppG8.infantem.infantem.intake;

import java.time.LocalDateTime;
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
import jakarta.persistence.JoinColumn;
import jakarta.persistence.JoinTable;
import jakarta.persistence.ManyToMany;
import jakarta.persistence.ManyToOne;
import jakarta.persistence.OneToOne;
import jakarta.persistence.Table;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;
import jakarta.validation.constraints.PastOrPresent;
import jakarta.validation.constraints.Positive;
import jakarta.validation.constraints.Size;
import lombok.Getter;
import lombok.Setter;

@Entity
@Table(name = "intake_table")
@Getter
@Setter
@JsonIdentityInfo(scope = Intake.class, generator = ObjectIdGenerators.PropertyGenerator.class, property = "id")
public class Intake {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @NotNull
    @PastOrPresent
    private LocalDateTime date;

    @NotNull
    @Positive
    private Integer quantity;

    @NotBlank
    @Size(max = 255)
    private String observations;

    @ManyToMany
    @JoinTable(name = "intake_recipe", joinColumns = @JoinColumn(name = "intake_id"), inverseJoinColumns = @JoinColumn(name = "recipe_id"))
    @Size(min = 1)
    private List<Recipe> recipes = new ArrayList<>();

    @OneToOne
    private IntakeSymptom IntakeSymptom;

    @NotNull
    @ManyToOne
    @JoinColumn(name = "baby_id")
    private Baby baby;
}
