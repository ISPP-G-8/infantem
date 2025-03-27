package com.isppG8.infantem.infantem.intake.dto;

import java.time.LocalDateTime;

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
    private LocalDateTime date;

    @NotNull
    private Integer quantity;

    @NotBlank
    @Size(max = 255)
    private String observations;

    private IntakeSymptom IntakeSymptom;

    public IntakeDTO() {
    }

    public IntakeDTO(Intake Intake) {
        this.id = Intake.getId();
        this.date = Intake.getDate();
        this.quantity = Intake.getQuantity();
        this.observations = Intake.getObservations();
        this.IntakeSymptom = Intake.getIntakeSymptom();
    }

}
