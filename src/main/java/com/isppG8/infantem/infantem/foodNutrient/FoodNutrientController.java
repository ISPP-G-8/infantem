package com.isppG8.infantem.infantem.foodNutrient;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;

import java.util.List;

import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.media.Content;
import io.swagger.v3.oas.annotations.media.Schema;
import io.swagger.v3.oas.annotations.responses.ApiResponse;
import io.swagger.v3.oas.annotations.tags.Tag;

import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;

@Tag(name = "FoodNutrients", description = "Gestión de nutrientes en los alimentos")
@RestController
@RequestMapping({ "api/v1/nutrients/{nutrientId}/foodNutrients" })
public class FoodNutrientController {

    private FoodNutrientService foodNutrientService;

    @Autowired
    public FoodNutrientController(FoodNutrientService foodNutrientService) {
        this.foodNutrientService = foodNutrientService;
    }

    @Operation(summary = "Obtener todos los nutrientes de alimentos",
            description = "Recupera la lista de todos los nutrientes de alimentos asociados a un nutriente específico.") @ApiResponse(
                    responseCode = "200", description = "Lista de nutrientes de alimentos",
                    content = @Content(mediaType = "application/json",
                            schema = @Schema(implementation = FoodNutrient.class))) @GetMapping
    public List<FoodNutrient> getFoodNutrients() {
        return foodNutrientService.getAllFoodNutrients();
    }

    @Operation(summary = "Obtener un nutriente de alimento por ID",
            description = "Recupera los detalles de un nutriente de alimento específico mediante su ID.") @ApiResponse(
                    responseCode = "200", description = "Nutriente de alimento encontrado",
                    content = @Content(mediaType = "application/json",
                            schema = @Schema(implementation = FoodNutrient.class))) @ApiResponse(responseCode = "404",
                                    description = "Nutriente de alimento no encontrado") @GetMapping("/{id}")
    public ResponseEntity<FoodNutrient> getFoodNutrientById(@PathVariable Long id) {
        return foodNutrientService.getFoodNutrientById(id).map(ResponseEntity::ok)
                .orElse(ResponseEntity.notFound().build());
    }

    @Operation(summary = "Crear un nuevo nutriente de alimento",
            description = "Crea un nuevo nutriente de alimento.") @ApiResponse(responseCode = "201",
                    description = "Nutriente de alimento creado", content = @Content(mediaType = "application/json",
                            schema = @Schema(implementation = FoodNutrient.class))) @PostMapping
    public FoodNutrient createFoodNutrient(@RequestBody FoodNutrient foodNutrient) {
        return foodNutrientService.createFoodNutrient(foodNutrient);
    }

    @Operation(summary = "Actualizar un nutriente de alimento",
            description = "Actualiza un nutriente de alimento existente mediante su ID.") @ApiResponse(
                    responseCode = "200", description = "Nutriente de alimento actualizado",
                    content = @Content(mediaType = "application/json",
                            schema = @Schema(implementation = FoodNutrient.class))) @ApiResponse(responseCode = "404",
                                    description = "Nutriente de alimento no encontrado") @PutMapping("/{id}")
    public ResponseEntity<FoodNutrient> updateFoodNutrient(@PathVariable Long id,
            @RequestBody FoodNutrient foodNutrient) {
        return foodNutrientService.updateFoodNutrient(id, foodNutrient).map(ResponseEntity::ok)
                .orElse(ResponseEntity.notFound().build());
    }

    @Operation(summary = "Eliminar un nutriente de alimento",
            description = "Elimina un nutriente de alimento mediante su ID.") @ApiResponse(responseCode = "204",
                    description = "Nutriente de alimento eliminado") @ApiResponse(responseCode = "404",
                            description = "Nutriente de alimento no encontrado") @DeleteMapping("/{id}")
    public ResponseEntity<Void> deleteFoodNutrient(@PathVariable Long id) {
        if (foodNutrientService.deleteFoodNutrient(id)) {
            return ResponseEntity.noContent().build();
        } else {
            return ResponseEntity.notFound().build();
        }
    }

}
