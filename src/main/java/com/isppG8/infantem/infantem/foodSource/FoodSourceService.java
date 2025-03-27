package com.isppG8.infantem.infantem.foodSource;

import java.util.List;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

@Service
public class FoodSourceService {
    @Autowired
    private FoodSourceRepository foodSourceRepository;

    public List<FoodSource> getAllFoodSources() {
        return foodSourceRepository.findAll();
    }

    public Optional<FoodSource> getFoodSourceById(Long id) {
        return foodSourceRepository.findById(id);
    }

    public FoodSource createFoodSource(FoodSource FoodSource) {
        return foodSourceRepository.save(FoodSource);
    }

    public Optional<FoodSource> updateFoodSource(Long id, FoodSource FoodSourceDetails) {
        return foodSourceRepository.findById(id).map(FoodSource -> {
            FoodSource.setType(FoodSourceDetails.getType());
            return foodSourceRepository.save(FoodSource);
        });
    }

    public boolean deleteFoodSource(Long id) {
        if (foodSourceRepository.existsById(id)) {
            foodSourceRepository.deleteById(id);
            return true;
        }
        return false;
    }

}
