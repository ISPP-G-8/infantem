package com.isppG8.infantem.infantem.allergen.dto;

import java.util.List;

import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
public class AllergenQuestionsDTO {

    private List<Integer> answers;

    private Integer babyId;

    public AllergenQuestionsDTO() {
    }

    public AllergenQuestionsDTO(List<Integer> answers, Integer babyId) {
        this.babyId = babyId;
        this.answers = answers;
    }

}
