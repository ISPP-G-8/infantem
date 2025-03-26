package com.isppG8.infantem.infantem.intake;

import java.time.LocalDate;
import java.time.LocalDateTime;
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

import com.isppG8.infantem.infantem.intake.dto.IntakeSummary;

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

    public List<LocalDate> getIntakesByBabyIdAndDate(Integer babyId, LocalDate start, LocalDate end) {
        LocalDateTime startDateTime = start.atStartOfDay();
        LocalDateTime endDateTime = end.atTime(23, 59, 59);
        List<LocalDateTime> intakeDates = intakeRepository.getIntakesByBabyIdAndDate(babyId, startDateTime,
                endDateTime);
        return intakeDates.stream().map(LocalDateTime::toLocalDate).toList();
    }

    public List<IntakeSummary> getIntakeSummaryByBabyIdAndDate(Integer babyId, LocalDate day) {
        LocalDateTime start = day.atStartOfDay();
        LocalDateTime end = day.atTime(23, 59, 59);
        List<Intake> intakes = this.intakeRepository.getIntakeSummaryByBabyIdAndDate(babyId, start, end);
        return intakes.stream().map(IntakeSummary::new).toList();
    }
}
