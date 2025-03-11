package com.isppG8.infantem.infantem.milestoneCompleted;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
public class MilestoneCompletedService {

    @Autowired
    private MilestoneCompletedRepository milestoneCompletedRepository;

    public List<MilestoneCompleted> getAllMilestonesCompleted() {
        return milestoneCompletedRepository.findAll();
    }

    public List<MilestoneCompleted> getMilestonesCompletedByMilestoneId(Long milestoneId) {
        return milestoneCompletedRepository.findByMilestoneId(milestoneId);
    }

    public MilestoneCompleted createMilestoneCompleted(MilestoneCompleted milestoneCompleted) {
        return milestoneCompletedRepository.save(milestoneCompleted);
    }

    public void deleteMilestoneCompleted(Long id) {
        milestoneCompletedRepository.deleteById(id);
    }

    public Optional<MilestoneCompleted> updateMilestoneCompleted(Long id, MilestoneCompleted milestoneDetails) {
        return milestoneCompletedRepository.findById(id).map(milestone -> {
            milestone.setMilestone(milestoneDetails.getMilestone());
            milestone.setDate(milestoneDetails.getDate());
            return milestoneCompletedRepository.save(milestone);
        });
    }
}
