package com.isppG8.infantem.infantem.intake.dto;

import java.time.LocalDateTime;

import com.fasterxml.jackson.annotation.JsonFormat;
import com.isppG8.infantem.infantem.baby.Baby;
import com.isppG8.infantem.infantem.baby.dto.BabyNameDTO;
import com.isppG8.infantem.infantem.intake.Intake;
import com.isppG8.infantem.infantem.intake.IntakeSymptom;

import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;
import jakarta.validation.constraints.PastOrPresent;
import jakarta.validation.constraints.Size;
import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
public class IntakeDTO {

    private Long id;

    @NotNull
    @PastOrPresent
    @JsonFormat(shape = JsonFormat.Shape.STRING, pattern = "yyyy-MM-dd HH:mm:ss")

    private LocalDateTime date;

    @NotNull
    private Integer quantity;

    @NotBlank
    @Size(max = 255)
    private String observations;

    private IntakeSymptom IntakeSymptom;

    private BabyNameDTO baby;

    public IntakeDTO() {
    }

    public IntakeDTO(Intake intake) {
        this.id = intake.getId();
        this.date = intake.getDate();
        this.quantity = intake.getQuantity();
        this.observations = intake.getObservations();
        this.IntakeSymptom = intake.getIntakeSymptom();
        this.baby = new BabyNameDTO(intake.getBaby());
    }

}
