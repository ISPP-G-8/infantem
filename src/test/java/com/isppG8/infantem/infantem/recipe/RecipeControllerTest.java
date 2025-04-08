package com.isppG8.infantem.infantem.recipe;

import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.jsonPath;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.status;

import java.util.List;

import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.delete;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.get;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.post;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.put;

import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.mockito.Mockito;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.autoconfigure.web.servlet.AutoConfigureMockMvc;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.http.MediaType;
import org.springframework.test.context.ActiveProfiles;
import org.springframework.test.context.bean.override.mockito.MockitoBean;
import org.springframework.test.web.servlet.MockMvc;
import org.springframework.test.web.servlet.setup.MockMvcBuilders;
import org.springframework.transaction.annotation.Transactional;

import com.isppG8.infantem.infantem.baby.Baby;
import com.isppG8.infantem.infantem.baby.BabyService;
import com.isppG8.infantem.infantem.user.User;
import com.isppG8.infantem.infantem.user.UserService;

@SpringBootTest
@ActiveProfiles("test")
@Transactional
@AutoConfigureMockMvc
public class RecipeControllerTest {

    @Autowired
    private MockMvc mockMvc;

    @MockitoBean
    private UserService userService;

    @MockitoBean
    private BabyService babyService;

    @Autowired
    private RecipeController recipeController;

    @BeforeEach
    void setUp() {
        Baby baby = new Baby();
        baby.setId(1);
        baby.setBirthDate(java.time.LocalDate.of(2018, 1, 1));

        User user = new User();
        user.setId(1);
        user.setBabies(List.of(baby));

        Mockito.when(babyService.findById(1)).thenReturn(baby);
        Mockito.when(userService.findCurrentUser()).thenReturn(user);
        mockMvc = MockMvcBuilders.standaloneSetup(recipeController).build();
    }

    @Test
    void testGetAllRecipes() throws Exception {
        Mockito.when(userService.findCurrentUserId()).thenReturn(1);
        mockMvc.perform(get("/api/v1/recipes").contentType(MediaType.APPLICATION_JSON)).andExpect(status().isOk())
                .andExpect(jsonPath("$.content.length()").value(5))
                .andExpect(jsonPath("$.content[0].name").value("Puré de Zanahoria y Batata"));
    }

    @Test
    void testGetRecipeById() throws Exception {
        Mockito.when(userService.findCurrentUserId()).thenReturn(1);
        mockMvc.perform(get("/api/v1/recipes/1").contentType(MediaType.APPLICATION_JSON)).andExpect(status().isOk())
                .andExpect(jsonPath("$.name").value("Puré de Zanahoria y Batata"));
    }

    @Test
    void testCreateRecipe() throws Exception {
        String recipeJson = """
                    {
                        "name": "Puré de Manzana",
                        "description": "Receta saludable para bebés",
                        "ingredients": "Manzana, Agua",
                        "minRecommendedAge": 6,
                        "maxRecommendedAge": 12,
                        "elaboration": "Cocer las manzanas y triturar"
                    }
                """;

        mockMvc.perform(post("/api/v1/recipes").contentType(MediaType.APPLICATION_JSON).content(recipeJson))
                .andExpect(status().isCreated()).andExpect(jsonPath("$.name").value("Puré de Manzana"));
    }

    @Test
    void testUpdateRecipe() throws Exception {
        String updatedRecipeJson = """
                    {
                        "name": "Puré de Manzana y Pera",
                        "description": "Receta actualizada",
                        "ingredients": "Manzana, Pera, Agua",
                        "minRecommendedAge": 6,
                        "maxRecommendedAge": 12,
                        "elaboration": "Cocer las frutas y triturar"
                    }
                """;

        Mockito.when(userService.findCurrentUserId()).thenReturn(1);
        mockMvc.perform(put("/api/v1/recipes/1").contentType(MediaType.APPLICATION_JSON).content(updatedRecipeJson))
                .andExpect(status().isOk()).andExpect(jsonPath("$.name").value("Puré de Manzana y Pera"))
                .andExpect(jsonPath("$.description").value("Receta actualizada"));
    }

    @Test
    void testDeleteRecipe() throws Exception {
        Mockito.when(userService.findCurrentUserId()).thenReturn(1);
        mockMvc.perform(delete("/api/v1/recipes/1").contentType(MediaType.APPLICATION_JSON)).andExpect(status().isOk());
    }

    @Test
    void testGetAllRecommendedRecipes() throws Exception {
        mockMvc.perform(get("/api/v1/recipes/recommended").contentType(MediaType.APPLICATION_JSON))
                .andExpect(status().isOk()).andExpect(jsonPath("$.content.length()").value(10))
                .andExpect(jsonPath("$.content[0].name").value("Puré de Pollo con Verduras"));
    }

