package com.isppG8.infantem.infantem.vaccine;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import com.isppG8.infantem.infantem.baby.Baby;
import com.isppG8.infantem.infantem.baby.BabyRepository;
import com.isppG8.infantem.infantem.exceptions.ResourceNotFoundException;
import com.isppG8.infantem.infantem.exceptions.ResourceNotOwnedException;
import com.isppG8.infantem.infantem.user.User;
import com.isppG8.infantem.infantem.user.UserService;

@Service
public class VaccineService {

    private final VaccineRepository vaccineRepository;
    private final BabyRepository babyRepository;
    private final UserService userService;

    @Autowired
    public VaccineService(VaccineRepository vaccineRepository, BabyRepository babyRepository, UserService userService) {
        this.vaccineRepository = vaccineRepository;
        this.babyRepository = babyRepository;
        this.userService = userService;
    }

    @Transactional(readOnly = true)
    public List<Vaccine> getAll() {
        return this.vaccineRepository.findAll();
    }

    @Transactional(readOnly = true)
    public Vaccine getById(Long id) {
        return this.vaccineRepository.findById(id)
                .orElseThrow(() -> new ResourceNotFoundException("Vaccine", "id", id));
    }

    @Transactional
    public Vaccine save(Vaccine vaccine) {
        checkOwnership(vaccine);
        return this.vaccineRepository.save(vaccine);
    }

    @Transactional
    public void delete(Long id) {
        this.vaccineRepository.findById(id).orElseThrow(() -> new ResourceNotFoundException("Vaccine", "id", id));
        this.vaccineRepository.deleteById(id);
    }

    private void checkOwnership(Vaccine vaccine) {
        User user = this.userService.findCurrentUser();
        Baby baby = this.babyRepository.findById(vaccine.getBaby().getId())
                .orElseThrow(() -> new ResourceNotFoundException("Baby", "id", vaccine.getBaby().getId()));
        if (!baby.getUsers().contains(user)) {
            throw new ResourceNotOwnedException(vaccine.getBaby());
        }
    }
}
