package com.isppG8.infantem.infantem.dream;

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
}
