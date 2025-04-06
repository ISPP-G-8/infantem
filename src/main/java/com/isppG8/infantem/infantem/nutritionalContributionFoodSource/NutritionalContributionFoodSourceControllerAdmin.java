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

import com.isppG8.infantem.infantem.auth.AuthoritiesService;

import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.media.Content;
import io.swagger.v3.oas.annotations.media.Schema;
import io.swagger.v3.oas.annotations.responses.ApiResponse;
import io.swagger.v3.oas.annotations.tags.Tag;
import jakarta.validation.Valid;

@Tag(name = "Nutritional Contribution Food SourcesAdmin",
        description = "Gestión de fuentes alimenticias asociadas a contribuciones nutricionales admin")
@RestController
@RequestMapping({
        "api/v1/admin/nutritionalContributions/{nutritionalcontributionId}/nutritionalContributionFoodSources",
        "api/v1/admin/foodSources/{foodSourceId}/nutritionalContributionFoodSources" })
public class NutritionalContributionFoodSourceControllerAdmin {

    @Autowired
    private NutritionalContributionFoodSourceService nutritionalContributionFoodSourceService;

    @Autowired
    private AuthoritiesService authoritiesService;

    @Operation(summary = "Obtener todas las fuentes alimenticias asociadas a contribuciones nutricionales",
            description = "Recupera todas las fuentes alimenticias asociadas a contribuciones nutricionales.") @ApiResponse(
                    responseCode = "200",
                    description = "Lista de fuentes alimenticias asociadas a contribuciones nutricionales encontrada",
                    content = @Content(mediaType = "application/json",
                            schema = @Schema(implementation = NutritionalContributionFoodSource.class))) @GetMapping
    public List<NutritionalContributionFoodSource> getNutritionalContributionFoodSources() {
        if (authoritiesService.isAdmin()) {
            return nutritionalContributionFoodSourceService.getAllNutritionalContributionFoodSources();
        }
        return null;
    }

    @Operation(summary = "Obtener una fuente alimenticia asociada a una contribución nutricional por su ID",
            description = "Recupera los detalles de una fuente alimenticia asociada a una contribución nutricional específica por su ID.") @ApiResponse(
                    responseCode = "200",
                    description = "Fuente alimenticia asociada a contribución nutricional encontrada",
                    content = @Content(mediaType = "application/json",
                            schema = @Schema(implementation = NutritionalContributionFoodSource.class))) @ApiResponse(
                                    responseCode = "404",
                                    description = "Fuente alimenticia asociada a contribución nutricional no encontrada") @GetMapping("/{id}")
    public ResponseEntity<NutritionalContributionFoodSource> getNutritionalContributionFoodSourceById(
            @PathVariable Long id) {
        if (authoritiesService.isAdmin()) {
            return nutritionalContributionFoodSourceService.getNutritionalContributionFoodSourceById(id)
                    .map(ResponseEntity::ok).orElse(ResponseEntity.notFound().build());
        }
        return null;
    }

    @Operation(summary = "Crear una nueva fuente alimenticia asociada a una contribución nutricional",
            description = "Crea una nueva fuente alimenticia asociada a una contribución nutricional.") @ApiResponse(
                    responseCode = "201",
                    description = "Fuente alimenticia asociada a contribución nutricional creada con éxito",
                    content = @Content(mediaType = "application/json",
                            schema = @Schema(implementation = NutritionalContributionFoodSource.class))) @PostMapping
    public NutritionalContributionFoodSource createNutritionalContributionFoodSource(
            @Valid @RequestBody NutritionalContributionFoodSource nutritionalContributionFoodSource) {
        if (authoritiesService.isAdmin()) {
            return nutritionalContributionFoodSourceService
                    .createNutritionalContributionFoodSource(nutritionalContributionFoodSource);
        }
        return null;
    }

    @Operation(summary = "Eliminar una fuente alimenticia asociada a una contribución nutricional",
            description = "Elimina una fuente alimenticia asociada a una contribución nutricional por su ID.") @ApiResponse(
                    responseCode = "204",
                    description = "Fuente alimenticia asociada a contribución nutricional eliminada con éxito") @ApiResponse(
                            responseCode = "404",
                            description = "Fuente alimenticia asociada a contribución nutricional no encontrada") @DeleteMapping("/{id}")
    public ResponseEntity<Void> deleteNutritionalContributionFoodSource(@PathVariable Long id) {
        if (authoritiesService.isAdmin()) {
            if (nutritionalContributionFoodSourceService.deleteNutritionalContributionFoodSource(id)) {
                return ResponseEntity.noContent().build();
            } else {
                return ResponseEntity.notFound().build();
            }
        }
        return null;
    }

}
