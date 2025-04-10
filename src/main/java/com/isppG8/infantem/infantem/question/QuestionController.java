package com.isppG8.infantem.infantem.question;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.PathVariable;

import com.isppG8.infantem.infantem.question.dto.QuestionDTO;

@RestController
@RequestMapping("api/v1/questions")
public class QuestionController {

    @Autowired
    private QuestionService questionService;

    @PostMapping
    public Question createQuestion(@RequestBody Question question) {
        return questionService.createQuestion(question);
    }

    @GetMapping("/{id}")
    public QuestionDTO findQuestionById(@PathVariable Long id) {
        Question question = questionService.findQuestionById(id);
        return new QuestionDTO(question);
    }

}
