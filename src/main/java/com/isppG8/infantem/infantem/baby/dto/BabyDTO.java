package com.isppG8.infantem.infantem.baby.dto;

import java.time.LocalDate;

import org.springframework.format.annotation.DateTimeFormat;

import com.isppG8.infantem.infantem.baby.Genre;

import jakarta.persistence.EnumType;
import jakarta.persistence.Enumerated;
import jakarta.validation.constraints.Max;
import jakarta.validation.constraints.Min;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;
import jakarta.validation.constraints.Size;
import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
public class BabyDTO {
   
    @NotBlank
    @Size(min = 3, max = 50)
    private String name;

    @DateTimeFormat(pattern = "yyyy/MM/dd")
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
    private Integer cephalicPerimeter;

    @NotBlank
    private String foodPreference;
}
