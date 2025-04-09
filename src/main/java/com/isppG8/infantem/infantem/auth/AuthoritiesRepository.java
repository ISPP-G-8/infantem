package com.isppG8.infantem.infantem.auth;

import java.util.Optional;

import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.CrudRepository;

import com.isppG8.infantem.infantem.user.User;

public interface AuthoritiesRepository extends CrudRepository<Authorities, String> {

    @Query("SELECT DISTINCT a FROM Authorities a WHERE a.authority = :authority")
    Optional<Authorities> findByAuthority(String authority);

    @Query("SELECT u FROM User u WHERE u.username=:username")
    User findByUsername(String username);
}
