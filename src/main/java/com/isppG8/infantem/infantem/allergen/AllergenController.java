package com.isppG8.infantem.infantem.allergen;

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

import com.isppG8.infantem.infantem.allergen.dto.AllergenDTO;

import jakarta.validation.Valid;

import java.util.List;

@RestController
@RequestMapping("api/v1/allergens")
public class AllergenController {

    @Autowired
    private AllergenService allergenService;

    @GetMapping
    public List<AllergenDTO> getAllAllergens() {
        return allergenService.getAllAllergens().stream().map(AllergenDTO::new).toList();
    }

    @GetMapping("/{id}")
    public ResponseEntity<AllergenDTO> getAllergenById(@PathVariable Long id) {
        Allergen allergen = allergenService.getAllergenById(id);
        return ResponseEntity.ok(new AllergenDTO(allergen));
    }

    @PostMapping
    public ResponseEntity<AllergenDTO> createAllergen(@Valid @RequestBody Allergen allergen) {
        Allergen createdAllergen = allergenService.createAllergen(allergen);
        return ResponseEntity.status(201).body(new AllergenDTO(createdAllergen));
    }

    @PutMapping("/{id}")
    public ResponseEntity<AllergenDTO> updateAllergen(@PathVariable Long id,
            @Valid @RequestBody Allergen allergenDetails) {
        Allergen updatedAllergen = allergenService.updateAllergen(id, allergenDetails);
        return ResponseEntity.ok(new AllergenDTO(updatedAllergen));
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Void> deleteAllergen(@PathVariable Long id) {
        allergenService.deleteAllergen(id);
        return ResponseEntity.noContent().build();
    }
}
