package com.isppG8.infantem.infantem.disease.dto;

import java.time.LocalDate;
import com.isppG8.infantem.infantem.disease.Disease;

import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
public class DiseaseDTO {

    private Integer id;
    private String name;
    private LocalDate startDate;
    private LocalDate endDate;
    private String symptoms;
    private String extraObservations;

    public DiseaseDTO() {

    }

    public DiseaseDTO(Disease disease) {
        this.id = disease.getId();
        this.name = disease.getName();
        this.startDate = disease.getStartDate();
        this.endDate = disease.getEndDate();
        this.symptoms = disease.getSymptoms();
        this.extraObservations = disease.getExtraObservations();
    }
}
