package com.isppG8.infantem.infantem.foodNutrient;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;

import java.util.List;

import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;

@RestController
@RequestMapping({ "api/v1/nutrients/{nutrientId}/foodNutrients" })
public class FoodNutrientController {

    private FoodNutrientService foodNutrientService;

    @Autowired
    public FoodNutrientController(FoodNutrientService foodNutrientService) {
        this.foodNutrientService = foodNutrientService;
    }

    @GetMapping
    public List<FoodNutrient> getFoodNutrients() {
        return foodNutrientService.getAllFoodNutrients();
    }

    @GetMapping("/{id}")
    public ResponseEntity<FoodNutrient> getFoodNutrientById(@PathVariable Long id) {
        return foodNutrientService.getFoodNutrientById(id).map(ResponseEntity::ok)
                .orElse(ResponseEntity.notFound().build());
    }

    @PostMapping
    public FoodNutrient createFoodNutrient(@RequestBody FoodNutrient foodNutrient) {
        return foodNutrientService.createFoodNutrient(foodNutrient);
    }

    @PutMapping("/{id}")
    public ResponseEntity<FoodNutrient> updateFoodNutrient(@PathVariable Long id,
            @RequestBody FoodNutrient foodNutrient) {
        return foodNutrientService.updateFoodNutrient(id, foodNutrient).map(ResponseEntity::ok)
                .orElse(ResponseEntity.notFound().build());
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Void> deleteFoodNutrient(@PathVariable Long id) {
        if (foodNutrientService.deleteFoodNutrient(id)) {
            return ResponseEntity.noContent().build();
        } else {
            return ResponseEntity.notFound().build();
        }
    }

}
