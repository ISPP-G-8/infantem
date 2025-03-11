package com.isppG8.infantem.infantem.nutrient;
import java.util.List;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

@Service
public class NutrientService {
    @Autowired
    private NutrientRepository nutrientRepository;
    
    public List<Nutrient> getAllNutrients() {
        return nutrientRepository.findAll();
    }

    public Optional<Nutrient> getNutrientById(Long id) {
        return nutrientRepository.findById(id);
    }

    public Nutrient createNutrient(Nutrient Nutrient) {
        return nutrientRepository.save(Nutrient);
    }

    public Optional<Nutrient> updateNutrient(Long id, Nutrient NutrientDetails) {
        return nutrientRepository.findById(id).map(Nutrient -> {
            Nutrient.setName(NutrientDetails.getName());
            Nutrient.setType(NutrientDetails.getType());
            Nutrient.setUnit(NutrientDetails.getUnit());
            return nutrientRepository
            .save(Nutrient);
        });
    }

    public boolean deleteNutrient(Long id) {
        if (nutrientRepository.existsById(id)) {
            nutrientRepository.deleteById(id);
            return true;
        }
        return false;
    }
}
