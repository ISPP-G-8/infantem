package com.isppG8.infantem.infantem.disease.dto;

import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
public class DiseaseSummary {
    private Integer id;
    private String name;

    public DiseaseSummary(Integer id, String name) {
        this.id = id;
        this.name = name;
    }
}
