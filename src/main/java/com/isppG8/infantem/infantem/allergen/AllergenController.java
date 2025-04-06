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
import jakarta.validation.Valid;
import java.util.List;
import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.media.Content;
import io.swagger.v3.oas.annotations.media.ArraySchema;
import io.swagger.v3.oas.annotations.media.Schema;
import io.swagger.v3.oas.annotations.responses.ApiResponse;
import io.swagger.v3.oas.annotations.tags.Tag;

@Tag(name = "Allergens", description = "Gestion de los alergenos")
@RestController
@RequestMapping("api/v1/allergens")
public class AllergenController {

    @Autowired
    private AllergenService allergenService;

    @Operation(summary = "Obtener todos los alérgenos",
            description = "Devuelve una lista de todos los alérgenos.") @ApiResponse(responseCode = "200",
                    description = "Lista obtenida con éxito", content = @Content(
                            array = @ArraySchema(schema = @Schema(implementation = AllergenDTO.class)))) @GetMapping
    public List<AllergenDTO> getAllAllergens() {
        return allergenService.getAllAllergens().stream().map(AllergenDTO::new).toList();
    }

    @Operation(summary = "Obtener un alérgeno por ID",
            description = "Devuelve un alérgeno basado en su ID.") @ApiResponse(responseCode = "200",
                    description = "Alérgeno encontrado",
                    content = @Content(schema = @Schema(implementation = AllergenDTO.class))) @ApiResponse(
                            responseCode = "404", description = "Alérgeno no encontrado") @GetMapping("/{id}")
    public ResponseEntity<AllergenDTO> getAllergenById(@PathVariable Long id) {
        Allergen allergen = allergenService.getAllergenById(id);
        return ResponseEntity.ok(new AllergenDTO(allergen));
    }

    @Operation(summary = "Crear un nuevo alérgeno", description = "Crea y devuelve un nuevo alérgeno.") @ApiResponse(
            responseCode = "201", description = "Alérgeno creado exitosamente",
            content = @Content(schema = @Schema(implementation = AllergenDTO.class))) @ApiResponse(responseCode = "400",
                    description = "Datos inválidos") @PostMapping
    public ResponseEntity<AllergenDTO> createAllergen(@Valid @RequestBody Allergen allergen) {
        Allergen createdAllergen = allergenService.createAllergen(allergen);
        return ResponseEntity.status(201).body(new AllergenDTO(createdAllergen));
    }

    @Operation(summary = "Actualizar un alérgeno",
            description = "Modifica los datos de un alérgeno existente.") @ApiResponse(responseCode = "200",
                    description = "Alérgeno actualizado correctamente",
                    content = @Content(schema = @Schema(implementation = AllergenDTO.class))) @ApiResponse(
                            responseCode = "404", description = "Alérgeno no encontrado") @PutMapping("/{id}")
    public ResponseEntity<AllergenDTO> updateAllergen(@PathVariable Long id,
            @Valid @RequestBody Allergen allergenDetails) {
        Allergen updatedAllergen = allergenService.updateAllergen(id, allergenDetails);
        return ResponseEntity.ok(new AllergenDTO(updatedAllergen));
    }

    @Operation(summary = "Eliminar un alérgeno", description = "Elimina un alérgeno por su ID.") @ApiResponse(
            responseCode = "204", description = "Alérgeno eliminado correctamente") @ApiResponse(responseCode = "404",
                    description = "Alérgeno no encontrado") @DeleteMapping("/{id}")
    public ResponseEntity<Void> deleteAllergen(@PathVariable Long id) {
        allergenService.deleteAllergen(id);
        return ResponseEntity.noContent().build();
    }
}
