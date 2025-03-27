package com.isppG8.infantem.infantem.nutritionalContributionFoodSource;

import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;

@Service
public class NutritionalContributionFoodSourceService {
    @Autowired
    private NutritionalContributionFoodSourceRepository nutritionalContributionFoodSourceRepository;

    public List<NutritionalContributionFoodSource> getAllNutritionalContributionFoodSources() {
        return nutritionalContributionFoodSourceRepository.findAll();
    }

    public Optional<NutritionalContributionFoodSource> getNutritionalContributionFoodSourceById(Long id) {
        return nutritionalContributionFoodSourceRepository.findById(id);
    }

    public NutritionalContributionFoodSource createNutritionalContributionFoodSource(
            NutritionalContributionFoodSource NutritionalContributionFoodSource) {
        return nutritionalContributionFoodSourceRepository.save(NutritionalContributionFoodSource);
    }

    // This entity does not have a field to update because it is a relationship entity

    public boolean deleteNutritionalContributionFoodSource(Long id) {
        if (nutritionalContributionFoodSourceRepository.existsById(id)) {
            nutritionalContributionFoodSourceRepository.deleteById(id);
            return true;
        }
        return false;
    }
}
