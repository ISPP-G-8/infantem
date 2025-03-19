package com.isppG8.infantem.infantem.dream;

import java.util.List;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

@Service
public class DreamService {

    @Autowired
    private DreamRepository dreamRepository;

    public List<Dream> getAllDreams() {
        return dreamRepository.findAll();
    }

    public Optional<Dream> getDreamById(Long id) {
        return dreamRepository.findById(id);
    }

    public Dream createDream(Dream dream) {
        return dreamRepository.save(dream);
    }

    public Optional<Dream> updateDream(Long id, Dream dreamDetails) {
        return dreamRepository.findById(id).map(dream -> {
            dream.setDateStart(dreamDetails.getDateStart());
            dream.setDateEnd(dreamDetails.getDateEnd());
            dream.setNumWakeups(dreamDetails.getNumWakeups());
            dream.setDreamType(dreamDetails.getDreamType());
            return dreamRepository.save(dream);
        });
    }

    public boolean deleteDream(Long id) {
        if (dreamRepository.existsById(id)) {
            dreamRepository.deleteById(id);
            return true;
        }
        return false;
    }
}
