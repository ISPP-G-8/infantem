package com.isppG8.infantem.infantem.advertisement;

import java.util.List;
import java.util.Optional;

import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.CrudRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface AdvertisementRepository extends CrudRepository<Advertisement, Long> {

    @Query("SELECT a FROM Advertisement a")
    public List<Advertisement> findAllAdvertisements();

    @Query("SELECT a FROM Advertisement a WHERE a.companyName = :companyName")
    public List<Advertisement> findAdvertisementsByCompanyName(String companyName);

    // I used native SQL since JPQL doesn't support LIMIT (as far as I know).
    // I felt it was better to handle it at the SQL level rather than filtering in Java.
    // If you find a better approach, please let me know. Javier
    @Query(value = "SELECT * FROM advertisement_table WHERE NOT is_completed ORDER BY (time_seen / NULLIF(max_minutes, 0)) LIMIT 1",
            nativeQuery = true)
    public Optional<Advertisement> findAdvertisementToShow();
}
