package com.isppG8.infantem.infantem.nutritionalContributionFoodSource;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import jakarta.validation.Valid;

@RestController
@RequestMapping({ "api/v1/nutritionalContributions/{nutritionalcontributionId}/nutritionalContributionFoodSources",
        "api/v1/foodSources/{foodSourceId}/nutritionalContributionFoodSources" })
public class NutritionalContributionFoodSourceController {
    @Autowired
    private NutritionalContributionFoodSourceService nutritionalContributionFoodSourceService;

    @GetMapping
    public List<NutritionalContributionFoodSource> getNutritionalContributionFoodSources() {
        return nutritionalContributionFoodSourceService.getAllNutritionalContributionFoodSources();
    }

    @GetMapping("/{id}")
    public ResponseEntity<NutritionalContributionFoodSource> getNutritionalContributionFoodSourceById(
            @PathVariable Long id) {
        return nutritionalContributionFoodSourceService.getNutritionalContributionFoodSourceById(id)
                .map(ResponseEntity::ok).orElse(ResponseEntity.notFound().build());
    }

    @PostMapping
    public NutritionalContributionFoodSource createNutritionalContributionFoodSource(
            @Valid @RequestBody NutritionalContributionFoodSource nutritionalContributionFoodSource) {
        return nutritionalContributionFoodSourceService
                .createNutritionalContributionFoodSource(nutritionalContributionFoodSource);
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Void> deleteNutritionalContributionFoodSource(@PathVariable Long id) {
        if (nutritionalContributionFoodSourceService.deleteNutritionalContributionFoodSource(id)) {
            return ResponseEntity.noContent().build();
        } else {
            return ResponseEntity.notFound().build();
        }
    }

}
