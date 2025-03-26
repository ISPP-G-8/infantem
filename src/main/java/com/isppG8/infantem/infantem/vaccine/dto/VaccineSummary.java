package com.isppG8.infantem.infantem.vaccine.dto;

import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
public class VaccineSummary {
    private Long id;
    private String type;

    public VaccineSummary(Long id, String type) {
        this.id = id;
        this.type = type;
    }
}
