package com.isppG8.infantem.infantem.question;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import com.isppG8.infantem.infantem.baby.BabyService;
import java.util.List;
import java.util.Optional;

@Service
public class QuestionService {

    @Autowired
    private QuestionRepository questionRepository;
    private BabyService babyService;

    public List<Question> getQuestionsByBabyId(int babyId) {
        if (babyService.findById(babyId) == null) {
            throw new RuntimeException("Baby doesn't exist");
        }
        return questionRepository.findByBabyId(babyId);
    }

    public Question createQuestion(Question question) {
        return questionRepository.save(question);
    }
}
