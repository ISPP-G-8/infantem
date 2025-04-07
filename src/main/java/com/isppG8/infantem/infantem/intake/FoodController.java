package com.isppG8.infantem.infantem.intake;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.ResponseStatus;
import org.springframework.web.bind.annotation.RestController;

import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.media.Content;
import io.swagger.v3.oas.annotations.media.Schema;
import io.swagger.v3.oas.annotations.responses.ApiResponse;
import io.swagger.v3.oas.annotations.tags.Tag;
import jakarta.validation.Valid;

@Tag(name = "Foods", description = "Gestión de alimentos")
@RestController
@RequestMapping("/api/v1/food")
public class FoodController {

    private FoodService foodService;

    @Autowired
    public FoodController(FoodService foodService) {
        this.foodService = foodService;
    }

    @Operation(summary = "Obtener todos los alimentos",
            description = "Recupera la lista de todos los alimentos disponibles.") @ApiResponse(responseCode = "200",
                    description = "Lista de alimentos", content = @Content(mediaType = "application/json",
                            schema = @Schema(implementation = Food.class))) @GetMapping("/list")
    public List<Food> getAllFoods() {
        return foodService.findAll();
    }

    @Operation(summary = "Crear un nuevo alimento", description = "Crea un nuevo alimento en el sistema.") @ApiResponse(
            responseCode = "201", description = "Alimento creado",
            content = @Content(mediaType = "application/json", schema = @Schema(
                    implementation = Food.class))) @PostMapping("/create") @ResponseStatus(HttpStatus.CREATED)
    public Food createFood(Food food) {
        foodService.save(food);
        return food;
    }

    @Operation(summary = "Actualizar un alimento",
            description = "Actualiza los detalles de un alimento existente.") @ApiResponse(responseCode = "200",
                    description = "Alimento actualizado",
                    content = @Content(mediaType = "application/json",
                            schema = @Schema(implementation = Food.class))) @ApiResponse(responseCode = "404",
                                    description = "Alimento no encontrado") @PutMapping("/update/{id}") @ResponseStatus(HttpStatus.OK)
    public void updateFood(@PathVariable("id") Long id, @RequestBody @Valid Food food) {
        Food foodToUpdate = foodService.findById(id);
        if (foodToUpdate == null) {
            throw new RuntimeException("Food not found");
        }
        foodToUpdate.setName(food.getName());
        foodToUpdate.setFoodCategory(food.getFoodCategory());
        foodToUpdate.setIngredients(food.getIngredients());
        foodService.save(food);
    }

    @Operation(summary = "Eliminar un alimento",
            description = "Elimina un alimento del sistema mediante su ID.") @ApiResponse(responseCode = "200",
                    description = "Alimento eliminado") @ApiResponse(responseCode = "404",
                            description = "Alimento no encontrado") @DeleteMapping("/delete/{id}") @ResponseStatus(HttpStatus.OK)
    public void deleteFood(@PathVariable("id") Long id) {
        Food food = foodService.findById(id);
        if (food == null) {
            throw new RuntimeException("Food not found");
        }
        foodService.delete(food);
    }
}
