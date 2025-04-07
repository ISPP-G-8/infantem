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
    public Baby findById(int id) throws ResourceNotFoundException, ResourceNotOwnedException {
        Integer userId = userService.findCurrentUserId();

        Optional<Baby> optionalBaby = babyRepository.findById(id);

        Baby baby = optionalBaby.orElseThrow(() -> new ResourceNotFoundException("Baby", "id", id));

        if (!checkOwnership(baby, userId)) {
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
        baby.setHeadCircumference(babyDTO.getHeadCircumference());
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
    public Baby updateBaby(int id, BabyDTO updatedBaby) {

        Baby existingBaby = babyRepository.findById(id)
                .orElseThrow(() -> new ResourceNotFoundException("Baby", "id", id));

        User user = userService.findCurrentUser();

        if (!checkOwnership(existingBaby, user.getId())) {
            throw new ResourceNotOwnedException(existingBaby);
        }

        existingBaby.setName(updatedBaby.getName());
        existingBaby.setBirthDate(updatedBaby.getBirthDate());
        existingBaby.setGenre(updatedBaby.getGenre());
        existingBaby.setWeight(updatedBaby.getWeight());
        existingBaby.setHeight(updatedBaby.getHeight());
        existingBaby.setHeadCircumference(updatedBaby.getHeadCircumference());
        existingBaby.setFoodPreference(updatedBaby.getFoodPreference());

        return babyRepository.save(existingBaby);
    }

    @Transactional
    public void deleteBaby(int id) {
        Integer userId = userService.findCurrentUserId();
        Baby storedBaby = babyRepository.findById(id)
                .orElseThrow(() -> new ResourceNotFoundException("Baby", "id", id));
        if (!checkOwnership(storedBaby, userId)) {
            throw new ResourceNotOwnedException(storedBaby);
        }
        babyRepository.deleteById(id);
    }

    private Boolean checkOwnership(Baby baby, Integer userId) {
        return baby.getUsers().stream().anyMatch(user -> user.getId().equals(userId));
    }
}
