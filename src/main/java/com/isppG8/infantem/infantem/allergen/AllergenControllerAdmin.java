package com.isppG8.infantem.infantem.allergen;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.PathVariable;
import com.isppG8.infantem.infantem.allergen.dto.AllergenDTO;
import com.isppG8.infantem.infantem.auth.AuthoritiesService;
import jakarta.validation.Valid;
import java.util.List;
import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.media.Content;
import io.swagger.v3.oas.annotations.media.ArraySchema;
import io.swagger.v3.oas.annotations.media.Schema;
import io.swagger.v3.oas.annotations.responses.ApiResponse;
import io.swagger.v3.oas.annotations.tags.Tag;

@Tag(name = "AllergensAdmin", description = "Gestion de los alergenos admin")
@RestController
@RequestMapping("api/v1/admin/allergens")
public class AllergenControllerAdmin {

    @Autowired
    private AllergenService allergenService;

    @Autowired
    private AuthoritiesService authoritiesService;

    @Operation(summary = "Obtener todos los alérgenos",
            description = "Devuelve una lista de todos los alérgenos.") @ApiResponse(responseCode = "200",
                    description = "Lista obtenida con éxito", content = @Content(
                            array = @ArraySchema(schema = @Schema(implementation = AllergenDTO.class)))) @GetMapping
    public List<AllergenDTO> getAllAllergens() {
        if (authoritiesService.isAdmin()) {
            return allergenService.getAllAllergens().stream().map(AllergenDTO::new).toList();
        }
        return null;
    }

    @Operation(summary = "Obtener un alérgeno por ID",
            description = "Devuelve un alérgeno basado en su ID.") @ApiResponse(responseCode = "200",
                    description = "Alérgeno encontrado",
                    content = @Content(schema = @Schema(implementation = AllergenDTO.class))) @ApiResponse(
                            responseCode = "404", description = "Alérgeno no encontrado") @GetMapping("/{id}")
    public ResponseEntity<AllergenDTO> getAllergenById(@PathVariable Long id) {
        if (authoritiesService.isAdmin()) {
            Allergen allergen = allergenService.getAllergenById(id);
            return ResponseEntity.ok(new AllergenDTO(allergen));
        }
        return null;
    }

    @Operation(summary = "Crear un nuevo alérgeno", description = "Crea y devuelve un nuevo alérgeno.") @ApiResponse(
            responseCode = "201", description = "Alérgeno creado exitosamente",
            content = @Content(schema = @Schema(implementation = AllergenDTO.class))) @ApiResponse(responseCode = "400",
                    description = "Datos inválidos") @PostMapping
    public ResponseEntity<AllergenDTO> createAllergen(@Valid @RequestBody Allergen allergen) {
        if (authoritiesService.isAdmin()) {
            Allergen createdAllergen = allergenService.createAllergen(allergen);
            return ResponseEntity.status(201).body(new AllergenDTO(createdAllergen));
        }
        return null;
    }

    @Operation(summary = "Actualizar un alérgeno",
            description = "Modifica los datos de un alérgeno existente.") @ApiResponse(responseCode = "200",
                    description = "Alérgeno actualizado correctamente",
                    content = @Content(schema = @Schema(implementation = AllergenDTO.class))) @ApiResponse(
                            responseCode = "404", description = "Alérgeno no encontrado") @PutMapping("/{id}")
    public ResponseEntity<AllergenDTO> updateAllergen(@PathVariable Long id,
            @Valid @RequestBody Allergen allergenDetails) {
        if (authoritiesService.isAdmin()) {
            Allergen updatedAllergen = allergenService.updateAllergen(id, allergenDetails);
            return ResponseEntity.ok(new AllergenDTO(updatedAllergen));
        }
        return null;
    }

    @Operation(summary = "Eliminar un alérgeno", description = "Elimina un alérgeno por su ID.") @ApiResponse(
            responseCode = "204", description = "Alérgeno eliminado correctamente") @ApiResponse(responseCode = "404",
                    description = "Alérgeno no encontrado") @DeleteMapping("/{id}")
    public ResponseEntity<Void> deleteAllergen(@PathVariable Long id) {
        if (authoritiesService.isAdmin()) {
            allergenService.deleteAllergen(id);
            return ResponseEntity.noContent().build();
        }
        return null;
    }
}