    @Test
    void testGetRecommendedRecipesForBaby() throws Exception {
        mockMvc.perform(get("/api/v1/recipes/recommended/1").contentType(MediaType.APPLICATION_JSON))
                .andExpect(status().isOk()).andExpect(jsonPath("$.length()").value(7))
                .andExpect(jsonPath("$[0].name").value("Puré de Pollo con Verduras"));
    }

    @Test
    void testFilterRecipesByMaxAge() throws Exception {
        Mockito.when(userService.findCurrentUserId()).thenReturn(1);
        mockMvc.perform(get("/api/v1/recipes").param("maxAge", "8").contentType(MediaType.APPLICATION_JSON))
                .andExpect(status().isOk()).andExpect(jsonPath("$.content.length()").value(3))
                .andExpect(jsonPath("$.content[0].name").value("Puré de Zanahoria y Batata"));
    }

    @Test
    void testFilterRecommendedRecipesByMaxAge() throws Exception {
        mockMvc.perform(
                get("/api/v1/recipes/recommended").param("maxAge", "11").contentType(MediaType.APPLICATION_JSON))
                .andExpect(status().isOk()).andExpect(jsonPath("$.content.length()").value(9))
                .andExpect(jsonPath("$.content[0].name").value("Croquetas de Pescado"));
    }

    @Test
    void testFilterRecipesByMinxAge() throws Exception {
        Mockito.when(userService.findCurrentUserId()).thenReturn(1);
        mockMvc.perform(get("/api/v1/recipes").param("minAge", "6").contentType(MediaType.APPLICATION_JSON))
                .andExpect(status().isOk()).andExpect(jsonPath("$.content.length()").value(4))
                .andExpect(jsonPath("$.content[0].name").value("Puré de Zanahoria y Batata"));
    }

    @Test
    void testFilterRecommendedRecipesByMinxAge() throws Exception {
        Mockito.when(userService.findCurrentUserId()).thenReturn(1);
        mockMvc.perform(get("/api/v1/recipes/recommended").param("minAge", "7").contentType(MediaType.APPLICATION_JSON))
                .andExpect(status().isOk()).andExpect(jsonPath("$.content.length()").value(7))
                .andExpect(jsonPath("$.content[0].name").value("Puré de Pollo con Verduras"));
    }

    @Test
    void testFilterRecipesByIngredients() throws Exception {
        Mockito.when(userService.findCurrentUserId()).thenReturn(1);
        mockMvc.perform(
                get("/api/v1/recipes").param("ingredients", "zanahoria").contentType(MediaType.APPLICATION_JSON))
                .andExpect(status().isOk()).andExpect(jsonPath("$.content.length()").value(3))
                .andExpect(jsonPath("$.content[0].name").value("Puré de Zanahoria y Batata"));
        mockMvc.perform(get("/api/v1/recipes").param("ingredients", "").contentType(MediaType.APPLICATION_JSON))
                .andExpect(status().isOk()).andExpect(jsonPath("$.content.length()").value(5))
                .andExpect(jsonPath("$.content[0].name").value("Puré de Zanahoria y Batata"));
    }

    @Test
    void testFilterRecommendedRecipesByIngredients() throws Exception {
        Mockito.when(userService.findCurrentUserId()).thenReturn(1);
        mockMvc.perform(get("/api/v1/recipes/recommended").param("ingredients", "Pollo")
                .contentType(MediaType.APPLICATION_JSON)).andExpect(status().isOk())
                .andExpect(jsonPath("$.content.length()").value(2))
                .andExpect(jsonPath("$.content[0].name").value("Puré de Pollo con Verduras"));
        mockMvc.perform(
                get("/api/v1/recipes/recommended").param("ingredients", "").contentType(MediaType.APPLICATION_JSON))
                .andExpect(status().isOk()).andExpect(jsonPath("$.content.length()").value(10))
                .andExpect(jsonPath("$.content[0].name").value("Puré de Pollo con Verduras"));
    }

    @Test
    void testFilterRecipesByName() throws Exception {
        Mockito.when(userService.findCurrentUserId()).thenReturn(1);
        mockMvc.perform(get("/api/v1/recipes").param("name", "batata").contentType(MediaType.APPLICATION_JSON))
                .andExpect(status().isOk()).andExpect(jsonPath("$.content.length()").value(1))
                .andExpect(jsonPath("$.content[0].name").value("Puré de Zanahoria y Batata"));
        mockMvc.perform(get("/api/v1/recipes").param("ingredients", "").contentType(MediaType.APPLICATION_JSON))
                .andExpect(status().isOk()).andExpect(jsonPath("$.content.length()").value(5))
                .andExpect(jsonPath("$.content[0].name").value("Puré de Zanahoria y Batata"));
    }

