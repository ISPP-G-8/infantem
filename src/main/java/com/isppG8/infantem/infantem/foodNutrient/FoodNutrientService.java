package com.isppG8.infantem.infantem.foodNutrient;
import java.util.List;
import java.util.Optional;

import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

@Service
public class FoodNutrientService {

    private final FoodNutrientRepository foodNutrientRepository;
    
    public FoodNutrientService(FoodNutrientRepository foodNutrientRepository) {
        this.foodNutrientRepository = foodNutrientRepository;
    }
    @Transactional(readOnly = true)
    public List<FoodNutrient> getAllFoodNutrients() {
        return foodNutrientRepository.findAll();
    }
    
    @Transactional(readOnly = true)
    public Optional<FoodNutrient> getFoodNutrientById(Long id) {
        return foodNutrientRepository.findById(id);
    }

    public FoodNutrient createFoodNutrient(FoodNutrient foodNutrient) {
        return foodNutrientRepository.save(foodNutrient);
    }

    public Optional<FoodNutrient> updateFoodNutrient(Long id, FoodNutrient foodNutrient) {
        return foodNutrientRepository.findById(id).map(foodNutrientDetails -> {
            foodNutrientDetails.setAmount(foodNutrient.getAmount());
            return foodNutrientRepository.save(foodNutrient);
        });
    }

    public boolean deleteFoodNutrient(Long id) {
        if (foodNutrientRepository.existsById(id)) {
            foodNutrientRepository.deleteById(id);
            return true;
        }
        return false;
    }
    
}
