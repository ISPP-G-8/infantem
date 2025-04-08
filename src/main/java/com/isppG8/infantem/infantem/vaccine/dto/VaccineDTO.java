package com.isppG8.infantem.infantem.vaccine.dto;

import java.time.LocalDate;

import com.fasterxml.jackson.annotation.JsonFormat;
import com.isppG8.infantem.infantem.vaccine.Vaccine;

import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
public class VaccineDTO {

    private String type;

    @JsonFormat(pattern = "yyyy-MM-dd")
    private LocalDate vaccinationDate;

    public VaccineDTO(Vaccine vaccine) {
        this.type = vaccine.getType();
        this.vaccinationDate = vaccine.getVaccinationDate();
    }
}
