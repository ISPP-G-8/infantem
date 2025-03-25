package com.isppG8.infantem.infantem.intake;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import com.isppG8.infantem.infantem.user.User;

import java.util.List;

public interface IntakeRepository extends JpaRepository<Intake, Long> {

    @Query("SELECT i FROM Intake i WHERE i.baby.id IN (SELECT b.id FROM Baby b WHERE :user MEMBER OF b.users)")
    List<Intake> findAllByUser(@Param("user") User user);
}
