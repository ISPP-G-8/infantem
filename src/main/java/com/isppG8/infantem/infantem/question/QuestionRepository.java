package com.isppG8.infantem.infantem.question;

import org.springframework.data.jpa.repository.Query;
import org.springframework.data.jpa.repository.JpaRepository;
import java.util.Optional;
import java.util.List;

public interface QuestionRepository extends JpaRepository<Question, Long> {

    @Query("SELECT q FROM Question q WHERE q.baby.id = :babyId")
    List<Question> findByBabyId(int babyId);

    @Query("SELECT q FROM Question q WHERE q.id = :id")
    Optional<Question> findQuestionById(Long id);
}
