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

import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.responses.ApiResponses;
import io.swagger.v3.oas.annotations.responses.ApiResponse;
import io.swagger.v3.oas.annotations.tags.Tag;

@RestController
@RequestMapping("api/v1/allergens")
@Tag(name = "Allergens", description = "Gestión de alérgenos en el sistema")
public class AllergenController {

    @Autowired
    private AllergenService allergenService;

    @Operation(summary = "Obtener todos los alérgenos", description = "Devuelve una lista de todos los alérgenos registrados.")
    @ApiResponses(value = {
        @ApiResponse(responseCode = "200", description = "Alérgenos encontrados")
    })
    @GetMapping
    public List<AllergenDTO> getAllAllergens() {
        return allergenService.getAllAllergens().stream().map(AllergenDTO::new).toList();
    }

    @Operation(summary = "Obtener un alérgeno por ID", description = "Devuelve un alérgeno basado en su ID.")
    @ApiResponses(value = {
        @ApiResponse(responseCode = "200", description = "Alérgeno encontrado"),
        @ApiResponse(responseCode = "404", description = "Alérgeno no encontrado")
    })
    @GetMapping("/{id}")
    public ResponseEntity<AllergenDTO> getAllergenById(@PathVariable Long id) {
        Allergen allergen = allergenService.getAllergenById(id);
        return ResponseEntity.ok(new AllergenDTO(allergen));
    }

    @Operation(summary = "Crear un nuevo alérgeno", description = "Registra un nuevo alérgeno en el sistema.")
    @ApiResponses(value = {
        @ApiResponse(responseCode = "200", description = "Alérgeno creado correctamente")
    })
    @PostMapping
    public ResponseEntity<AllergenDTO> createAllergen(@Valid @RequestBody Allergen allergen) {
        Allergen createdAllergen = allergenService.createAllergen(allergen);
        return ResponseEntity.status(201).body(new AllergenDTO(createdAllergen));
    }

    @Operation(summary = "Actualizar un alérgeno", description = "Actualiza los detalles de un alérgeno registrado.")
    @ApiResponses(value = {
        @ApiResponse(responseCode = "200", description = "Alérgeno actualizado"),
        @ApiResponse(responseCode = "404", description = "Alérgeno no encontrado")
    })
    @PutMapping("/{id}")
    public ResponseEntity<AllergenDTO> updateAllergen(@PathVariable Long id,
            @Valid @RequestBody Allergen allergenDetails) {
        Allergen updatedAllergen = allergenService.updateAllergen(id, allergenDetails);
        return ResponseEntity.ok(new AllergenDTO(updatedAllergen));
    }

    @Operation(summary = "Eliminar un alérgeno", description = "Elimina un alérgeno registrado basado en su ID.")
    @ApiResponses(value = {
        @ApiResponse(responseCode = "204", description = "Alérgeno eliminado correctamente"),
        @ApiResponse(responseCode = "404", description = "Alérgeno no encontrado")
    })
    @DeleteMapping("/{id}")
    public ResponseEntity<Void> deleteAllergen(@PathVariable Long id) {
        allergenService.deleteAllergen(id);
        return ResponseEntity.noContent().build();
    }
}
