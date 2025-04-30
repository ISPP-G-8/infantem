package com.isppG8.infantem.infantem.disease.dto;

import java.util.List;

import com.isppG8.infantem.infantem.baby.dto.BabyDTO;
import com.isppG8.infantem.infantem.disease.Disease;

import java.time.LocalDate;
import java.util.ArrayList;

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

    private BabyDTO baby;

    public DiseaseDTO() {
    }

    public DiseaseDTO(Disease disease) {
        this.id = disease.getId();
        this.name = disease.getName();
        this.startDate = disease.getStartDate();
        this.endDate = disease.getEndDate();
        this.symptoms = disease.getSymptoms();
        this.extraObservations = disease.getExtraObservations();
        if (disease.getBaby() != null)
            this.baby = new BabyDTO(disease.getBaby());
    }

}
