package com.isppG8.infantem.infantem.disease;

import java.time.LocalDate;

import com.isppG8.infantem.infantem.baby.Baby;

import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.ManyToOne;
import jakarta.persistence.Table;
import lombok.Getter;
import lombok.Setter;

@Entity
@Table(name = "disease_table")
@Getter @Setter
public class Disease {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;
    private String name;
    private LocalDate startDate;
    private LocalDate endDate;
    private String symptoms;
    private String extraObservations;

    @ManyToOne
    @JoinColumn(name = "baby_id")
    private Baby baby;
}
