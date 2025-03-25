package com.isppG8.infantem.infantem.disease;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import com.isppG8.infantem.infantem.user.User;
import com.isppG8.infantem.infantem.baby.Baby;
import com.isppG8.infantem.infantem.baby.BabyRepository;
import com.isppG8.infantem.infantem.exceptions.ResourceNotFoundException;
import com.isppG8.infantem.infantem.exceptions.ResourceNotOwnedException;
import com.isppG8.infantem.infantem.user.UserService;

@Service
public class DiseaseService {

    private final DiseaseRepository diseaseRepository;
    private final UserService userService;
    private final BabyRepository babyRepository;

    @Autowired
    public DiseaseService(DiseaseRepository repository, UserService userService, BabyRepository babyRepository) {
        this.diseaseRepository = repository;
        this.userService = userService;
        this.babyRepository = babyRepository;
    }

    @Transactional(readOnly = true)
    public List<Disease> getAll() {
        return diseaseRepository.findAll();
    }

    @Transactional(readOnly = true)
    public Disease getById(Long id) {
        return diseaseRepository.findById(id).orElseThrow(() -> new ResourceNotFoundException("Disease", "id", id));
    }

    @Transactional
    public Disease save(Disease disease) {
        return diseaseRepository.save(disease);
    }

    @Transactional
    public Disease update(Long id, Disease disease) {
        checkOwnership(disease);
        return diseaseRepository.findById(id).map(existingDisease -> {
            existingDisease.setName(disease.getName());
            existingDisease.setStartDate(disease.getStartDate());
            existingDisease.setEndDate(disease.getEndDate());
            existingDisease.setSymptoms(disease.getSymptoms());
            existingDisease.setExtraObservations(disease.getExtraObservations());
            return diseaseRepository.save(existingDisease);
        }).orElseThrow(() -> new ResourceNotFoundException("Disease", "id", id));
    }

    @Transactional
    public void delete(Long id) {
        if (this.diseaseRepository.existsById(id)) {
            throw new ResourceNotFoundException("Disease", "id", id);
        }
        diseaseRepository.deleteById(id);
    }

    private void checkOwnership(Disease disease) {
        User user = this.userService.findCurrentUser();
        Baby baby = this.babyRepository.findById(disease.getBaby().getId())
                .orElseThrow(() -> new ResourceNotFoundException("Baby", "id", disease.getBaby().getId()));
        if (!baby.getUsers().contains(user)) {
            throw new ResourceNotOwnedException(disease.getBaby());
        }
    }
}
