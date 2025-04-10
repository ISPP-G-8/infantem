package com.isppG8.infantem.infantem.question;

import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;
import org.springframework.data.repository.CrudRepository;

import java.util.Optional;
import java.util.List;

@Repository
public interface QuestionRepository extends CrudRepository<Question, Long> {

    @Query("SELECT q FROM Question q WHERE q.baby.id = :babyId")
    List<Question> findByBabyId(int babyId);

    @Query("SELECT q FROM Question q WHERE q.id = :id")
    Optional<Question> findQuestionById(Long id);
}
