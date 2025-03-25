package com.isppG8.infantem.infantem.question;

import com.isppG8.infantem.infantem.recipe.Recipe;
import com.isppG8.infantem.infantem.baby.Baby;
import java.util.List;
import java.util.Set;

import jakarta.validation.constraints.NotNull;

import jakarta.persistence.CascadeType;
import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.ManyToOne;
import lombok.Getter;
import lombok.Setter;

@Entity
@Getter
@Setter
public class Question {

    @Id
    @GeneratedValue(strategy = GenerationType.SEQUENCE, generator = "entity_seq")
    private Long Id;

    @NotNull
    private Integer question;

    @NotNull
    private Boolean answer;

    // Relaciones

    @ManyToOne
    private Recipe recipe;

    @ManyToOne
    private Baby baby;

}
