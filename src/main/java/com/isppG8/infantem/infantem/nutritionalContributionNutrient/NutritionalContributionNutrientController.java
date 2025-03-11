package com.isppG8.infantem.infantem.nutritionalContributionNutrient;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.RequestBody;
import java.util.List;

@RestController
@RequestMapping({"/nutritionalContribution/{nutritionalContributionId}/nutritionalContributionNutrients","/nutrient/{nutrientId}/nutritionalContributionNutrients"})
public class NutritionalContributionNutrientController {
    @Autowired
    private NutritionalContributionNutrientService nutritionalContributionNutrientService;
    
    @GetMapping
    public List<NutritionalContributionNutrient> getNutritionalContributionNutrient() {
        return nutritionalContributionNutrientService.getAllNutritionalContributionNutrients();
    }

    @GetMapping("/{id}")
    public ResponseEntity<NutritionalContributionNutrient> getNutritionalContributionNutrientById(@PathVariable Long id) {
        return nutritionalContributionNutrientService.getNutritionalContributionNutrientById(id)
                .map(ResponseEntity::ok)
                .orElse(ResponseEntity.notFound().build());
    }
    
    @PostMapping
    public NutritionalContributionNutrient createNutritionalContributionNutrient(@RequestBody NutritionalContributionNutrient nutritionalContributionNutrient) {
        return nutritionalContributionNutrientService.createNutritionalContributionNutrient(nutritionalContributionNutrient);
    }
    
    @PutMapping("/{id}")
    public ResponseEntity<NutritionalContributionNutrient> updateNutritionalContributionNutrient(@PathVariable Long id, @RequestBody NutritionalContributionNutrient nutritionalContributionNutrient) {
        return nutritionalContributionNutrientService.updateNutritionalContributionNutrient(id, nutritionalContributionNutrient)
                .map(ResponseEntity::ok)
                .orElse(ResponseEntity.notFound().build());
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Void> deleteNutritionalContributionNutrient(@PathVariable Long id) {
        if (nutritionalContributionNutrientService.deleteNutritionalContributionNutrient(id)) {
            return ResponseEntity.noContent().build();
        } else {
            return ResponseEntity.notFound().build();
        }
    }

    
}
