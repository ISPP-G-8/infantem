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

    public MetricSummary(Integer id, Double weight, Double height, Double headCircumference) {
        this.id = id;
        this.weight = weight;
        this.height = height;
        this.headCircumference = headCircumference;
    }
}
