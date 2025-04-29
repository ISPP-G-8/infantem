package com.isppG8.infantem.infantem.vaccine;

import java.time.LocalDate;
import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import com.isppG8.infantem.infantem.baby.BabyRepository;
import com.isppG8.infantem.infantem.exceptions.ResourceNotFoundException;
import com.isppG8.infantem.infantem.user.User;
import com.isppG8.infantem.infantem.user.UserService;
import com.isppG8.infantem.infantem.vaccine.dto.VaccineSummary;

@Service
public class VaccineService {

    private final VaccineRepository vaccineRepository;

    private final UserService userService;

    @Autowired
    public VaccineService(VaccineRepository vaccineRepository, BabyRepository babyRepository, UserService userService) {
        this.vaccineRepository = vaccineRepository;
        this.userService = userService;
    }

    @Transactional(readOnly = true)
    public List<Vaccine> getAll() {
        User user = this.userService.findCurrentUser();
        return vaccineRepository.findAllByUser(user);
    }

    @Transactional(readOnly = true)
    public Vaccine getById(Long id) {
        return this.vaccineRepository.findById(id)
                .orElseThrow(() -> new ResourceNotFoundException("Vaccine", "id", id));
    }

    @Transactional
    public Vaccine save(Vaccine vaccine) {
        return this.vaccineRepository.save(vaccine);
    }

    @Transactional
    public void delete(Long id) {
        this.vaccineRepository.findById(id).orElseThrow(() -> new ResourceNotFoundException("Vaccine", "id", id));
        this.vaccineRepository.deleteById(id);
    }

    // Methods for calendar
    public List<LocalDate> getVaccinesByBabyIdAndDate(Integer babyId, LocalDate start, LocalDate end) {
        return this.vaccineRepository.getVaccinesByBabyIdAndDate(babyId, start, end);
    }

    public List<VaccineSummary> getVaccineSummaryByBabyIdAndDate(Integer babyId, LocalDate day) {
        return this.vaccineRepository.getVaccineSummaryByBabyIdAndDate(babyId, day);
    }
}
