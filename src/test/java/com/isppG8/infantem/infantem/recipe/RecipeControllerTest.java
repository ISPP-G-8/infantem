package com.isppG8.infantem.infantem.recipe;

import static org.mockito.Mockito.doNothing;
import static org.mockito.Mockito.when;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.delete;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.get;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.post;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.put;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.jsonPath;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.status;

import java.util.Arrays;
import java.util.List;

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

import com.isppG8.infantem.infantem.auth.Authorities;
import com.isppG8.infantem.infantem.baby.Baby;
import com.isppG8.infantem.infantem.baby.BabyService;
import com.isppG8.infantem.infantem.recipe.dto.CustomRecipeRequestCreateDTO;
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

    @MockitoBean
    private CustomRecipeRequestService customRecipeRequestService;

    @Autowired
    private RecipeController recipeController;

    User user = new User();

    @BeforeEach
    void setUp() {
        Baby baby = new Baby();
        baby.setId(1);
        baby.setBirthDate(java.time.LocalDate.of(2018, 1, 1));
        user.setId(1);
        user.setBabies(List.of(baby));
        Authorities mockAuthorities = Mockito.mock(Authorities.class);
        user.setAuthorities(mockAuthorities);
        Mockito.when(user.getAuthorities().getAuthority()).thenReturn("nutritionist");
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
                .andExpect(status().isOk()).andExpect(jsonPath("$.content.length()").value(8))
                .andExpect(jsonPath("$.content[0].name").value("Arroz con Pollo y Verduras"));
    }

    @Test
    void testGetRecommendedRecipesForBaby() throws Exception {
        mockMvc.perform(get("/api/v1/recipes/recommended/1").contentType(MediaType.APPLICATION_JSON))
                .andExpect(status().isOk()).andExpect(jsonPath("$.length()").value(3))
                .andExpect(jsonPath("$[0].name").value("Pescado al Vapor"));
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
                .andExpect(status().isOk()).andExpect(jsonPath("$.content.length()").value(5))
                .andExpect(jsonPath("$.content[0].name").value("Arroz con Pollo y Verduras"));
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
                .andExpect(status().isOk()).andExpect(jsonPath("$.content.length()").value(3))
                .andExpect(jsonPath("$.content[0].name").value("Pescado al Vapor"));
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
                .andExpect(jsonPath("$.content.length()").value(1))
                .andExpect(jsonPath("$.content[0].name").value("Arroz con Pollo y Verduras"));
        mockMvc.perform(
                get("/api/v1/recipes/recommended").param("ingredients", "").contentType(MediaType.APPLICATION_JSON))
                .andExpect(status().isOk()).andExpect(jsonPath("$.content.length()").value(8))
                .andExpect(jsonPath("$.content[0].name").value("Arroz con Pollo y Verduras"));
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
                .andExpect(status().isOk()).andExpect(jsonPath("$.content.length()").value(1))
                .andExpect(jsonPath("$.content[0].name").value("Puré de Calabaza y Lentejas"));
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
                .andExpect(status().isOk()).andExpect(jsonPath("$.content.length()").value(8))
                .andExpect(jsonPath("$.content[0].name").value("Arroz con Pollo y Verduras"));
        mockMvc.perform(
                get("/api/v1/recipes/recommended").param("allergens", "").contentType(MediaType.APPLICATION_JSON))
                .andExpect(status().isOk()).andExpect(jsonPath("$.content.length()").value(8))
                .andExpect(jsonPath("$.content[0].name").value("Arroz con Pollo y Verduras"));
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

    @Test
    void testGetVisibleRecipesByUserId() throws Exception {
        mockMvc.perform(get("/api/v1/recipes/visible").param("page", "0").param("size", "2")
                .contentType(MediaType.APPLICATION_JSON)).andExpect(status().isOk())
                .andExpect(jsonPath("$.content.length()").value(2))
                .andExpect(jsonPath("$.content[0].name").value("Arroz con Pollo y Verduras"))
                .andExpect(jsonPath("$.content[1].name").value("Pescado al Vapor"));

        mockMvc.perform(get("/api/v1/recipes/visible").param("name", "Puré").param("page", "0").param("size", "2")
                .contentType(MediaType.APPLICATION_JSON)).andExpect(status().isOk())
                .andExpect(jsonPath("$.content.length()").value(1))
                .andExpect(jsonPath("$.content[0].name").value("Puré de Calabaza y Lentejas"));
    }

    @Test
    void testGetAllCustomRecipeRequests() throws Exception {
        // Arrange
        CustomRecipeRequest request1 = new CustomRecipeRequest();
        request1.setId(1L);
        request1.setDetails("Solicitud 1");
        CustomRecipeRequest request2 = new CustomRecipeRequest();
        request2.setId(2L);
        request2.setDetails("Solicitud 2");
        List<CustomRecipeRequest> requests = Arrays.asList(request1, request2);
        when(customRecipeRequestService.getAllOpenRequests()).thenReturn(requests);

        // Act & Assert
        mockMvc.perform(get("/api/v1/recipes/custom-requests").param("page", "0").param("size", "10")
                .contentType(MediaType.APPLICATION_JSON)).andExpect(status().isOk())
                .andExpect(jsonPath("$.content.length()").value(2));
    }

    @Test
    void testGetRequestsByUser() throws Exception {

        Mockito.when(user.getAuthorities().getAuthority()).thenReturn("premium");
        // Act & Assert
        mockMvc.perform(get("/api/v1/recipes/custom-requests/user").param("page", "0").param("size", "10")
                .contentType(MediaType.APPLICATION_JSON)).andExpect(status().isOk())
                .andExpect(jsonPath("$.content.length()").value(0));
    }

    @Test
    void testCreateCustomRecipeRequest() throws Exception {
        // Arrange
        String requestJson = """
                    {
                        "name": "Solicitud de receta personalizada",
                        "description": "Descripción de la solicitud",
                        "ingredients": "Manzana, Pera",
                        "minRecommendedAge": 6,
                        "maxRecommendedAge": 12,
                        "elaboration": "Cocer las frutas y triturar",
                        "user": 1,
                        "requestId": 123
                    }
                """;

        CustomRecipeRequest createdRequest = new CustomRecipeRequest();
        when(customRecipeRequestService.createRequest(Mockito.any(CustomRecipeRequestCreateDTO.class)))
                .thenReturn(createdRequest);

        // Act & Assert
        mockMvc.perform(
                post("/api/v1/recipes/custom-requests").contentType(MediaType.APPLICATION_JSON).content(requestJson))
                .andExpect(status().isCreated());
    }

    @Test
    void testDeleteCustomRecipeRequest() throws Exception {
        // Arrange
        Long requestId = 1L;
        doNothing().when(customRecipeRequestService).deleteRequest(requestId);

        // Act & Assert
        mockMvc.perform(
                delete("/api/v1/recipes/custom-requests/{id}", requestId).contentType(MediaType.APPLICATION_JSON))
                .andExpect(status().isOk());
    }

    @Test
    void testCloseRequest() throws Exception {
        // Arrange
        Long requestId = 1L;
        CustomRecipeRequest closedRequest = new CustomRecipeRequest();
        when(customRecipeRequestService.closeRequest(requestId)).thenReturn(closedRequest);

        // Act & Assert
        mockMvc.perform(
                post("/api/v1/recipes/custom-requests/{id}/close", requestId).contentType(MediaType.APPLICATION_JSON))
                .andExpect(status().isOk());
    }

}
