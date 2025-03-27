package com.isppG8.infantem.infantem.milestoneCompleted;

import java.util.List;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("api/v1/milestonesCompleted")
public class MilestoneCompletedController {

    @Autowired
    private MilestoneCompletedService milestoneCompletedService;

    @GetMapping
    public List<MilestoneCompleted> getAllMilestonesCompleted() {
        return milestoneCompletedService.getAllMilestonesCompleted();
    }

    @GetMapping("/milestone/{milestoneId}")
    public List<MilestoneCompleted> getMilestonesCompletedByMilestoneId(@PathVariable Long milestoneId) {
        return milestoneCompletedService.getMilestonesCompletedByMilestoneId(milestoneId);
    }

    @PostMapping
    public MilestoneCompleted createMilestoneCompleted(@RequestBody MilestoneCompleted milestoneCompleted) {
        return milestoneCompletedService.createMilestoneCompleted(milestoneCompleted);
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Void> deleteMilestoneCompleted(@PathVariable Long id) {
        milestoneCompletedService.deleteMilestoneCompleted(id);
        return ResponseEntity.noContent().build();
    }
}
