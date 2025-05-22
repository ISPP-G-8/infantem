package com.isppG8.infantem.infantem.recipe;

import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.delete;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.get;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.post;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.put;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.status;
import static org.hamcrest.Matchers.is;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.jsonPath;
import static org.hamcrest.Matchers.hasSize;

import java.time.LocalDate;
import java.util.List;

import org.junit.jupiter.api.Test;
import org.mockito.Mockito;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.autoconfigure.web.servlet.WebMvcTest;
import org.springframework.test.context.bean.override.mockito.MockitoBean;
import org.springframework.boot.test.context.TestConfiguration;
import org.springframework.context.annotation.Bean;
import org.springframework.http.MediaType;
import org.springframework.security.test.context.support.WithMockUser;
import org.springframework.test.context.ActiveProfiles;
import org.springframework.test.web.servlet.MockMvc;
import static org.springframework.security.test.web.servlet.request.SecurityMockMvcRequestPostProcessors.csrf;

import com.isppG8.infantem.infantem.baby.Baby;
import com.isppG8.infantem.infantem.auth.AuthoritiesService;
import com.isppG8.infantem.infantem.exceptions.ResourceNotFoundException;

@WebMvcTest(RecipeControllerAdmin.class)
@WithMockUser(username = "testUser", roles = { "USER" })
@ActiveProfiles("test")
public class RecipeControllerAdminTest {

    @TestConfiguration
    static class TestConfig {
        @Bean
        public RecipeService recipeService() {
            return Mockito.mock(RecipeService.class);
        }

        @Bean
        public AuthoritiesService authoritiesService() {
            return Mockito.mock(AuthoritiesService.class);
        }
    }

    @Autowired
    private MockMvc mockMvc;

    @Autowired
    private RecipeService recipeService;

    @MockitoBean
    private AuthoritiesService authoritiesService;

    private final String token = "dummy-token";

    private Recipe createDummyRecipe(int intid) {

        Long id = Long.valueOf(intid);

        Recipe recipe = new Recipe();
        recipe.setId(id);

        recipe.setName("Test Recipe");

        recipe.setMinRecommendedAge(0);
        recipe.setMaxRecommendedAge(1);

        return recipe;
    }

    @Test
    public void testGetAllRecipes() throws Exception {
        Recipe r1 = createDummyRecipe(1);
        Recipe r2 = createDummyRecipe(2);
        List<Recipe> recipes = List.of(r1, r2);
        Mockito.when(recipeService.getAll()).thenReturn(recipes);
        Mockito.when(authoritiesService.isAdmin()).thenReturn(true);

        mockMvc.perform(get("/api/v1/admin/recipes").header("Authorization", "Bearer " + token))
                .andExpect(status().isOk()).andExpect(jsonPath("$", hasSize(2))).andExpect(jsonPath("$[0].id", is(1)))
                .andExpect(jsonPath("$[1].id", is(2)));
        ;
    }

    @Test
    public void testGetRecipeById_Success() throws Exception {
        Recipe recipe = createDummyRecipe(1);
        Mockito.when(recipeService.getRecipeByIdAdmin(1l)).thenReturn(recipe);
        Mockito.when(authoritiesService.isAdmin()).thenReturn(true);
        mockMvc.perform(get("/api/v1/admin/recipes/1").header("Authorization", "Bearer " + token))
                .andExpect(status().isOk()).andExpect(jsonPath("$.id", is(1)))
                .andExpect(jsonPath("$.name", is("Test Recipe")));
    }

    @Test
    public void testCreateRecipe_Success() throws Exception {
        String recipeJson = """
                {
                    "name": "Test Recipe",
                    "minRecommendedAge": 0,
                    "maxRecommendedAge": 1
                }
                """;
        Recipe savedRecipe = createDummyRecipe(1);
        Mockito.when(recipeService.createRecipeAdmin(Mockito.any(Recipe.class))).thenReturn(savedRecipe);
        Mockito.when(authoritiesService.isAdmin()).thenReturn(true);

        mockMvc.perform(post("/api/v1/admin/recipes").header("Authorization", "Bearer " + token).with(csrf())
                .contentType(MediaType.APPLICATION_JSON).content(recipeJson)).andExpect(status().isCreated())
                .andExpect(jsonPath("$.id", is(1))).andExpect(jsonPath("$.name", is("Test Recipe")));
    }

    @Test
    public void testUpdateRecipe_Success() throws Exception {
        String recipeJson = """
                {
                    "name": "Updated Recipe",
                    "minRecommendedAge": 1,
                    "maxRecommendedAge": 2
                }
                """;
        Recipe updatedRecipe = createDummyRecipe(1);
        updatedRecipe.setName("Updated Recipe");
        updatedRecipe.setMinRecommendedAge(1);
        updatedRecipe.setMaxRecommendedAge(2);

        Mockito.when(authoritiesService.isAdmin()).thenReturn(true);
        Mockito.when(recipeService.updateRecipeAdmin(Mockito.eq(1L), Mockito.any(Recipe.class)))
                .thenReturn(updatedRecipe);

        mockMvc.perform(put("/api/v1/admin/recipes/1").header("Authorization", "Bearer " + token).with(csrf())
                .contentType(MediaType.APPLICATION_JSON).content(recipeJson)).andExpect(status().isOk())
                .andExpect(jsonPath("$.id", is(1))).andExpect(jsonPath("$.name", is("Updated Recipe")));
    }

    @Test
    public void testUpdateRecipe_Invalid() throws Exception {
        String invalidJson = """
                {
                    "name": "Updated Recipe",
                    "minRecommendedAge": 100,
                    "maxRecommendedAge": 5000
                }
                """;

        Mockito.when(authoritiesService.isAdmin()).thenReturn(true);

        mockMvc.perform(put("/api/v1/admin/recipes/1").header("Authorization", "Bearer " + token).with(csrf())
                .contentType(MediaType.APPLICATION_JSON).content(invalidJson)).andExpect(status().isBadRequest());
    }

    @Test
    public void testDeleteRecipe_Success() throws Exception {
        Mockito.doNothing().when(recipeService).deleteRecipeAdmin(1L);
        Mockito.when(authoritiesService.isAdmin()).thenReturn(true);

        mockMvc.perform(delete("/api/v1/admin/recipes/1").header("Authorization", "Bearer " + token).with(csrf()))
                .andExpect(status().isOk());
    }

    @Test
    public void testDeleteRecipe_NotFound() throws Exception {
        Mockito.doThrow(new ResourceNotFoundException("Not Found")).when(recipeService).deleteRecipeAdmin(999L);
        Mockito.when(authoritiesService.isAdmin()).thenReturn(true);

        mockMvc.perform(delete("/api/v1/admin/recipes/999").header("Authorization", "Bearer " + token).with(csrf()))
                .andExpect(status().isNotFound());
    }
}
