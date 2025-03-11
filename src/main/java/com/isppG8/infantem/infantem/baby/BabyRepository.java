package com.isppG8.infantem.infantem.baby;

import org.springframework.data.repository.CrudRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface BabyRepository extends CrudRepository<Baby, Integer> {

}
