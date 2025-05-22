package com.isppG8.infantem.infantem.recipe.dto;

import java.util.List;

import com.fasterxml.jackson.databind.annotation.JsonDeserialize;
import com.isppG8.infantem.infantem.config.Base64ToByteArrayDeserializer;

import jakarta.validation.constraints.Max;
import jakarta.validation.constraints.Min;
import jakarta.validation.constraints.NotBlank;
import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
public class RecipeCreateDTO {
    @NotBlank(message = "El nombre no debe estar vacío")
    private String name;

    @NotBlank(message = "La descripción no debe estar vacía")
    private String description;

    @NotBlank(message = "Los ingredientes no deben estar vacíos")
    private String ingredients;

    @Min(value = 0, message = "La edad mínima recomendada no puede ser negativa")
    private Integer minRecommendedAge;

    @Max(value = 36, message = "La edad máxima recomendada no puede ser mayor de 36")
    private Integer maxRecommendedAge;

    @NotBlank(message = "La elaboración no debe estar vacía")
    private String elaboration;

    private boolean isCustom;
    private List<Long> allergens;

    @JsonDeserialize(using = Base64ToByteArrayDeserializer.class)
    private byte[] recipePhoto;
    private List<Long> intakes;
    private Long user;

    public RecipeCreateDTO() {
    }
}
