package com.isppG8.infantem.infantem.disease;

import java.time.LocalDate;

import com.fasterxml.jackson.annotation.JsonIdentityInfo;
import com.fasterxml.jackson.annotation.JsonIgnore;
import com.fasterxml.jackson.annotation.ObjectIdGenerators;
import com.isppG8.infantem.infantem.baby.Baby;

import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.JoinColumn;

import jakarta.persistence.ManyToOne;
import jakarta.persistence.Table;
import jakarta.validation.constraints.AssertTrue;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;
import jakarta.validation.constraints.PastOrPresent;

import lombok.Getter;
import lombok.Setter;

@Entity
@Table(name = "disease_table")
@Getter
@Setter
@JsonIdentityInfo(scope = Disease.class, generator = ObjectIdGenerators.PropertyGenerator.class, property = "id")
public class Disease {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Integer Id;

    @NotBlank
    private String name;

    @NotNull
    @PastOrPresent
    private LocalDate startDate;

    @NotNull
    @PastOrPresent
    private LocalDate endDate;

    @NotBlank
    private String symptoms;

    private String extraObservations;

    @ManyToOne
    @NotNull
    @JoinColumn(name = "baby_id")
    private Baby baby;

    @AssertTrue(message = "The end date must be after the start date") @JsonIgnore
    public boolean isDateValid() {
        if (startDate == null || endDate == null) {
            return true;
        }
        return endDate.isAfter(startDate);
    }
}
