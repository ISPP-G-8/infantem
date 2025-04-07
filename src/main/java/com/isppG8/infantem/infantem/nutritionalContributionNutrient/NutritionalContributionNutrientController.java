package com.isppG8.infantem.infantem.nutritionalContributionNutrient;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.media.Content;
import io.swagger.v3.oas.annotations.media.Schema;
import io.swagger.v3.oas.annotations.responses.ApiResponse;
import io.swagger.v3.oas.annotations.tags.Tag;

import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.RequestBody;
import java.util.List;

@Tag(name = "Nutritional Contribution Nutrients",
        description = "Gestión de nutrientes asociados a contribuciones nutricionales")
@RestController
@RequestMapping({ "api/v1/nutritionalContribution/{nutritionalContributionId}/nutritionalContributionNutrients",
        "api/v1/nutrient/{nutrientId}/nutritionalContributionNutrients" })
public class NutritionalContributionNutrientController {
    @Autowired
    private NutritionalContributionNutrientService nutritionalContributionNutrientService;

    @Operation(summary = "Obtener todos los nutrientes asociados a contribuciones nutricionales",
            description = "Recupera todos los nutrientes asociados a contribuciones nutricionales.") @ApiResponse(
                    responseCode = "200",
                    description = "Lista de nutrientes asociados a contribuciones nutricionales encontrada",
                    content = @Content(mediaType = "application/json",
                            schema = @Schema(implementation = NutritionalContributionNutrient.class))) @GetMapping
    public List<NutritionalContributionNutrient> getNutritionalContributionNutrient() {
        return nutritionalContributionNutrientService.getAllNutritionalContributionNutrients();
    }

    @Operation(summary = "Obtener un nutriente asociado a una contribución nutricional por su ID",
            description = "Recupera los detalles de un nutriente asociado a una contribución nutricional específica por su ID.") @ApiResponse(
                    responseCode = "200", description = "Nutriente asociado a contribución nutricional encontrado",
                    content = @Content(mediaType = "application/json",
                            schema = @Schema(implementation = NutritionalContributionNutrient.class))) @ApiResponse(
                                    responseCode = "404",
                                    description = "Nutriente asociado a contribución nutricional no encontrado") @GetMapping("/{id}")
    public ResponseEntity<NutritionalContributionNutrient> getNutritionalContributionNutrientById(
            @PathVariable Long id) {
        return nutritionalContributionNutrientService.getNutritionalContributionNutrientById(id).map(ResponseEntity::ok)
                .orElse(ResponseEntity.notFound().build());
    }

    @Operation(summary = "Crear un nuevo nutriente asociado a una contribución nutricional",
            description = "Crea un nuevo nutriente asociado a una contribución nutricional.") @ApiResponse(
                    responseCode = "201",
                    description = "Nutriente asociado a contribución nutricional creado con éxito",
                    content = @Content(mediaType = "application/json",
                            schema = @Schema(implementation = NutritionalContributionNutrient.class))) @PostMapping
    public NutritionalContributionNutrient createNutritionalContributionNutrient(
            @RequestBody NutritionalContributionNutrient nutritionalContributionNutrient) {
        return nutritionalContributionNutrientService
                .createNutritionalContributionNutrient(nutritionalContributionNutrient);
    }

    @Operation(summary = "Actualizar un nutriente asociado a una contribución nutricional",
            description = "Actualiza un nutriente asociado a una contribución nutricional por su ID.") @ApiResponse(
                    responseCode = "200",
                    description = "Nutriente asociado a contribución nutricional actualizado con éxito",
                    content = @Content(mediaType = "application/json",
                            schema = @Schema(implementation = NutritionalContributionNutrient.class))) @ApiResponse(
                                    responseCode = "404",
                                    description = "Nutriente asociado a contribución nutricional no encontrado") @PutMapping("/{id}")
    public ResponseEntity<NutritionalContributionNutrient> updateNutritionalContributionNutrient(@PathVariable Long id,
            @RequestBody NutritionalContributionNutrient nutritionalContributionNutrient) {
        return nutritionalContributionNutrientService
                .updateNutritionalContributionNutrient(id, nutritionalContributionNutrient).map(ResponseEntity::ok)
                .orElse(ResponseEntity.notFound().build());
    }

    @Operation(summary = "Eliminar un nutriente asociado a una contribución nutricional",
            description = "Elimina un nutriente asociado a una contribución nutricional por su ID.") @ApiResponse(
                    responseCode = "204",
                    description = "Nutriente asociado a contribución nutricional eliminado con éxito") @ApiResponse(
                            responseCode = "404",
                            description = "Nutriente asociado a contribución nutricional no encontrado") @DeleteMapping("/{id}")
    public ResponseEntity<Void> deleteNutritionalContributionNutrient(@PathVariable Long id) {
        if (nutritionalContributionNutrientService.deleteNutritionalContributionNutrient(id)) {
            return ResponseEntity.noContent().build();
        } else {
            return ResponseEntity.notFound().build();
        }
    }

}
