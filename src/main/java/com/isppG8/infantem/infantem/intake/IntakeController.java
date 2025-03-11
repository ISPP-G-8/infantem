package com.isppG8.infantem.infantem.intake;

import java.util.List;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("api/v1/intake")
public class IntakeController {
    @Autowired
    private IntakeService intakeService;

    @GetMapping
    public List<Intake> getAllIntakes() {
        return intakeService.getAllIntakes();
    }

        @GetMapping("/{id}")
    public Optional<Intake> getIntakeById(@PathVariable Long id) {
        return intakeService.getIntakeById(id);
    }

    @PostMapping
    public Intake createIntake(@RequestBody Intake intake) {
        return intakeService.saveIntake(intake);
    }

    @DeleteMapping("/{id}")
    public void deleteIntake(@PathVariable Long id) {
        intakeService.deleteIntake(id);
    }
    
}


