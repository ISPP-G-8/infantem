package com.isppG8.infantem.infantem.intake;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.isppG8.infantem.infantem.intake.dto.IntakeDTO;

import jakarta.validation.Valid;

@RestController
@RequestMapping("api/v1/intake")
public class IntakeController {

    private IntakeService intakeService;

    @Autowired
    public IntakeController(IntakeService intakeService) {
        this.intakeService = intakeService;
    }

    @GetMapping
    public ResponseEntity<List<IntakeDTO>> getAllIntakes() {
        List<IntakeDTO> intakes = this.intakeService.getAllIntakes().stream().map(IntakeDTO::new).toList();
        return ResponseEntity.ok(intakes);
    }

    @GetMapping("/{id}")
    public ResponseEntity<IntakeDTO> getIntakeById(@PathVariable Long id) {
        return ResponseEntity.ok(new IntakeDTO(this.intakeService.getIntakeById(id)));
    }

    @PostMapping
    public ResponseEntity<IntakeDTO> createIntake(@Valid @RequestBody Intake intake) {
        return ResponseEntity.ok(new IntakeDTO(this.intakeService.saveIntake(intake)));
    }

    @PutMapping("/{id}")
    public ResponseEntity<IntakeDTO> updateIntake(@PathVariable Long id, @Valid @RequestBody Intake intake) {
        return ResponseEntity.ok(new IntakeDTO(this.intakeService.updateIntake(id, intake)));
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Void> deleteIntake(@PathVariable Long id) {
        this.intakeService.deleteIntake(id);
        return ResponseEntity.noContent().build();
    }

}
