package com.isppG8.infantem.infantem.allergen.dto;

import java.util.List;

import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
public class AllergenAnswerDTO {

    private boolean allergy;

    private List<AllergenDTO> detectedAllergies;

    private String message;

    public AllergenAnswerDTO() {
    }

    public AllergenAnswerDTO(boolean allergy, List<AllergenDTO> detectedAllergies, String message) {
        this.allergy = allergy;
        this.detectedAllergies = detectedAllergies;
        this.message = message;
    }

}
