package com.isppG8.infantem.infantem.milestone;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Optional;

@RestController
@RequestMapping("/milestones")
public class MilestoneController {

    @Autowired
    private MilestoneService milestoneService;

    @GetMapping
    public List<Milestone> getAllMilestones() {
        return milestoneService.getAllMilestones();
    }

    @GetMapping("/{id}")
    public ResponseEntity<Milestone> getMilestoneById(@PathVariable Long id) {
        Optional<Milestone> milestone = milestoneService.getMilestoneById(id);
        return milestone.map(ResponseEntity::ok)
                        .orElseGet(() -> ResponseEntity.notFound().build());
    }

    @PostMapping
    public Milestone createMilestone(@RequestBody Milestone milestone) {
        return milestoneService.createMilestone(milestone);
    }

    @PutMapping("/{id}")
    public ResponseEntity<Milestone> updateMilestone(@PathVariable Long id, @RequestBody Milestone milestoneDetails) {
        Optional<Milestone> updatedMilestone = milestoneService.updateMilestone(id, milestoneDetails);
        return updatedMilestone.map(ResponseEntity::ok).orElseGet(() -> ResponseEntity.notFound().build());
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Void> deleteMilestone(@PathVariable Long id) {
        return milestoneService.deleteMilestone(id) ? ResponseEntity.noContent().build()
                                                    : ResponseEntity.notFound().build();
    }
}