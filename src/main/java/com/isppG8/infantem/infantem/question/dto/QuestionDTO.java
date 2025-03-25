package com.isppG8.infantem.infantem.question.dto;

import com.isppG8.infantem.infantem.question.Question;

import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
public class QuestionDTO{
	
    private Long id;

    private Integer question;

    private Boolean answer;

    private String recipe;

    private String baby;

    public QuestionDTO() {

    }

    public QuestionDTO(Question question) {
	this.id = question.getId();
	this.answer = question.getAnswer();
	this.question = question.getQuestion();
	this.recipe = question.getRecipe().getName();
	this.baby = question.getBaby().getName();
    }
}

