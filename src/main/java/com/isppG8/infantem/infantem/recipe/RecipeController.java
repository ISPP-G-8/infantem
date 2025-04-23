package com.isppG8.infantem.infantem.recipe;

import java.util.ArrayList;
import java.util.List;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageImpl;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RequestHeader;
import org.springframework.web.bind.annotation.RestController;
import com.isppG8.infantem.infantem.auth.payload.response.MessageResponse;

import com.isppG8.infantem.infantem.user.User;
import com.isppG8.infantem.infantem.user.UserService;

import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.media.Content;
import io.swagger.v3.oas.annotations.media.Schema;
import io.swagger.v3.oas.annotations.responses.ApiResponse;
import io.swagger.v3.oas.annotations.tags.Tag;

import com.isppG8.infantem.infantem.recipe.dto.RecipeDTO;
import com.isppG8.infantem.infantem.recipe.dto.CustomRecipeRequestDTO;

import jakarta.validation.Valid;
import org.springframework.web.bind.annotation.RequestPart;
import java.io.IOException;
import org.springframework.web.multipart.MultipartFile;

@Tag(name = "Recipes", description = "Gestión de recetas para la alimentación de bebés")
@RestController
@RequestMapping("/api/v1/recipes")
public class RecipeController {

    private RecipeService recipeService;

    private UserService userService;

    private CustomRecipeRequestService customRecipeRequestService;

    @Autowired
    public RecipeController(RecipeService recipeService, UserService userService,
            CustomRecipeRequestService customRecipeRequestService) {
        this.recipeService = recipeService;
        this.userService = userService;
        this.customRecipeRequestService = customRecipeRequestService;
    }

    @Operation(summary = "Obtener todas las recetas",
            description = "Recupera todas las recetas filtradas por parámetros opcionales como edad, ingredientes, y alérgenos.") @ApiResponse(
                    responseCode = "200", description = "Lista de recetas encontrada",
                    content = @Content(mediaType = "application/json",
                            schema = @Schema(implementation = RecipeDTO.class))) @GetMapping
    public ResponseEntity<Page<RecipeDTO>> getAllRecipes(
            @RequestParam(value = "maxAge", required = false) Integer maxAge,
            @RequestParam(value = "minAge", required = false) Integer minAge,
            @RequestParam(value = "ingredients", required = false) List<String> ingredients,
            @RequestParam(value = "allergens", required = false) List<String> allergens,
            @RequestParam(value = "name", required = false) String name,
            @RequestParam(value = "page", defaultValue = "0") Integer page,
            @RequestParam(value = "size", defaultValue = "10") Integer size) {

        Pageable pageable = PageRequest.of(page, size);
        List<Recipe> recipes = new ArrayList<>(recipeService.getCurrentUserRecipes());

        if (maxAge != null) {
            List<Recipe> recipesByMaxAge = recipeService.getRecipeByMaxAge(maxAge);
            recipes.retainAll(recipesByMaxAge);
        }
        if (minAge != null) {
            List<Recipe> recipesByMinAge = recipeService.getRecipeByMinAge(minAge);
            recipes.retainAll(recipesByMinAge);
        }
        if (ingredients != null && !ingredients.isEmpty()) {
            List<Recipe> recipesByIngredients = recipeService.getRecipeByIngredients(ingredients);
            recipes.retainAll(recipesByIngredients);
        }
        if (allergens != null && !allergens.isEmpty()) {
            List<Recipe> recipesByAllergens = recipeService.getRecipesFilteringAllergens(allergens);
            recipes.retainAll(recipesByAllergens);
        }

        if (name != null) {
            List<Recipe> recipesByName = recipeService.getRecipesByName(name);
            recipes.retainAll(recipesByName);
        }

        int start = (int) pageable.getOffset();
        int end = Math.min((start + pageable.getPageSize()), recipes.size());
        Page<Recipe> paginatedRecipes = new PageImpl<>(recipes.subList(start, end), pageable, recipes.size());

        return ResponseEntity.ok(paginatedRecipes.map(RecipeDTO::new));
    }

