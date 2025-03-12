package com.isppG8.infantem.infantem.disease;

import java.time.LocalDate;
import java.util.List;

import com.isppG8.infantem.infantem.baby.Baby;

import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.JoinTable;
import jakarta.persistence.ManyToMany;
import jakarta.persistence.Table;
import jakarta.validation.constraints.Size;
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

    @ManyToMany
    @JoinTable(
        name = "vaccine_baby",
        joinColumns = @JoinColumn(name = "baby_id"),
        inverseJoinColumns = @JoinColumn(name = "disease_id")
    )
    @Size(min = 1)
    private List<Baby> babies;
}
