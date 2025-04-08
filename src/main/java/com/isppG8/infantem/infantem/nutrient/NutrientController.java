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

import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.media.Content;
import io.swagger.v3.oas.annotations.media.Schema;
import io.swagger.v3.oas.annotations.responses.ApiResponse;
import io.swagger.v3.oas.annotations.tags.Tag;

@Tag(name = "Nutrients", description = "Gestión de nutrientes del bebé")
@RestController
@RequestMapping("api/v1/nutrients")
public class NutrientController {
    @Autowired
    private NutrientService nutrientService;

    @Operation(summary = "Obtener todos los nutrientes",
            description = "Recupera la lista de todos los nutrientes disponibles.") @ApiResponse(responseCode = "200",
                    description = "Lista de nutrientes encontrada", content = @Content(mediaType = "application/json",
                            schema = @Schema(implementation = Nutrient.class))) @GetMapping
    public List<Nutrient> getNutrient() {
        return nutrientService.getAllNutrients();
    }

    @Operation(summary = "Obtener un nutriente por su ID",
            description = "Recupera los detalles de un nutriente específico por su ID.") @ApiResponse(
                    responseCode = "200", description = "Nutriente encontrado",
                    content = @Content(mediaType = "application/json",
                            schema = @Schema(implementation = Nutrient.class))) @ApiResponse(responseCode = "404",
                                    description = "Nutriente no encontrado") @GetMapping("nutrient/{id}")
    public ResponseEntity<Nutrient> getNutrientById(@PathVariable Long id) {
        return nutrientService.getNutrientById(id).map(ResponseEntity::ok).orElse(ResponseEntity.notFound().build());
    }

    @Operation(summary = "Crear un nuevo nutriente",
            description = "Crea un nuevo nutriente para el bebé.") @ApiResponse(responseCode = "201",
                    description = "Nutriente creado con éxito", content = @Content(mediaType = "application/json",
                            schema = @Schema(implementation = Nutrient.class))) @PostMapping
    public Nutrient createNutrient(@RequestBody Nutrient nutrient) {
        return nutrientService.createNutrient(nutrient);
    }

    @Operation(summary = "Actualizar un nutriente existente",
            description = "Actualiza la información de un nutriente específico.") @ApiResponse(responseCode = "200",
                    description = "Nutriente actualizado con éxito",
                    content = @Content(mediaType = "application/json",
                            schema = @Schema(implementation = Nutrient.class))) @ApiResponse(responseCode = "404",
                                    description = "Nutriente no encontrado") @PutMapping("nutrient/{id}")
    public ResponseEntity<Nutrient> updateNutrient(@PathVariable Long id, @RequestBody Nutrient nutrient) {
        return nutrientService.updateNutrient(id, nutrient).map(ResponseEntity::ok)
                .orElse(ResponseEntity.notFound().build());
    }

    @Operation(summary = "Eliminar un nutriente",
            description = "Elimina un nutriente específico por su ID.") @ApiResponse(responseCode = "204",
                    description = "Nutriente eliminado con éxito") @ApiResponse(responseCode = "404",
                            description = "Nutriente no encontrado") @DeleteMapping("nutrient/{id}")
    public ResponseEntity<Void> deleteNutrient(@PathVariable Long id) {
        if (nutrientService.deleteNutrient(id)) {
            return ResponseEntity.noContent().build();
        } else {
            return ResponseEntity.notFound().build();
        }
    }

}
