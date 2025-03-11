package com.isppG8.infantem.infantem.intake;

import java.time.LocalDateTime;

import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.ManyToOne;
import jakarta.persistence.Table;
import lombok.Getter;
import lombok.Setter;

@Entity
@Table(name = "intake_table")
@Getter
@Setter
public class Intake {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;
    private LocalDateTime date;

    private double quantity;

    private String observations;
    public String description;

    @ManyToOne
    private Food food;

    @ManyToOne
    private IntakeSymptom IntakeSymptom;
}
