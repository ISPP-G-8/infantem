package com.isppG8.infantem.infantem.question;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import com.isppG8.infantem.infantem.baby.BabyService;
import com.isppG8.infantem.infantem.user.UserService;
import com.isppG8.infantem.infantem.baby.Baby;
import com.isppG8.infantem.infantem.user.User;
import com.isppG8.infantem.infantem.exceptions.ResourceNotOwnedException;
import com.isppG8.infantem.infantem.exceptions.ResourceNotFoundException;
import java.util.List;
import java.util.Optional;

@Service
public class QuestionService {

    @Autowired
    private QuestionRepository questionRepository;

    @Autowired
    private BabyService babyService;

    @Autowired
    private UserService userService;

    public List<Question> getQuestionsByBabyId(int babyId) {
        if (babyService.findById(babyId) == null) {
            throw new ResourceNotFoundException("Baby doesn't exist");
        }
        return questionRepository.findByBabyId(babyId);
    }

    public Question createQuestion(Question question) {
        User currentUser = this.userService.findCurrentUser();
        Baby questionBaby = question.getBaby();
        System.out.println(questionBaby.getName().toString());
        if (!currentUser.getBabies().contains(questionBaby)) {
            throw new ResourceNotOwnedException("Not your baby");
        }
        return questionRepository.save(question);
    }

    public Question findQuestionById(Long id) {
        User currentUser = this.userService.findCurrentUser();
        Question question = questionRepository.findQuestionById(id).orElse(null);
        if (question == null) {
            throw new ResourceNotFoundException("Question doesn't exist");
        }
        if (!question.getBaby().getUsers().contains(currentUser)) {
            throw new ResourceNotOwnedException("Not your baby");
        }
        return question;
    }
}
