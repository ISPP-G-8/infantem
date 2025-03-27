package com.isppG8.infantem.infantem.intake.dto;

import java.time.LocalTime;
import java.util.List;

import com.isppG8.infantem.infantem.intake.Intake;
import com.isppG8.infantem.infantem.recipe.Recipe;

import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
public class IntakeSummary {
    private Long id;
    private LocalTime date;
    private List<String> recipeNames;

    public IntakeSummary(Intake intake) {
        this.id = intake.getId();
        this.date = intake.getDate().toLocalTime();
        this.recipeNames = intake.getRecipes().stream().map(Recipe::getName).toList();
    }
}
