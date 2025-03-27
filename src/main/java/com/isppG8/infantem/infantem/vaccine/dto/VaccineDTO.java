package com.isppG8.infantem.infantem.vaccine.dto;

import java.time.LocalDate;

import com.isppG8.infantem.infantem.vaccine.Vaccine;

import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
public class VaccineDTO {

    private String type;
    private LocalDate vaccinationDate;

    public VaccineDTO(Vaccine vaccine) {
        this.type = vaccine.getType();
        this.vaccinationDate = vaccine.getVaccinationDate();
    }
}
