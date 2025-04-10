package com.isppG8.infantem.infantem.recipe;

import java.util.ArrayList;
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
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import com.isppG8.infantem.infantem.user.UserService;
import com.isppG8.infantem.infantem.auth.AuthoritiesService;

import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.media.Content;
import io.swagger.v3.oas.annotations.media.Schema;
import io.swagger.v3.oas.annotations.responses.ApiResponse;
import io.swagger.v3.oas.annotations.tags.Tag;

import com.isppG8.infantem.infantem.recipe.dto.RecipeDTO;

import jakarta.validation.Valid;

@Tag(name = "RecipesAdmin", description = "Gestión de recetas para la alimentación de bebés admin")
@RestController
@RequestMapping("/api/v1/admin/recipes")
public class RecipeControllerAdmin {

    private RecipeService recipeService;

    private AuthoritiesService authoritiesService;

    @Autowired
    public RecipeControllerAdmin(RecipeService recipeService, UserService userService,
            AuthoritiesService authoritiesService) {
        this.recipeService = recipeService;
        this.authoritiesService = authoritiesService;
    }

    /*
     * @Operation(summary = "Obtener todas las recetas", description =
     * "Recupera todas las recetas filtradas por parámetros opcionales como edad, ingredientes, y alérgenos."
     * ) @ApiResponse( responseCode = "200", description = "Lista de recetas encontrada", content = @Content(mediaType =
     * "application/json", schema = @Schema(implementation = RecipeDTO.class))) @GetMapping public
     * ResponseEntity<Page<RecipeDTO>> getAllRecipes(@RequestParam(value = "page", defaultValue = "0") Integer page,
     * @RequestParam(value = "size", defaultValue = "10") Integer size) { if (authoritiesService.isAdmin()) { Pageable
     * pageable = PageRequest.of(page, size); List<Recipe> recipes = new ArrayList<>(recipeService.getAll()); int start
     * = (int) pageable.getOffset(); int end = Math.min((start + pageable.getPageSize()), recipes.size()); Page<Recipe>
     * paginatedRecipes = new PageImpl<>(recipes.subList(start, end), pageable, recipes.size()); return
     * ResponseEntity.ok(paginatedRecipes.map(RecipeDTO::new)); } return null; }
     */

    @Operation(summary = "Obtener todas las recetas",
            description = "Recupera todas las recetas filtradas por parámetros opcionales como edad, ingredientes, y alérgenos.") @ApiResponse(
                    responseCode = "200", description = "Lista de recetas encontrada",
                    content = @Content(mediaType = "application/json",
                            schema = @Schema(implementation = RecipeDTO.class))) @GetMapping
    public List<RecipeDTO> getAllRecipes(@RequestParam(value = "page", defaultValue = "0") Integer page,
            @RequestParam(value = "size", defaultValue = "10") Integer size) {
        if (authoritiesService.isAdmin()) {
            List<RecipeDTO> recipes = new ArrayList<>(recipeService.getAll().stream().map(RecipeDTO::new).toList());
            return recipes;
        }
        return null;
    }

    @Operation(summary = "Obtener receta por ID",
            description = "Recupera los detalles de una receta utilizando su ID.") @ApiResponse(responseCode = "200",
                    description = "Receta encontrada", content = @Content(mediaType = "application/json",
                            schema = @Schema(implementation = Recipe.class))) @GetMapping("/{id}")
    public ResponseEntity<Recipe> getRecipeById(@PathVariable Long id) {
        if (authoritiesService.isAdmin()) {
            Recipe recipe = recipeService.getRecipeByIdAdmin(id);
            return ResponseEntity.ok(recipe);
        }
        return null;
    }

    @Operation(summary = "Crear una receta", description = "Crea una nueva receta para un bebé.") @ApiResponse(
            responseCode = "201", description = "Receta creada con éxito",
            content = @Content(mediaType = "application/json",
                    schema = @Schema(implementation = Recipe.class))) @PostMapping
    public ResponseEntity<Recipe> createRecipe(@Valid @RequestBody Recipe recipe) {
        if (authoritiesService.isAdmin()) {
            Recipe createdRecipe = recipeService.createRecipeAdmin(recipe);
            return ResponseEntity.status(201).body(createdRecipe);
        }
        return null;
    }

    @Operation(summary = "Actualizar una receta",
            description = "Actualiza los detalles de una receta existente.") @ApiResponse(responseCode = "200",
                    description = "Receta actualizada con éxito", content = @Content(mediaType = "application/json",
                            schema = @Schema(implementation = Recipe.class))) @PutMapping("/{id}")
    public ResponseEntity<Recipe> updateRecipe(@PathVariable Long id, @Valid @RequestBody Recipe recipeDetails) {
        if (authoritiesService.isAdmin()) {
            Recipe updatedRecipe = recipeService.updateRecipeAdmin(id, recipeDetails);
            return ResponseEntity.ok(updatedRecipe);
        }
        return null;
    }

    @Operation(summary = "Eliminar una receta", description = "Elimina una receta existente por su ID.") @ApiResponse(
            responseCode = "200", description = "Receta eliminada con éxito") @DeleteMapping("/{id}")
    public ResponseEntity<Void> deleteRecipe(@PathVariable Long id) {
        if (authoritiesService.isAdmin()) {
            recipeService.deleteRecipeAdmin(id);
            return ResponseEntity.ok().build();
        }
        return null;
    }

}
