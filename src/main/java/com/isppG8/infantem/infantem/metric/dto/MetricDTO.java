package com.isppG8.infantem.infantem.metric.dto;

import lombok.Getter;
import lombok.Setter;
import java.time.LocalDate;

import com.isppG8.infantem.infantem.baby.Baby;

@Getter
@Setter
public class MetricDTO {
    private Integer id;
    private Double weight;
    private Double height;
    private Double headCircumference;
    private Double armCircumference;
    private LocalDate date;
    private Baby baby;

    public MetricDTO(Integer id, Double weight, Double height, Double headCircumference, Double armCircumference,
            LocalDate date) {
        this.id = id;
        this.weight = weight;
        this.height = height;
        this.headCircumference = headCircumference;
        this.armCircumference = armCircumference;
        this.date = date;
    }
}
