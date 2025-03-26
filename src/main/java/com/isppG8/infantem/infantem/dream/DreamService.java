package com.isppG8.infantem.infantem.dream;

import java.time.LocalDate;
import java.time.LocalDateTime;
import java.util.HashSet;
import java.util.List;
import java.util.Set;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import com.isppG8.infantem.infantem.baby.Baby;
import com.isppG8.infantem.infantem.baby.BabyRepository;
import com.isppG8.infantem.infantem.dream.dto.DreamSummary;
import com.isppG8.infantem.infantem.exceptions.ResourceNotFoundException;
import com.isppG8.infantem.infantem.exceptions.ResourceNotOwnedException;
import com.isppG8.infantem.infantem.user.User;
import com.isppG8.infantem.infantem.user.UserService;
import com.isppG8.infantem.infantem.util.Tuple;

@Service
public class DreamService {

    private final DreamRepository dreamRepository;
    private final BabyRepository babyRepository;
    private final UserService userService;

    @Autowired
    public DreamService(DreamRepository dreamRepository, UserService userService, BabyRepository babyRepository) {
        this.dreamRepository = dreamRepository;
        this.userService = userService;
        this.babyRepository = babyRepository;
    }

    @Transactional(readOnly = true)
    public List<Dream> getAllDreams() {
        return dreamRepository.findAll();
    }

    @Transactional(readOnly = true)
    public Dream getDreamById(Long id) {
        return dreamRepository.findById(id).orElseThrow(() -> new ResourceNotFoundException("Dream", "id", id));
    }

    @Transactional
    public Dream createDream(Dream dream) {
        checkOwnership(dream);
        return dreamRepository.save(dream);
    }

    @Transactional
    public Dream updateDream(Long id, Dream dreamDetails) {
        checkOwnership(dreamDetails);
        return dreamRepository.findById(id).map(dream -> {
            dream.setDateStart(dreamDetails.getDateStart());
            dream.setDateEnd(dreamDetails.getDateEnd());
            dream.setNumWakeups(dreamDetails.getNumWakeups());
            dream.setDreamType(dreamDetails.getDreamType());
            dream.setBaby(dreamDetails.getBaby());
            return dreamRepository.save(dream);
        }).orElseThrow(() -> new ResourceNotFoundException("Dream", "id", id));
    }

    @Transactional
    public void deleteDream(Long id) {
        if (!dreamRepository.existsById(id)) {
            throw new ResourceNotFoundException("Dream", "id", id);
        }
        dreamRepository.deleteById(id);
    }

    private void checkOwnership(Dream dream) {
        User user = this.userService.findCurrentUser();
        Baby baby = this.babyRepository.findById(dream.getBaby().getId())
                .orElseThrow(() -> new ResourceNotFoundException("Baby", "id", dream.getBaby().getId()));
        if (!baby.getUsers().contains(user)) {
            throw new ResourceNotOwnedException(dream.getBaby());
        }
    }

    // Methods for calendar

    @Transactional(readOnly = true)
    public Set<LocalDate> getDreamsByBabyIdAndDate(Integer babyId, LocalDate start, LocalDate end) {
        LocalDateTime startDateTime = start.atStartOfDay();
        LocalDateTime endDateTime = end.atTime(23, 59, 59);

        List<Tuple<LocalDateTime, LocalDateTime>> dreamDates = dreamRepository.findDreamDatesByBabyIdAndDate(babyId,
                startDateTime, endDateTime);

        Set<LocalDate> dates = new HashSet<>();
        for (Tuple<LocalDateTime, LocalDateTime> t : dreamDates) {
            LocalDate startDate = t.first().toLocalDate();
            LocalDate endDate = t.second().toLocalDate();

            // Check if startDate and endDate are on the same month to only add dates on the asked month
            startDate = startDate.isAfter(start) ? startDate : start;
            endDate = endDate.isBefore(end) ? endDate : end;
            while (!startDate.isAfter(endDate)) {
                dates.add(startDate);
                startDate = startDate.plusDays(1);
            }
        }

        return dates;
    }

    @Transactional(readOnly = true)
    public List<DreamSummary> getDreamSummaryByBabyIdAndDate(Integer babyId, LocalDate day) {
        LocalDateTime startDateTime = day.atStartOfDay();
        LocalDateTime endDateTime = day.atTime(23, 59, 59);
        List<Dream> dreams = dreamRepository.findDreamSummaryByBabyIdAndDate(babyId, startDateTime, endDateTime);

        return dreams.stream().map(DreamSummary::new).toList();
    }
}
