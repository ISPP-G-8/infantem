package com.isppG8.infantem.infantem.nutrient;

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
@RequestMapping("api/v1/nutrients")
public class NutrientController {
    @Autowired
    private NutrientService nutrientService;

    @GetMapping
    public List<Nutrient> getNutrient() {
        return nutrientService.getAllNutrients();
    }

    @GetMapping("nutrient/{id}")
    public ResponseEntity<Nutrient> getNutrientById(@PathVariable Long id) {
        return nutrientService.getNutrientById(id).map(ResponseEntity::ok).orElse(ResponseEntity.notFound().build());
    }

    @PostMapping
    public Nutrient createNutrient(@RequestBody Nutrient nutrient) {
        return nutrientService.createNutrient(nutrient);
    }

    @PutMapping("nutrient/{id}")
    public ResponseEntity<Nutrient> updateNutrient(@PathVariable Long id, @RequestBody Nutrient nutrient) {
        return nutrientService.updateNutrient(id, nutrient).map(ResponseEntity::ok)
                .orElse(ResponseEntity.notFound().build());
    }

    @DeleteMapping("nutrient/{id}")
    public ResponseEntity<Void> deleteNutrient(@PathVariable Long id) {
        if (nutrientService.deleteNutrient(id)) {
            return ResponseEntity.noContent().build();
        } else {
            return ResponseEntity.notFound().build();
        }
    }

}
