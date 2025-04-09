package com.isppG8.infantem.infantem.metric;

import java.time.LocalDate;

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
import jakarta.validation.constraints.Max;
import jakarta.validation.constraints.Min;
import jakarta.validation.constraints.NotNull;
import jakarta.validation.constraints.PastOrPresent;
import lombok.Getter;
import lombok.Setter;

@Entity
@Table(name = "metric_table")
@Getter
@Setter
@JsonIdentityInfo(scope = Metric.class, generator = ObjectIdGenerators.PropertyGenerator.class, property = "id")
public class Metric {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Integer id;

    @Min(0)
    @Max(30)
    private Double weight;

    @Min(0)
    @Max(130)
    private Double height;

    @Min(0)
    @Max(60)
    private Double headCircumference;

    @Min(0)
    @Max(21)
    private Double armCircumference;

    @PastOrPresent
    private LocalDate date;

    @ManyToOne
    @NotNull
    @JoinColumn(name = "baby_id")
    private Baby baby;
}
