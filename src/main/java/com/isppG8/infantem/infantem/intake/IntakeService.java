package com.isppG8.infantem.infantem.intake;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import com.isppG8.infantem.infantem.baby.Baby;
import com.isppG8.infantem.infantem.baby.BabyService;
import com.isppG8.infantem.infantem.exceptions.ResourceNotFoundException;
import com.isppG8.infantem.infantem.exceptions.ResourceNotOwnedException;
import com.isppG8.infantem.infantem.user.User;
import com.isppG8.infantem.infantem.user.UserService;

@Service
public class IntakeService {

    private final IntakeRepository intakeRepository;
    private final UserService userService;
    private final BabyService babyService;

    @Autowired
    public IntakeService(IntakeRepository intakeRepository, UserService userService, BabyService babyService) {
        this.intakeRepository = intakeRepository;
        this.userService = userService;
        this.babyService = babyService;
    }

    public List<Intake> getAllIntakes() {
        User user = this.userService.findCurrentUser();
        return this.intakeRepository.findAllByUser(user);
    }

    @Transactional(readOnly = true)
    public Intake getIntakeById(Long id) {
        Intake intake = this.intakeRepository.findById(id)
                .orElseThrow(() -> new ResourceNotFoundException("Intake", "id", id)); // Ensure this is executed first
        checkOwnerShip(intake);
        return intake;
    }

    @Transactional
    public Intake saveIntake(Intake intake) {
        checkOwnerShip(intake);
        return this.intakeRepository.save(intake);
    }

    @Transactional
    public Intake updateIntake(Long id, Intake intake) {
        checkOwnerShip(intake);
        return this.intakeRepository.findById(id).map(existingIntake -> {
            existingIntake.setDate(intake.getDate());
            existingIntake.setQuantity(intake.getQuantity());
            existingIntake.setObservations(intake.getObservations());
            existingIntake.setRecipes(intake.getRecipes());
            existingIntake.setIntakeSymptom(intake.getIntakeSymptom());
            return this.intakeRepository.save(existingIntake);
        }).orElseThrow(() -> new ResourceNotFoundException("Intake", "id", intake.getId()));
    }

    @Transactional
    public void deleteIntake(Long id) {
        if (!this.intakeRepository.existsById(id)) {
            throw new ResourceNotFoundException("Intake", "id", id);
        } else {
            Intake intake = this.intakeRepository.findById(id).get();
            checkOwnerShip(intake);
            this.intakeRepository.deleteById(id);
        }
    }

    private void checkOwnerShip(Intake intake) {
        User user = this.userService.findCurrentUser();
        Baby baby = this.babyService.findById(intake.getBaby().getId());
        if (!baby.getUsers().contains(user)) {
            throw new ResourceNotOwnedException(intake.getBaby());
        }

    }
}
