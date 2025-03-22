package com.isppG8.infantem.infantem.allergen.dto;

import com.isppG8.infantem.infantem.allergen.Allergen;

import jakarta.validation.constraints.NotBlank;
import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
public class AllergenDTO {

    private Long id;

    @NotBlank
    private String name;

    @NotBlank
    private String description;

    public AllergenDTO() {
    }

    public AllergenDTO(Allergen allergen) {
        this.id = allergen.getId();
        this.name = allergen.getName();
        this.description = allergen.getDescription();
    }

}
