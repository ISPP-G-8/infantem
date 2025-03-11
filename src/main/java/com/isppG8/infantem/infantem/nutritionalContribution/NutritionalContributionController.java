package com.isppG8.infantem.infantem.nutritionalContribution;

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
@RequestMapping("/nutritionalcontributions")
public class NutritionalContributionController {
    @Autowired
    private NutritionalContributionService nutritionalContributionService;
    
    @GetMapping
    public List<NutritionalContribution> getNutritionalContribution() {
        return nutritionalContributionService.getAllNutritionalContributions();
    }

    @GetMapping("/{id}")
    public ResponseEntity<NutritionalContribution> getNutritionalContributionById(@PathVariable Long id) {
        return nutritionalContributionService.getNutritionalContributionById(id)
                .map(ResponseEntity::ok)
                .orElse(ResponseEntity.notFound().build());
    }
    
    @PostMapping
    public NutritionalContribution createNutritionalContribution(@RequestBody NutritionalContribution nutritionalContribution) {
        return nutritionalContributionService.createNutritionalContribution(nutritionalContribution);
    }
    
    @PutMapping("/{id}")
    public ResponseEntity<NutritionalContribution> updateNutritionalContribution(@PathVariable Long id, @RequestBody NutritionalContribution nutritionalContribution) {
        return nutritionalContributionService.updateNutritionalContribution(id, nutritionalContribution)
                .map(ResponseEntity::ok)
                .orElse(ResponseEntity.notFound().build());
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Void> deleteNutritionalContribution(@PathVariable Long id) {
        if (nutritionalContributionService.deleteNutritionalContribution(id)) {
            return ResponseEntity.noContent().build();
        } else {
            return ResponseEntity.notFound().build();
        }
    }

    
}

