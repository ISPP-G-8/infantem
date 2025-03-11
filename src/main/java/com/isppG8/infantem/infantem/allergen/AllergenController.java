package com.isppG8.infantem.infantem.allergen;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import jakarta.persistence.EntityNotFoundException;

import java.util.List;
import java.util.Optional;

@RestController
@RequestMapping("/allergens")
public class AllergenController {

    @Autowired
    private AllergenService allergenService;

    @GetMapping
    public List<Allergen> getAllAllergens() {
        return allergenService.getAllAllergens();
    }

    @GetMapping("/{id}")
    public ResponseEntity<Allergen> getAllergenById(@PathVariable Long id) {
        try {
            Allergen allergen = allergenService.getAllergenById(id.intValue());
            return ResponseEntity.ok(allergen);
        } catch (EntityNotFoundException e) {
            return ResponseEntity.notFound().build();
        }
}


    @PostMapping
    public Allergen createAllergen(@RequestBody Allergen allergen) {
        return allergenService.createAllergen(allergen);
    }

    @PutMapping("/{id}")
    public ResponseEntity<Allergen> updateAllergen(@PathVariable Long id, @RequestBody Allergen allergenDetails) {
        try {
            Allergen updatedAllergen = allergenService.updateAllergen(id, allergenDetails);
            return ResponseEntity.ok(updatedAllergen);
        } catch (EntityNotFoundException e) {
            return ResponseEntity.notFound().build();
        }
}


    @DeleteMapping("/{id}")
    public ResponseEntity<Void> deleteAllergen(@PathVariable Long id) {
        try {
            allergenService.deleteAllergen(id);
            return ResponseEntity.noContent().build(); // Código 204 si se elimina con éxito
        } catch (EntityNotFoundException e) {
            return ResponseEntity.notFound().build(); // Código 404 si el alérgeno no existe
        }
    }

}

