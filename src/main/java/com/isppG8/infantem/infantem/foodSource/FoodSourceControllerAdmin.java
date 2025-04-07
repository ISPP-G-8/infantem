package com.isppG8.infantem.infantem.foodSource;

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

import com.isppG8.infantem.infantem.auth.AuthoritiesService;

import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.media.Content;
import io.swagger.v3.oas.annotations.media.Schema;
import io.swagger.v3.oas.annotations.responses.ApiResponse;
import io.swagger.v3.oas.annotations.tags.Tag;

@Tag(name = "FoodSourcesAdmin", description = "Gestión de fuentes alimentarias admin")
@RestController
@RequestMapping("api/v1/admin/foodSources")
public class FoodSourceControllerAdmin {

    @Autowired
    private FoodSourceService foodSourceService;

    @Autowired
    private AuthoritiesService authoritiesService;

    @Operation(summary = "Obtener todas las fuentes alimentarias",
            description = "Recupera la lista de todas las fuentes alimentarias.") @ApiResponse(responseCode = "200",
                    description = "Lista de fuentes alimentarias", content = @Content(mediaType = "application/json",
                            schema = @Schema(implementation = FoodSource.class))) @GetMapping
    public List<FoodSource> getFoodSource() {
        if (authoritiesService.isAdmin()) {
            return foodSourceService.getAllFoodSources();
        }
        return null;
    }

    @Operation(summary = "Obtener una fuente alimentaria por ID",
            description = "Recupera los detalles de una fuente alimentaria específica mediante su ID.") @ApiResponse(
                    responseCode = "200", description = "Fuente alimentaria encontrada",
                    content = @Content(mediaType = "application/json",
                            schema = @Schema(implementation = FoodSource.class))) @ApiResponse(responseCode = "404",
                                    description = "Fuente alimentaria no encontrada") @GetMapping("/{id}")
    public ResponseEntity<FoodSource> getFoodSourceById(@PathVariable Long id) {
        if (authoritiesService.isAdmin()) {
            return foodSourceService.getFoodSourceById(id).map(ResponseEntity::ok)
                    .orElse(ResponseEntity.notFound().build());
        }
        return null;
    }

    @Operation(summary = "Crear una nueva fuente alimentaria",
            description = "Crea una nueva fuente alimentaria.") @ApiResponse(responseCode = "201",
                    description = "Fuente alimentaria creada", content = @Content(mediaType = "application/json",
                            schema = @Schema(implementation = FoodSource.class))) @PostMapping
    public FoodSource createFoodSource(@RequestBody FoodSource foodSource) {
        if (authoritiesService.isAdmin()) {
            return foodSourceService.createFoodSource(foodSource);
        }
        return null;
    }

    @Operation(summary = "Actualizar una fuente alimentaria",
            description = "Actualiza una fuente alimentaria existente mediante su ID.") @ApiResponse(
                    responseCode = "200", description = "Fuente alimentaria actualizada",
                    content = @Content(mediaType = "application/json",
                            schema = @Schema(implementation = FoodSource.class))) @ApiResponse(responseCode = "404",
                                    description = "Fuente alimentaria no encontrada") @PutMapping("/{id}")
    public ResponseEntity<FoodSource> updateFoodSource(@PathVariable Long id, @RequestBody FoodSource foodSource) {
        if (authoritiesService.isAdmin()) {
            return foodSourceService.updateFoodSource(id, foodSource).map(ResponseEntity::ok)
                    .orElse(ResponseEntity.notFound().build());
        }
        return null;
    }

    @Operation(summary = "Eliminar una fuente alimentaria",
            description = "Elimina una fuente alimentaria mediante su ID.") @ApiResponse(responseCode = "204",
                    description = "Fuente alimentaria eliminada") @ApiResponse(responseCode = "404",
                            description = "Fuente alimentaria no encontrada") @DeleteMapping("/{id}")
    public ResponseEntity<Void> deleteFoodSource(@PathVariable Long id) {
        if (authoritiesService.isAdmin()) {
            if (foodSourceService.deleteFoodSource(id)) {
                return ResponseEntity.noContent().build();
            } else {
                return ResponseEntity.notFound().build();
            }
        }
        return null;
    }

}
