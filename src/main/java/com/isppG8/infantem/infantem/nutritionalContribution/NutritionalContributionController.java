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

import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.media.Content;
import io.swagger.v3.oas.annotations.media.Schema;
import io.swagger.v3.oas.annotations.responses.ApiResponse;
import io.swagger.v3.oas.annotations.tags.Tag;

@Tag(name = "Nutritional Contributions", description = "Gestión de contribuciones nutricionales para el bebé")
@RestController
@RequestMapping("api/v1/nutritionalcontributions")
public class NutritionalContributionController {
    @Autowired
    private NutritionalContributionService nutritionalContributionService;

    @Operation(summary = "Obtener todas las contribuciones nutricionales",
            description = "Recupera la lista de todas las contribuciones nutricionales disponibles.") @ApiResponse(
                    responseCode = "200", description = "Lista de contribuciones nutricionales encontrada",
                    content = @Content(mediaType = "application/json",
                            schema = @Schema(implementation = NutritionalContribution.class))) @GetMapping
    public List<NutritionalContribution> getNutritionalContribution() {
        return nutritionalContributionService.getAllNutritionalContributions();
    }

    @Operation(summary = "Obtener una contribución nutricional por su ID",
            description = "Recupera los detalles de una contribución nutricional específica por su ID.") @ApiResponse(
                    responseCode = "200", description = "Contribución nutricional encontrada",
                    content = @Content(mediaType = "application/json",
                            schema = @Schema(implementation = NutritionalContribution.class))) @ApiResponse(
                                    responseCode = "404",
                                    description = "Contribución nutricional no encontrada") @GetMapping("/{id}")
    public ResponseEntity<NutritionalContribution> getNutritionalContributionById(@PathVariable Long id) {
        return nutritionalContributionService.getNutritionalContributionById(id).map(ResponseEntity::ok)
                .orElse(ResponseEntity.notFound().build());
    }

    @Operation(summary = "Crear una nueva contribución nutricional",
            description = "Crea una nueva contribución nutricional para el bebé.") @ApiResponse(responseCode = "201",
                    description = "Contribución nutricional creada con éxito",
                    content = @Content(mediaType = "application/json",
                            schema = @Schema(implementation = NutritionalContribution.class))) @PostMapping
    public NutritionalContribution createNutritionalContribution(
            @RequestBody NutritionalContribution nutritionalContribution) {
        return nutritionalContributionService.createNutritionalContribution(nutritionalContribution);
    }

    @Operation(summary = "Actualizar una contribución nutricional existente",
            description = "Actualiza la información de una contribución nutricional específica.") @ApiResponse(
                    responseCode = "200", description = "Contribución nutricional actualizada con éxito",
                    content = @Content(mediaType = "application/json",
                            schema = @Schema(implementation = NutritionalContribution.class))) @ApiResponse(
                                    responseCode = "404",
                                    description = "Contribución nutricional no encontrada") @PutMapping("/{id}")
    public ResponseEntity<NutritionalContribution> updateNutritionalContribution(@PathVariable Long id,
            @RequestBody NutritionalContribution nutritionalContribution) {
        return nutritionalContributionService.updateNutritionalContribution(id, nutritionalContribution)
                .map(ResponseEntity::ok).orElse(ResponseEntity.notFound().build());
    }

    @Operation(summary = "Eliminar una contribución nutricional",
            description = "Elimina una contribución nutricional específica por su ID.") @ApiResponse(
                    responseCode = "204",
                    description = "Contribución nutricional eliminada con éxito") @ApiResponse(responseCode = "404",
                            description = "Contribución nutricional no encontrada") @DeleteMapping("/{id}")
    public ResponseEntity<Void> deleteNutritionalContribution(@PathVariable Long id) {
        if (nutritionalContributionService.deleteNutritionalContribution(id)) {
            return ResponseEntity.noContent().build();
        } else {
            return ResponseEntity.notFound().build();
        }
    }

}
