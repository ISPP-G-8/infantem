package com.isppG8.infantem.infantem.vaccine;

import java.time.LocalDate;

import org.springframework.format.annotation.DateTimeFormat;

import com.fasterxml.jackson.annotation.JsonIdentityInfo;
import com.fasterxml.jackson.annotation.ObjectIdGenerators;
import com.isppG8.infantem.infantem.baby.Baby;

import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.ManyToOne;
import jakarta.persistence.Table;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;
import jakarta.validation.constraints.PastOrPresent;
import lombok.Getter;
import lombok.Setter;

@Entity
@Table(name = "vaccine_table")
@Getter
@Setter
@JsonIdentityInfo(scope = Vaccine.class, generator = ObjectIdGenerators.PropertyGenerator.class, property = "id")

public class Vaccine {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @NotBlank
    private String type;

    @DateTimeFormat(pattern = "yyyy/MM/dd")
    @PastOrPresent
    @NotNull
    private LocalDate vaccinationDate;

    @ManyToOne
    @JoinColumn(name = "baby_id")
    @NotNull
    private Baby baby;
}
