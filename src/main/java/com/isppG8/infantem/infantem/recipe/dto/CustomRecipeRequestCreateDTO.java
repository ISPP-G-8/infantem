package com.isppG8.infantem.infantem.recipe.dto;

import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
public class CustomRecipeRequestCreateDTO {

    private String details;

    public String getDetails() {
        return this.details;
    }

}
