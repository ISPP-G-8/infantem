package com.isppG8.infantem.infantem.allergen;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import com.isppG8.infantem.infantem.exceptions.ResourceNotFoundException;

import java.util.List;

@Service
public class AllergenService {

    private AllergenRepository allergenRepository;

    @Autowired
    public AllergenService(AllergenRepository allergenRepository) {
        this.allergenRepository = allergenRepository;
    }

    @Transactional(readOnly = true)
    public List<Allergen> getAllAllergens() {
        return allergenRepository.findAll();
    }

    @Transactional(readOnly = true)
    public Allergen getAllergenById(Long id) {
        return allergenRepository.findById(id).orElseThrow(() -> new ResourceNotFoundException("Allergen", "id", id));
    }

    @Transactional
    public Allergen createAllergen(Allergen allergen) {
        return allergenRepository.save(allergen);
    }

    @Transactional
    public Allergen updateAllergen(Long id, Allergen allergenDetails) {
        return allergenRepository.findById(id).map(allergen -> {
            allergen.setName(allergenDetails.getName());
            allergen.setDescription(allergenDetails.getDescription());
            return allergenRepository.save(allergen);
        }).orElseThrow(() -> new ResourceNotFoundException("Allergen", "id", id));
    }

    @Transactional
    public void deleteAllergen(Long id) {
        if (!allergenRepository.existsById(id)) {
            throw new ResourceNotFoundException("Allergen", "id", id);
        }
        allergenRepository.deleteById(id);
    }
}
