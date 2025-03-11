package com.isppG8.infantem.infantem.baby;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

@Service
public class BabyService {
    
    private BabyRepository babyRepository;

    @Autowired
    public BabyService(BabyRepository babyRepository) {
        this.babyRepository = babyRepository;
    }

    @Transactional(readOnly = true)
    public List<Baby> findAll() {
        return (List<Baby>) babyRepository.findAll();
    }

    @Transactional(readOnly = true)
    public Baby findById(int id) {
        return babyRepository.findById(id).orElse(null);
    }

    public void save(Baby bebe) {
        babyRepository.save(bebe);
    }

    public void deleteBaby(int id) {
        babyRepository.deleteById(id);
    }
}
