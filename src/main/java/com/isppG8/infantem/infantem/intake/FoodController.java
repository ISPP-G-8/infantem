package com.isppG8.infantem.infantem.intake;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.ResponseStatus;
import org.springframework.web.bind.annotation.RestController;

import jakarta.validation.Valid;

@RestController
@RequestMapping("/api/v1/food")
public class FoodController {

    private FoodService foodService;

    @Autowired
    public FoodController(FoodService foodService) {
        this.foodService = foodService;
    }

    @GetMapping("/list")
    public List<Food> getAllFoods() {
        return foodService.findAll();
    }

    @PostMapping("/create")
    @ResponseStatus(HttpStatus.CREATED)
    public Food createFood(Food food) {
        foodService.save(food);
        return food;
    }

    @PutMapping("/update/{id}")
    @ResponseStatus(HttpStatus.OK)
    public void updateFood(@PathVariable("id") Long id, @RequestBody @Valid Food food) {
        Food foodToUpdate = foodService.findById(id);
        if (foodToUpdate == null) {
            throw new RuntimeException("Food not found");
        }
        foodToUpdate.setName(food.getName());
        foodToUpdate.setFoodCategory(food.getFoodCategory());
        foodToUpdate.setIngredients(food.getIngredients());
        foodService.save(food);
    }

    @DeleteMapping("/delete/{id}")
    @ResponseStatus(HttpStatus.OK)
    public void deleteFood(@PathVariable("id") Long id) {
        Food food = foodService.findById(id);
        if (food == null) {
            throw new RuntimeException("Food not found");
        }
        foodService.delete(food);
    }
}
