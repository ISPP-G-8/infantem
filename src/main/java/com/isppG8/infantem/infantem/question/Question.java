package com.isppG8.infantem.infantem.question;

import com.isppG8.infantem.infantem.intake.Intake;
import com.isppG8.infantem.infantem.baby.Baby;

import org.hibernate.annotations.OnDelete;
import org.hibernate.annotations.OnDeleteAction;

import com.fasterxml.jackson.annotation.JsonIdentityInfo;
import com.fasterxml.jackson.annotation.ObjectIdGenerators;

import jakarta.validation.constraints.NotNull;
import jakarta.persistence.Table;
import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.ManyToOne;
import jakarta.persistence.Column;
import jakarta.persistence.JoinColumn;
import lombok.Getter;
import lombok.Setter;

@Entity
@Table(name = "question")
@JsonIdentityInfo(scope = Question.class, generator = ObjectIdGenerators.PropertyGenerator.class, property = "id")
@Getter
@Setter
public class Question {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column
    private Long Id;

    @NotNull
    @Column
    private Integer question;

    @NotNull
    @Column
    private Integer answer;

    // Relaciones

    @ManyToOne
    @JoinColumn(name = "intake_id")
    @OnDelete(action = OnDeleteAction.CASCADE)
    private Intake intake;

    @ManyToOne
    @JoinColumn(name = "baby_id")
    @OnDelete(action = OnDeleteAction.CASCADE)
    private Baby baby;

}
