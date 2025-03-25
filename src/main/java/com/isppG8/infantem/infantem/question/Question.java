package com.isppG8.infantem.infantem.question;

import com.isppG8.infantem.infantem.intake.Food;
import com.isppG8.infantem.infantem.baby.Baby;
import java.util.List;
import java.util.Set;

import javax.validation.constraints.NotNull;

import jakarta.persistence.CascadeType;
import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.ManyToMany;
import jakarta.persistence.ManyToOne;
import lombok.Getter;
import lombok.Setter;

@Entity
@Getter
@Setter
public class Question {

    @Id
    @GeneratedValue(strategy = GenerationType.SEQUENCE	, generator = "entity_seq")
    private Integer Id;

    @NotNull
    private Integer question;

    @NotNull
    private Integer answer;

    //Relaciones

    @ManyToMany
    private Set<Food> food;

    @ManyToOne
    private Baby baby;

}

