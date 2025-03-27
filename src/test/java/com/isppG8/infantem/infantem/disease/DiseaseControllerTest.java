package com.isppG8.infantem.infantem.disease;

import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.jsonPath;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.status;

import java.util.List;

import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.delete;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.get;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.post;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.put;
import com.isppG8.infantem.infantem.utils.ResultMatcherUtils;

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
public class DiseaseControllerTest {

    @Autowired
    private MockMvc mockMvc;

    @MockitoBean
    private UserService userService;

    @MockitoBean
    private BabyService babyService;

    @Autowired
    private DiseaseController diseaseController;
    /*
     * @Id
     * @GeneratedValue(strategy = GenerationType.IDENTITY) private Integer Id;
     * @NotBlank private String name;
     * @NotNull
     * @PastOrPresent private LocalDate startDate;
     * @NotNull
     * @PastOrPresent private LocalDate endDate;
     * @NotBlank private String symptoms; private String extraObservations;
     * @ManyToOne
     * @NotNull
     * @JoinColumn(name = "baby_id") private Baby baby;
     */

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
        Mockito.when(userService.findCurrentUserId()).thenReturn(1);
        mockMvc = MockMvcBuilders.standaloneSetup(diseaseController).build();
    }

    @Test
    void testGetAll() throws Exception {
        mockMvc.perform(get("/api/v1/disease").contentType(MediaType.APPLICATION_JSON)).andExpect(status().isOk())
                .andExpect(ResultMatcherUtils.isLargerThan("$.length()", "4"))
                .andExpect(jsonPath("$[0].name").value("Varicela"));
    }

    @Test
    void testGetDiseaseById() throws Exception {
        mockMvc.perform(get("/api/v1/disease/1").contentType(MediaType.APPLICATION_JSON)).andExpect(status().isOk())
                .andExpect(jsonPath("$.name").value("Varicela"));
    }

    @Test
    void testCreateDisease() throws Exception {
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

        mockMvc.perform(post("/api/v1/disease").contentType(MediaType.APPLICATION_JSON).content(recipeJson))
                .andExpect(status().isCreated()).andExpect(jsonPath("$.name").value("Puré de Manzana"));
    }

    @Test
    void testUpdateDisease() throws Exception {
        String updatedDiseaseJson = """
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
        mockMvc.perform(put("/api/v1/disease/1").contentType(MediaType.APPLICATION_JSON).content(updatedDiseaseJson))
                .andExpect(status().isOk()).andExpect(jsonPath("$.name").value("Puré de Manzana y Pera"))
                .andExpect(jsonPath("$.description").value("Receta actualizada"));
    }

    @Test
    void testDeleteDisease() throws Exception {
        Mockito.when(userService.findCurrentUserId()).thenReturn(1);
        mockMvc.perform(delete("/api/v1/disease/1").contentType(MediaType.APPLICATION_JSON)).andExpect(status().isOk());
    }

    @Test
    void testGetAllRecommendedDiseases() throws Exception {
        mockMvc.perform(get("/api/v1/disease/recommended").contentType(MediaType.APPLICATION_JSON))
                .andExpect(status().isOk()).andExpect(jsonPath("$.content.length()").value(7))
                .andExpect(jsonPath("$.content[0].name").value("Puré de Pollo con Verduras"));
    }

    @Test
    void testGetRecommendedDiseasesForBaby() throws Exception {
        mockMvc.perform(get("/api/v1/disease/recommended/1").contentType(MediaType.APPLICATION_JSON))
                .andExpect(status().isOk()).andExpect(jsonPath("$.length()").value(3))
                .andExpect(jsonPath("$[0].name").value("Puré de Pollo con Verduras"));
    }

    @Test
    void testFilterDiseasesByMaxAge() throws Exception {
        Mockito.when(userService.findCurrentUserId()).thenReturn(1);
        mockMvc.perform(get("/api/v1/disease").param("maxAge", "8").contentType(MediaType.APPLICATION_JSON))
                .andExpect(status().isOk()).andExpect(jsonPath("$.content.length()").value(3))
                .andExpect(jsonPath("$.content[0].name").value("Puré de Zanahoria y Batata"));
    }

    @Test
    void testFilterRecommendedDiseasesByMaxAge() throws Exception {
        mockMvc.perform(
                get("/api/v1/disease/recommended").param("maxAge", "11").contentType(MediaType.APPLICATION_JSON))
                .andExpect(status().isOk()).andExpect(jsonPath("$.content.length()").value(4))
                .andExpect(jsonPath("$.content[0].name").value("Croquetas de Pescado"));
    }

    @Test
    void testFilterDiseasesByMinxAge() throws Exception {
        Mockito.when(userService.findCurrentUserId()).thenReturn(1);
        mockMvc.perform(get("/api/v1/disease").param("minAge", "6").contentType(MediaType.APPLICATION_JSON))
                .andExpect(status().isOk()).andExpect(jsonPath("$.content.length()").value(4))
                .andExpect(jsonPath("$.content[0].name").value("Puré de Zanahoria y Batata"));
    }

    @Test
    void testFilterRecommendedDiseasesByMinxAge() throws Exception {
        Mockito.when(userService.findCurrentUserId()).thenReturn(1);
        mockMvc.perform(get("/api/v1/disease/recommended").param("minAge", "7").contentType(MediaType.APPLICATION_JSON))
                .andExpect(status().isOk()).andExpect(jsonPath("$.content.length()").value(3))
                .andExpect(jsonPath("$.content[0].name").value("Puré de Pollo con Verduras"));
    }

    @Test
    void testFilterDiseasesByIngredients() throws Exception {
        Mockito.when(userService.findCurrentUserId()).thenReturn(1);
        mockMvc.perform(
                get("/api/v1/disease").param("ingredients", "zanahoria").contentType(MediaType.APPLICATION_JSON))
                .andExpect(status().isOk()).andExpect(jsonPath("$.content.length()").value(3))
                .andExpect(jsonPath("$.content[0].name").value("Puré de Zanahoria y Batata"));
        mockMvc.perform(get("/api/v1/disease").param("ingredients", "").contentType(MediaType.APPLICATION_JSON))
                .andExpect(status().isOk()).andExpect(jsonPath("$.content.length()").value(5))
                .andExpect(jsonPath("$.content[0].name").value("Puré de Zanahoria y Batata"));
    }

    @Test
    void testFilterRecommendedDiseasesByIngredients() throws Exception {
        Mockito.when(userService.findCurrentUserId()).thenReturn(1);
        mockMvc.perform(get("/api/v1/disease/recommended").param("ingredients", "Pollo")
                .contentType(MediaType.APPLICATION_JSON)).andExpect(status().isOk())
                .andExpect(jsonPath("$.content.length()").value(2))
                .andExpect(jsonPath("$.content[0].name").value("Puré de Pollo con Verduras"));
        mockMvc.perform(
                get("/api/v1/disease/recommended").param("ingredients", "").contentType(MediaType.APPLICATION_JSON))
                .andExpect(status().isOk()).andExpect(jsonPath("$.content.length()").value(7))
                .andExpect(jsonPath("$.content[0].name").value("Puré de Pollo con Verduras"));
    }

    @Test
    void testFilterDiseasesByAllergens() throws Exception {
        Mockito.when(userService.findCurrentUserId()).thenReturn(1);
        mockMvc.perform(get("/api/v1/disease").param("allergens", "Gluten").contentType(MediaType.APPLICATION_JSON))
                .andExpect(status().isOk()).andExpect(jsonPath("$.content.length()").value(4))
                .andExpect(jsonPath("$.content[0].name").value("Crema de Calabaza y Calabacín"));
        mockMvc.perform(get("/api/v1/disease").param("allergens", "").contentType(MediaType.APPLICATION_JSON))
                .andExpect(status().isOk()).andExpect(jsonPath("$.content.length()").value(5))
                .andExpect(jsonPath("$.content[0].name").value("Puré de Zanahoria y Batata"));
    }

    @Test
    void testFilterRecommendedDiseasesByAllergens() throws Exception {
        mockMvc.perform(
                get("/api/v1/disease/recommended").param("allergens", "Gluten").contentType(MediaType.APPLICATION_JSON))
                .andExpect(status().isOk()).andExpect(jsonPath("$.content.length()").value(7))
                .andExpect(jsonPath("$.content[0].name").value("Puré de Pollo con Verduras"));
        mockMvc.perform(
                get("/api/v1/disease/recommended").param("allergens", "").contentType(MediaType.APPLICATION_JSON))
                .andExpect(status().isOk()).andExpect(jsonPath("$.content.length()").value(7))
                .andExpect(jsonPath("$.content[0].name").value("Puré de Pollo con Verduras"));
    }

    @Test
    void testCreateDiseaseWithEmptyName() throws Exception {
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
                post("/api/v1/disease").contentType(MediaType.APPLICATION_JSON).content(recipeJsonWithEmptyName))
                .andExpect(status().isBadRequest());
    }

    @Test
    void testCreateDiseaseWithInvalidMinRecommendedAge() throws Exception {
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
                post("/api/v1/disease").contentType(MediaType.APPLICATION_JSON).content(recipeJsonWithInvalidMinAge))
                .andExpect(status().isBadRequest());
    }

    @Test
    void testCreateDiseaseWithInvalidMaxRecommendedAge() throws Exception {
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
                post("/api/v1/disease").contentType(MediaType.APPLICATION_JSON).content(recipeJsonWithInvalidMaxAge))
                .andExpect(status().isBadRequest());
    }

}