    @Operation(summary = "Obtener recetas recomendadas",
            description = "Recupera las recetas recomendadas basadas en diferentes filtros como edad, ingredientes y alérgenos.") @ApiResponse(
                    responseCode = "200", description = "Lista de recetas recomendadas encontrada",
                    content = @Content(mediaType = "application/json",
                            schema = @Schema(implementation = RecipeDTO.class))) @GetMapping("/recommended")
    public ResponseEntity<Page<RecipeDTO>> getAllRecommendedRecipes(
            @RequestParam(value = "maxAge", required = false) Integer maxAge,
            @RequestParam(value = "minAge", required = false) Integer minAge,
            @RequestParam(value = "ingredients", required = false) List<String> ingredients,
            @RequestParam(value = "allergens", required = false) List<String> allergens,
            @RequestParam(value = "name", required = false) String name,
            @RequestParam(value = "page", defaultValue = "0") Integer page,
            @RequestParam(value = "size", defaultValue = "10") Integer size) {

        Pageable pageable = PageRequest.of(page, size);
        List<Recipe> recipes = new ArrayList<>(recipeService.getAllRecommendedRecipes());

        if (maxAge != null) {
            List<Recipe> recipesByMaxAge = recipeService.getRecommendedRecipeByMaxAge(maxAge);
            recipes.retainAll(recipesByMaxAge);
        }
        if (minAge != null) {
            List<Recipe> recipesByMinAge = recipeService.getRecommendedRecipeByMinAge(minAge);
            recipes.retainAll(recipesByMinAge);
        }
        if (ingredients != null && !ingredients.isEmpty()) {
            List<Recipe> recipesByIngredients = recipeService.getRecommendedRecipeByIngredients(ingredients);
            recipes.retainAll(recipesByIngredients);
        }
        if (allergens != null && !allergens.isEmpty()) {
            List<Recipe> recipesByAllergens = recipeService.getRecommendedRecipesFilteringAllergens(allergens);
            recipes.retainAll(recipesByAllergens);
        }
        if (name != null) {
            List<Recipe> recipesByName = recipeService.getRecommendedRecipesByName(name);
            recipes.retainAll(recipesByName);
        }
        int start = (int) pageable.getOffset();
        int end = Math.min((start + pageable.getPageSize()), recipes.size());
        Page<Recipe> paginatedRecipes = new PageImpl<>(recipes.subList(start, end), pageable, recipes.size());

        return ResponseEntity.ok(paginatedRecipes.map(RecipeDTO::new));
    }

    @GetMapping("/visible")
    public ResponseEntity<Page<RecipeDTO>> getVisibleRecipesByUserId(
            @RequestParam(value = "name", required = false) String name,
            @RequestParam(value = "page", defaultValue = "0") Integer page,
            @RequestParam(value = "size", defaultValue = "10") Integer size) {

        Pageable pageable = PageRequest.of(page, size);
        List<Recipe> recipes = new ArrayList<>(recipeService.getVisibleRecipes());

        if (name != null) {
            List<Recipe> recipesByName = recipeService.getVisibleRecipesByName(name);
            recipes.retainAll(recipesByName);
        }
        int start = (int) pageable.getOffset();
        int end = Math.min((start + pageable.getPageSize()), recipes.size());
        Page<Recipe> paginatedRecipes = new PageImpl<>(recipes.subList(start, end), pageable, recipes.size());

        return ResponseEntity.ok(paginatedRecipes.map(RecipeDTO::new));
    }

    @Operation(summary = "Obtener recetas recomendadas por ID de bebé",
            description = "Recupera las recetas recomendadas para un bebé específico utilizando su ID.") @ApiResponse(
                    responseCode = "200", description = "Recetas recomendadas por bebé encontradas",
                    content = @Content(mediaType = "application/json",
                            schema = @Schema(implementation = RecipeDTO.class))) @GetMapping("/recommended/{babyId}")
    public ResponseEntity<List<RecipeDTO>> getRecommendedRecipes(@PathVariable Integer babyId) {
        List<Recipe> recipes = recipeService.getRecommendedRecipes(babyId);
        return ResponseEntity.ok(recipes.stream().map(RecipeDTO::new).toList());
    }

    @Operation(summary = "Obtener receta por ID",
            description = "Recupera los detalles de una receta utilizando su ID.") @ApiResponse(responseCode = "200",
                    description = "Receta encontrada", content = @Content(mediaType = "application/json",
                            schema = @Schema(implementation = Recipe.class))) @GetMapping("/{id}")
    public ResponseEntity<RecipeDTO> getRecipeById(@PathVariable Long id) {

        Recipe recipe = recipeService.getRecipeById(id);
        return ResponseEntity.ok(new RecipeDTO(recipe));
    }

