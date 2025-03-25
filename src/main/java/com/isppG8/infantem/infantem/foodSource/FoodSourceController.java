package com.isppG8.infantem.infantem.foodSource;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("api/v1/foodSources")
public class FoodSourceController {
    @Autowired
    private FoodSourceService foodSourceService;

    @GetMapping
    public List<FoodSource> getFoodSource() {
        return foodSourceService.getAllFoodSources();
    }

    @GetMapping("/{id}")
    public ResponseEntity<FoodSource> getFoodSourceById(@PathVariable Long id) {
        return foodSourceService.getFoodSourceById(id).map(ResponseEntity::ok)
                .orElse(ResponseEntity.notFound().build());
    }

    @PostMapping
    public FoodSource createFoodSource(@RequestBody FoodSource foodSource) {
        return foodSourceService.createFoodSource(foodSource);
    }

    @PutMapping("/{id}")
    public ResponseEntity<FoodSource> updateFoodSource(@PathVariable Long id, @RequestBody FoodSource foodSource) {
        return foodSourceService.updateFoodSource(id, foodSource).map(ResponseEntity::ok)
                .orElse(ResponseEntity.notFound().build());
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Void> deleteFoodSource(@PathVariable Long id) {
        if (foodSourceService.deleteFoodSource(id)) {
            return ResponseEntity.noContent().build();
        } else {
            return ResponseEntity.notFound().build();
        }
    }

}