    @Test
    void testFilterRecommendedRecipesByName() throws Exception {
        Mockito.when(userService.findCurrentUserId()).thenReturn(1);
        mockMvc.perform(
                get("/api/v1/recipes/recommended").param("name", "puré").contentType(MediaType.APPLICATION_JSON))
                .andExpect(status().isOk()).andExpect(jsonPath("$.content.length()").value(3))
                .andExpect(jsonPath("$.content[0].name").value("Puré de Pollo con Verduras"));
        mockMvc.perform(get("/api/v1/recipes").param("ingredients", "").contentType(MediaType.APPLICATION_JSON))
                .andExpect(status().isOk()).andExpect(jsonPath("$.content.length()").value(5))
                .andExpect(jsonPath("$.content[0].name").value("Puré de Zanahoria y Batata"));
    }

    @Test
    void testFilterRecipesByAllergens() throws Exception {
        Mockito.when(userService.findCurrentUserId()).thenReturn(1);
        mockMvc.perform(get("/api/v1/recipes").param("allergens", "Gluten").contentType(MediaType.APPLICATION_JSON))
                .andExpect(status().isOk()).andExpect(jsonPath("$.content.length()").value(4))
                .andExpect(jsonPath("$.content[0].name").value("Crema de Calabaza y Calabacín"));
        mockMvc.perform(get("/api/v1/recipes").param("allergens", "").contentType(MediaType.APPLICATION_JSON))
                .andExpect(status().isOk()).andExpect(jsonPath("$.content.length()").value(5))
                .andExpect(jsonPath("$.content[0].name").value("Puré de Zanahoria y Batata"));
    }

    @Test
    void testFilterRecommendedRecipesByAllergens() throws Exception {
        mockMvc.perform(
                get("/api/v1/recipes/recommended").param("allergens", "Gluten").contentType(MediaType.APPLICATION_JSON))
                .andExpect(status().isOk()).andExpect(jsonPath("$.content.length()").value(10))
                .andExpect(jsonPath("$.content[0].name").value("Puré de Pollo con Verduras"));
        mockMvc.perform(
                get("/api/v1/recipes/recommended").param("allergens", "").contentType(MediaType.APPLICATION_JSON))
                .andExpect(status().isOk()).andExpect(jsonPath("$.content.length()").value(10))
                .andExpect(jsonPath("$.content[0].name").value("Puré de Pollo con Verduras"));
    }

    @Test
    void testCreateRecipeWithEmptyName() throws Exception {
        String recipeJsonWithEmptyName = """
                    {
                        "name": "",
                        "description": "Descripción válida",
                        "ingredients": "Ingredientes válidos",
                        "minRecommendedAge": 6,
                        "maxRecommendedAge": 12,
                        "elaboration": "Elaboración válida"
                    }
                """;

        mockMvc.perform(
                post("/api/v1/recipes").contentType(MediaType.APPLICATION_JSON).content(recipeJsonWithEmptyName))
                .andExpect(status().isBadRequest());
    }

    @Test
    void testCreateRecipeWithInvalidMinRecommendedAge() throws Exception {
        String recipeJsonWithInvalidMinAge = """
                    {
                        "name": "Nombre válido",
                        "description": "Descripción válida",
                        "ingredients": "Ingredientes válidos",
                        "minRecommendedAge": -1,
                        "maxRecommendedAge": 12,
                        "elaboration": "Elaboración válida"
                    }
                """;

        mockMvc.perform(
                post("/api/v1/recipes").contentType(MediaType.APPLICATION_JSON).content(recipeJsonWithInvalidMinAge))
                .andExpect(status().isBadRequest());
    }

    @Test
    void testCreateRecipeWithInvalidMaxRecommendedAge() throws Exception {
        String recipeJsonWithInvalidMaxAge = """
                    {
                        "name": "Nombre válido",
                        "description": "Descripción válida",
                        "ingredients": "Ingredientes válidos",
                        "minRecommendedAge": 6,
                        "maxRecommendedAge": 37,
                        "elaboration": "Elaboración válida"
                    }
                """;

        mockMvc.perform(
                post("/api/v1/recipes").contentType(MediaType.APPLICATION_JSON).content(recipeJsonWithInvalidMaxAge))
                .andExpect(status().isBadRequest());
    }

}