    @Operation(summary = "Crear una receta", description = "Crea una nueva receta para un bebé.") @ApiResponse(
            responseCode = "201", description = "Receta creada con éxito",
            content = @Content(mediaType = "application/json",
                    schema = @Schema(implementation = Recipe.class))) @PostMapping
    public ResponseEntity<Recipe> createRecipe(@Valid @RequestBody Recipe recipe) {
        Recipe createdRecipe = recipeService.createRecipe(recipe);
        return ResponseEntity.status(201).body(createdRecipe);
    }

    @Operation(summary = "Crear una receta personalizada",
            description = "Crea una nueva receta personalizada para un bebé.") @ApiResponse(responseCode = "201",
                    description = "Receta personalizada creada con éxito", content = @Content(mediaType = "application/json",
                            schema = @Schema(implementation = Recipe.class))) @PostMapping("/custom")
    @PostMapping("/custom")
    public ResponseEntity<Recipe> createCustomRecipe(@Valid @RequestBody CustomRecipeDTO customRecipe) {
        Recipe recipe = this.recipeService.createCustomRecipe(customRecipe);
        return ResponseEntity.status(201).body(recipe);
    }

    @Operation(summary = "Actualizar una receta",
            description = "Actualiza los detalles de una receta existente.") @ApiResponse(responseCode = "200",
                    description = "Receta actualizada con éxito", content = @Content(mediaType = "application/json",
                            schema = @Schema(implementation = Recipe.class))) @PutMapping("/{id}")
    public ResponseEntity<Recipe> updateRecipe(@PathVariable Long id, @Valid @RequestBody RecipeDTO recipeDetails) {
        User user = userService.findCurrentUser();
        Recipe recipe = recipeService.getRecipeById(id);
        recipeDetails.setRecipePhoto(recipe.getRecipePhoto());
        Recipe updatedRecipe = recipeService.updateRecipe(id, recipeDetails, user.getId());
        return ResponseEntity.ok(updatedRecipe);
    }

    @Operation(summary = "Actualizar la foto de perfil de un usuario",
            description = "Actualiza la foto de perfil de un usuario por su ID.") @ApiResponse(responseCode = "200",
                    description = "Foto de perfil actualizada exitosamente") @ApiResponse(responseCode = "400",
                            description = "El usuario no es el tuyo") @PutMapping(value = "/{id}/recipe-photo",
                                    consumes = { "multipart/form-data" })
    public ResponseEntity<Object> updateRecipePhoto(@RequestPart(name = "recipePhoto") MultipartFile multipartFile,
            @PathVariable Long id, @RequestHeader(name = "Authorization") String token) throws IOException {

        Recipe recipe = recipeService.getRecipeById(id);

        if (multipartFile != null && !multipartFile.isEmpty()) {
            RecipeDTO recipeDTO = new RecipeDTO(recipe);
            recipeDTO.setRecipePhoto(multipartFile.getBytes());
            Integer userId = recipeService.getCurrentUserId();
            Recipe updatedRecipe = recipeService.updateRecipe(id, recipeDTO, userId);
            return ResponseEntity.ok().body(new RecipeDTO(updatedRecipe));
        } else {
            return ResponseEntity.badRequest().body(new MessageResponse("Recipe photo is empty"));
        }
    }

    @DeleteMapping("/{id}/recipe-photo")
    public ResponseEntity<MessageResponse> deleteRecipePhoto(@PathVariable Long id,
            @RequestHeader(name = "Authorization") String token) {
        Integer userId = recipeService.getCurrentUserId();
        Recipe recipe = recipeService.getRecipeById(id);
        RecipeDTO recipeDTO = new RecipeDTO(recipe);
        recipeDTO.setRecipePhoto(null);
        recipeService.updateRecipe(id, recipeDTO, userId);
        return ResponseEntity.ok().body(new MessageResponse("Photo deleted successfully"));
    }

    @Operation(summary = "Eliminar una receta", description = "Elimina una receta existente por su ID.") @ApiResponse(
            responseCode = "200", description = "Receta eliminada con éxito") @DeleteMapping("/{id}")
    public ResponseEntity<Void> deleteRecipe(@PathVariable Long id) {
        User user = userService.findCurrentUser();
        recipeService.deleteRecipe(id, user.getId());
        return ResponseEntity.ok().build();
    }

    // Custom Recipe Request

