package com.isppG8.infantem.infantem.metric.dto;

import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
public class MetricSummary {
    private Integer id;
    private Double weight;
    private Double height;
    private Integer cephalicPerimeter;

    public MetricSummary(Integer id, Double weight, Double height, Integer cephalicPerimeter) {
        this.id = id;
        this.weight = weight;
        this.height = height;
        this.cephalicPerimeter = cephalicPerimeter;
    }
}
