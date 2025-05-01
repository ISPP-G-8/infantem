package com.isppG8.infantem.infantem.vaccine.dto;

import java.time.LocalDate;

import com.fasterxml.jackson.annotation.JsonFormat;
import com.isppG8.infantem.infantem.baby.dto.BabyNameDTO;
import com.isppG8.infantem.infantem.vaccine.Vaccine;

import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
public class VaccineDTO {

    // AÑADE ESTE CAMPO
    private Long id; // O el tipo de dato que uses para los IDs en tu entidad Vaccine (int o Long)

    private String type;

    @JsonFormat(pattern = "yyyy-MM-dd")
    private LocalDate vaccinationDate;

    private BabyNameDTO baby;

    public VaccineDTO(Vaccine vaccine) {
        // AÑADE ESTA LÍNEA PARA COPIAR EL ID
        this.id = vaccine.getId(); // Asegúrate de que tu entidad Vaccine tenga un método getId()

        this.type = vaccine.getType();
        this.vaccinationDate = vaccine.getVaccinationDate();
        this.baby = new BabyNameDTO(vaccine.getBaby());
    }

    // Constructor vacío por defecto (puede ser necesario para algunos frameworks)
    public VaccineDTO() {
    }
}
