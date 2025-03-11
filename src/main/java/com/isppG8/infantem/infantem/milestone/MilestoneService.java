package com.isppG8.infantem.infantem.milestone;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
public class MilestoneService {

    @Autowired
    private MilestoneRepository milestoneRepository;

    public List<Milestone> getAllMilestones() {
        return milestoneRepository.findAll();
    }

    public Optional<Milestone> getMilestoneById(Long id) {
        return milestoneRepository.findById(id);
    }

    public Milestone createMilestone(Milestone milestone) {
        return milestoneRepository.save(milestone);
    }

    public boolean deleteMilestone(Long id) {
        if (milestoneRepository.existsById(id)){
            milestoneRepository.deleteById(id);
            return true;
        }
        return false;
    }

    public Optional<Milestone> updateMilestone(Long id, Milestone milestoneDetails) {
        return milestoneRepository.findById(id).map(milestone -> {
            milestone.setName(milestoneDetails.getName());
            milestone.setDescription(milestoneDetails.getDescription());
            return milestoneRepository.save(milestone);
        });
    }
}
