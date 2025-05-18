package com.isppG8.infantem.infantem.recipe.dto;

import java.util.List;

import com.fasterxml.jackson.databind.annotation.JsonDeserialize;
import com.isppG8.infantem.infantem.config.Base64ToByteArrayDeserializer;

import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
public class RecipeCreateDTO {
    private String name;
    private String description;
    private String ingredients;
    private Integer minRecommendedAge;
    private Integer maxRecommendedAge;
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
