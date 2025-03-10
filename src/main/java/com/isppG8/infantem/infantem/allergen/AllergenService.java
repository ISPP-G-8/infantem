package com.isppG8.infantem.infantem.allergen;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import jakarta.persistence.EntityNotFoundException;

import java.util.List;

@Service
public class AllergenService {

    @Autowired
    private AllergenRepository allergenRepository;

    public List<Allergen> getAllAllergens() {
        return allergenRepository.findAll();
    }

    public Allergen getAllergenById(int id) {
    return allergenRepository.findById((long)id)
        .orElseThrow(() -> new EntityNotFoundException("El alérgeno con ID " + id + " no existe"));
    }

    public Allergen createAllergen(Allergen allergen) {
        if (allergen.getName() == null || allergen.getName().trim().isEmpty() || allergen.getDescription() == null || allergen.getDescription().trim().isEmpty()) {
            throw new IllegalArgumentException("El nombre y la descripción del alérgeno no pueden estar vacíos");
        }
        
        if (allergenRepository.findByName(allergen.getName()).isPresent()) {
            throw new IllegalArgumentException("Ya existe un alérgeno con el nombre: " + allergen.getName());
        }
    
        return allergenRepository.save(allergen);
    }

    public Allergen updateAllergen(Long id, Allergen allergenDetails) {
        Allergen allergen = allergenRepository.findById(id)
            .orElseThrow(() -> new EntityNotFoundException("No se puede actualizar. El alérgeno con ID " + id + " no existe"));
    
        allergen.setName(allergenDetails.getName());
        allergen.setDescription(allergenDetails.getDescription());
    
        return allergenRepository.save(allergen);
    }
    

    public void deleteAllergen(Long id) {
        Allergen allergen = allergenRepository.findById(id)
            .orElseThrow(() -> new EntityNotFoundException("No se puede eliminar. El alérgeno con ID " + id + " no existe"));
    
        allergenRepository.delete(allergen);
    }
    
}

