package com.isppG8.infantem.infantem.metric.dto;

import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
public class MetricSummary {
    private Integer id;
    private Double weight;
    private Double height;
    private Double headCircumference;
    private Double armCircumference;

    public MetricSummary(Integer id, Double weight, Double height, Double headCircumference, Double armCircumference) {
        this.id = id;
        this.weight = weight;
        this.height = height;
        this.headCircumference = headCircumference;
        this.armCircumference = armCircumference;
    }
}
