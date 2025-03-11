package com.isppG8.infantem.infantem.vaccine;

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
@Table(name= "vaccine_table")
@Getter @Setter
public class Vaccine {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;
    private String type;
    private LocalDate vaccinationDate;

    @ManyToOne
    @JoinColumn(name = "baby_id")
    private Baby baby;
}