    @GetMapping("/custom-requests") @Operation(summary = "Obtener todas las solicitudes de recetas personalizadas",
            description = "Recupera todas las solicitudes de recetas personalizadas.") @ApiResponse(
                    responseCode = "200", description = "Lista de solicitudes de recetas personalizadas encontrada",
                    content = @Content(mediaType = "application/json",
                            schema = @Schema(implementation = CustomRecipeRequest.class))) @ApiResponse(
                                    responseCode = "403",
                                    description = "No tienes permiso para acceder a esta ruta") @ApiResponse(
                                            responseCode = "404", description = "No se encontraron solicitudes")
    public ResponseEntity<Page<CustomRecipeRequestDTO>> getAllCustomRecipeRequests(
            @RequestParam(value = "page", defaultValue = "0") Integer page,
            @RequestParam(value = "size", defaultValue = "10") Integer size) {

        List<CustomRecipeRequest> requests = customRecipeRequestService.getAllRequests();
        Pageable pageable = PageRequest.of(page, size);

        int start = (int) pageable.getOffset();
        int end = Math.min((start + pageable.getPageSize()), requests.size());
        Page<CustomRecipeRequest> paginatedRequests = new PageImpl<>(requests.subList(start, end), pageable,
                requests.size());

        return ResponseEntity.ok(paginatedRequests.map(CustomRecipeRequestDTO::new));
    }

    @Operation(summary = "Obtener todas las solicitudes de recetas personalizadas de un usuario",
            description = "Recupera todas las solicitudes de recetas personalizadas de un usuario.") @ApiResponse(
                    responseCode = "200", description = "Lista de solicitudes de recetas personalizadas encontrada",
                    content = @Content(mediaType = "application/json", schema = @Schema(
                            implementation = CustomRecipeRequest.class))) @GetMapping("/custom-requests/user")
    public ResponseEntity<Page<CustomRecipeRequestDTO>> getRequestsByUser(
            @RequestParam(value = "page", defaultValue = "0") Integer page,
            @RequestParam(value = "size", defaultValue = "10") Integer size) {
        List<CustomRecipeRequest> requests = customRecipeRequestService.getRequestsByUser();

        Pageable pageable = PageRequest.of(page, size);
        int start = (int) pageable.getOffset();
        int end = Math.min((start + pageable.getPageSize()), requests.size());
        Page<CustomRecipeRequest> paginatedRequests = new PageImpl<>(requests.subList(start, end), pageable,
                requests.size());

        return ResponseEntity.ok(paginatedRequests.map(CustomRecipeRequestDTO::new));
    }

    @Operation(summary = "Crear una solicitud de receta personalizada",
            description = "Crea una nueva solicitud de receta personalizada.") @ApiResponse(responseCode = "201",
                    description = "Solicitud de receta personalizada creada con éxito") @ApiResponse(
                            responseCode = "403",
                            description = "No tienes permiso para crear una solicitud de receta personalizada") @PostMapping("/custom-requests")
    public ResponseEntity<CustomRecipeRequest> createCustomRecipeRequest(
            @Valid @RequestBody CustomRecipeRequest request) {
        CustomRecipeRequest createdRequest = customRecipeRequestService.createRequest(request);
        return ResponseEntity.status(201).body(createdRequest);
    }

    @Operation(summary = "Eliminar una solicitud de receta personalizada",
            description = "Elimina una solicitud de receta personalizada por su ID.") @ApiResponse(responseCode = "200",
                    description = "Solicitud de receta personalizada eliminada con éxito") @ApiResponse(
                            responseCode = "403",
                            description = "No tienes permiso para eliminar esta solicitud") @ApiResponse(
                                    responseCode = "404",
                                    description = "Solicitud no encontrada") @DeleteMapping("/custom-requests/{id}")
    public void deleteCustomRecipeRequest(Long id) {
        customRecipeRequestService.deleteRequest(id);
    }

    @Operation(summary = "Cerrar una solicitud de receta personalizada",
            description = "Cierra una solicitud de receta personalizada por su ID.") @ApiResponse(responseCode = "200",
                    description = "Solicitud de receta personalizada cerrada con éxito") @ApiResponse(
                            responseCode = "403",
                            description = "No tienes permiso para cerrar esta solicitud") @ApiResponse(
                                    responseCode = "404",
                                    description = "Solicitud no encontrada") @PostMapping("/custom-requests/{id}/close")
    public ResponseEntity<CustomRecipeRequest> closeRequest(Long id) {
        CustomRecipeRequest request = customRecipeRequestService.closeRequest(id);
        return ResponseEntity.ok(request);
    }

}
