package com.isppG8.infantem.infantem.baby;

import org.springframework.data.repository.CrudRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;
import java.util.List;

@Repository
public interface BabyRepository extends CrudRepository<Baby, Integer> {

    @Query("SELECT b from Baby b")
    List<Baby> getAll();

}
