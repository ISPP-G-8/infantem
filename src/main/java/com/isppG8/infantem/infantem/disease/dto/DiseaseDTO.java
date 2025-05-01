package com.isppG8.infantem.infantem.disease.dto;

import com.fasterxml.jackson.annotation.JsonFormat;
import com.isppG8.infantem.infantem.baby.dto.BabyDTO;
import com.isppG8.infantem.infantem.disease.Disease;

import java.time.LocalDate;

import jakarta.validation.constraints.NotNull;
import jakarta.validation.constraints.PastOrPresent;

import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
public class DiseaseDTO {

    private Integer id;

    private String name;

    @NotNull
    @PastOrPresent
    @JsonFormat(shape = JsonFormat.Shape.STRING, pattern = "yyyy-MM-dd")
    private LocalDate startDate;

    @NotNull
    @PastOrPresent
    @JsonFormat(shape = JsonFormat.Shape.STRING, pattern = "yyyy-MM-dd")
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
