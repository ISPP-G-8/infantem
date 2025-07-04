package com.isppG8.infantem.infantem.recipe;

import java.time.LocalDateTime;
import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

@Repository
public interface CustomRecipeRequestRepository extends JpaRepository<CustomRecipeRequest, Long> {

    @Query("SELECT count(r) FROM CustomRecipeRequest r WHERE r.user.id = ?1 AND r.createdAt BETWEEN ?2 AND ?3")
    Integer countRequestsByUserIdAndDate(Integer userId, LocalDateTime start, LocalDateTime end);

    @Query("SELECT r FROM CustomRecipeRequest r WHERE r.user.id = ?1 ORDER BY r.createdAt DESC")
    List<CustomRecipeRequest> findByUserId(Integer id);

    @Query("SELECT r FROM CustomRecipeRequest r WHERE r.status = 'OPEN' ORDER BY r.createdAt DESC")
    List<CustomRecipeRequest> findAllOpen();

}
