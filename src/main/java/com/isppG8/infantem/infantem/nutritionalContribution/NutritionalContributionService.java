package com.isppG8.infantem.infantem.nutritionalContribution;
import java.util.List;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

@Service
public class NutritionalContributionService {
    @Autowired
    private NutritionalContributionRepository nutritionalContributionRepository;

    public List<NutritionalContribution> getAllNutritionalContributions() {
        return nutritionalContributionRepository.findAll();
    }

    public Optional<NutritionalContribution> getNutritionalContributionById(Long id) {
        return nutritionalContributionRepository.findById(id);
    }

    public NutritionalContribution createNutritionalContribution(NutritionalContribution NutritionalContribution) {
        return nutritionalContributionRepository.save(NutritionalContribution);
    }

    public Optional<NutritionalContribution> updateNutritionalContribution(Long id, NutritionalContribution NutritionalContributionDetails) {
        return nutritionalContributionRepository.findById(id).map(NutritionalContribution -> {
            NutritionalContribution.setMinAgeMonths(NutritionalContributionDetails.getMinAgeMonths());
            NutritionalContribution.setMaxAgeMonths(NutritionalContributionDetails.getMaxAgeMonths());
            return nutritionalContributionRepository
            .save(NutritionalContribution);
        });
    }

    public boolean deleteNutritionalContribution(Long id) {
        if (nutritionalContributionRepository.existsById(id)) {
            nutritionalContributionRepository.deleteById(id);
            return true;
        }
        return false;
    }
}
