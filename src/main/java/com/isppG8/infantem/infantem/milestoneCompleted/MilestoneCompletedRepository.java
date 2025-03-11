package com.isppG8.infantem.infantem.milestoneCompleted;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;
import java.util.List;

@Repository
public interface MilestoneCompletedRepository extends JpaRepository<MilestoneCompleted, Long> {
    List<MilestoneCompleted> findByMilestoneId(Long milestoneId);
}
