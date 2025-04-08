package com.isppG8.infantem.infantem.baby.dto;

import java.time.LocalDate;

import org.springframework.format.annotation.DateTimeFormat;

import com.isppG8.infantem.infantem.baby.Baby;
import com.isppG8.infantem.infantem.baby.Genre;

import jakarta.persistence.EnumType;
import jakarta.persistence.Enumerated;
import jakarta.validation.constraints.Max;
import jakarta.validation.constraints.Min;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;
import jakarta.validation.constraints.PastOrPresent;
import jakarta.validation.constraints.Size;
import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
public class BabyDTO {

    private Integer id;

    @NotBlank
    @Size(min = 3, max = 50)
    private String name;

    @DateTimeFormat(pattern = "yyyy/MM/dd")
    @PastOrPresent
    private LocalDate birthDate;

    @NotNull
    @Enumerated(EnumType.STRING)
    private Genre genre;

    @NotNull
    private Double weight;

    @NotNull
    @Min(0)
    @Max(50)
    private Integer height;

    @NotNull
    @Min(0)
    private Integer headCircumference;

    @NotBlank
    private String foodPreference;

    public BabyDTO() {
    }

    public BabyDTO(Baby baby) {
        this.id = baby.getId();
        this.name = baby.getName();
        this.birthDate = baby.getBirthDate();
        this.genre = baby.getGenre();
        this.weight = baby.getWeight();
        this.height = baby.getHeight();
        this.headCircumference = baby.getHeadCircumference();
        this.foodPreference = baby.getFoodPreference();
    }
}
