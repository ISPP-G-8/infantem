package com.isppG8.infantem.infantem.baby;

import java.util.ArrayList;
import java.util.List;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import com.isppG8.infantem.infantem.baby.dto.BabyDTO;
import com.isppG8.infantem.infantem.exceptions.ResourceNotFoundException;
import com.isppG8.infantem.infantem.exceptions.ResourceNotOwnedException;
import com.isppG8.infantem.infantem.user.User;
import com.isppG8.infantem.infantem.user.UserService;

@Service
public class BabyService {

    private final BabyRepository babyRepository;

    private final UserService userService;

    @Autowired
    public BabyService(BabyRepository babyRepository, UserService userService) {
        this.babyRepository = babyRepository;
        this.userService = userService;
    }

    @Transactional(readOnly = true)
    public List<Baby> findBabiesByUser() {
        User user = userService.findCurrentUser();
        return user.getBabies();
    }

    @Transactional(readOnly = true)
    public Baby findById(int id) {
        User user = userService.findCurrentUser();

        Optional<Baby> optionalBaby = babyRepository.findById(id);

        Baby baby = optionalBaby.orElseThrow(() -> new ResourceNotFoundException("Baby", "id", id));

        if (!baby.getUsers().contains(user)) {
            throw new ResourceNotOwnedException(baby);
        }

        return baby;
    }

    @Transactional
    public Baby createBaby(BabyDTO babyDTO) {
        Baby baby = new Baby();
        baby.setName(babyDTO.getName());
        baby.setBirthDate(babyDTO.getBirthDate());
        baby.setGenre(babyDTO.getGenre());
        baby.setWeight(babyDTO.getWeight());
        baby.setHeight(babyDTO.getHeight());
        baby.setCephalicPerimeter(babyDTO.getCephalicPerimeter());
        baby.setFoodPreference(babyDTO.getFoodPreference());

        // Añadir el usuario actual
        User currentUser = userService.findCurrentUser();
        if (baby.getUsers() == null) {
            baby.setUsers(new ArrayList<>());
        }
        baby.getUsers().add(currentUser);

        return babyRepository.save(baby);
    }

    @Transactional
    public Baby updateBaby(int id, Baby updatedBaby) {

        Baby existingBaby = babyRepository.findById(id)
                .orElseThrow(() -> new ResourceNotFoundException("Baby", "id", id));

        User user = userService.findCurrentUser();

        if (!existingBaby.getUsers().contains(user)) {
            throw new ResourceNotOwnedException(existingBaby);
        }

        existingBaby.setName(updatedBaby.getName());
        existingBaby.setBirthDate(updatedBaby.getBirthDate());
        existingBaby.setGenre(updatedBaby.getGenre());
        existingBaby.setWeight(updatedBaby.getWeight());
        existingBaby.setHeight(updatedBaby.getHeight());
        existingBaby.setCephalicPerimeter(updatedBaby.getCephalicPerimeter());
        existingBaby.setFoodPreference(updatedBaby.getFoodPreference());
        existingBaby.setAllergen(updatedBaby.getAllergen());
        existingBaby.setIntakes(updatedBaby.getIntakes());
        existingBaby.setNutritionalContribution(updatedBaby.getNutritionalContribution());
        existingBaby.setMilestonesCompleted(updatedBaby.getMilestonesCompleted());

        existingBaby.getSleep().clear();
        if (updatedBaby.getSleep() != null) {
            existingBaby.getSleep().addAll(updatedBaby.getSleep());
        }

        return babyRepository.save(existingBaby);
    }

    @Transactional
    public void deleteBaby(int id) {
        if (!babyRepository.existsById(id)) {
            throw new ResourceNotFoundException("Baby", "id", id);
        }
        babyRepository.deleteById(id);
    }
}
