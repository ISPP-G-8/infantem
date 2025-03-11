package com.isppG8.infantem.infantem.nutritionalContributionNutrient;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
public class NutritionalContributionNutrientService {

    @Autowired
    private NutritionalContributionNutrientRepository nutritionalContributionNutrientRepository;

    public List<NutritionalContributionNutrient> getAllNutritionalContributionNutrients() {
        return nutritionalContributionNutrientRepository.findAll();
    }

    public Optional<NutritionalContributionNutrient> getNutritionalContributionNutrientById(Long id) {
        return nutritionalContributionNutrientRepository.findById(id);
    }

    public NutritionalContributionNutrient createNutritionalContributionNutrient(NutritionalContributionNutrient nutritionalContributionNutrient) {
        return nutritionalContributionNutrientRepository.save(nutritionalContributionNutrient);
    }

    public Optional<NutritionalContributionNutrient> updateNutritionalContributionNutrient(Long id, NutritionalContributionNutrient nutritionalContributionNutrientDetails) {
        return nutritionalContributionNutrientRepository.findById(id).map(nutritionalContributionNutrient -> {
            nutritionalContributionNutrient.setReccomendedAmount(nutritionalContributionNutrientDetails.getReccomendedAmount());
            return nutritionalContributionNutrientRepository.save(nutritionalContributionNutrient);
        });
    }

    public boolean deleteNutritionalContributionNutrient(Long id) {
        if (nutritionalContributionNutrientRepository.existsById(id)) {
            nutritionalContributionNutrientRepository.deleteById(id);
            return true;
        }
        return false;
    }
}
