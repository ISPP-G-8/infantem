package com.isppG8.infantem.infantem.intake;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

@Service
public class FoodService {

    private FoodRepository foodRepository;

    @Autowired
    public FoodService(FoodRepository foodRepository) {
        this.foodRepository = foodRepository;
    }

    @Transactional(readOnly = true)
    public Food findById(Long id) {
        return foodRepository.findById(id).orElse(null);
    }

    @Transactional(readOnly = true)
    public List<Food> findAll() {
        return foodRepository.findAll();
    }

    @Transactional
    public void save(Food food) {
        foodRepository.save(food);
    }

    @Transactional
    public void delete(Food food) {
        foodRepository.delete(food);
    }

}
