package com.isppG8.infantem.infantem.allergen;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
public class AllergenService {

    @Autowired
    private AllergenRepository allergenRepository;

    public List<Allergen> getAllAllergens() {
        return allergenRepository.findAll();
    }

    public Optional<Allergen> getAllergenById(Long id) {
        return allergenRepository.findById(id);
    }

    public Allergen createAllergen(Allergen allergen) {
        return allergenRepository.save(allergen);
    }

    public Optional<Allergen> updateAllergen(Long id, Allergen allergenDetails) {
        return allergenRepository.findById(id).map(allergen -> {
            allergen.setName(allergenDetails.getName());
            allergen.setDescription(allergenDetails.getDescription());
            return allergenRepository.save(allergen);
        });
    }

    public boolean deleteAllergen(Long id) {
        if (allergenRepository.existsById(id)) {
            allergenRepository.deleteById(id);
            return true;
        }
        return false;
    }
}

