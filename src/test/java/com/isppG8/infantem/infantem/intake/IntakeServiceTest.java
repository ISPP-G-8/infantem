package com.isppG8.infantem.infantem.intake;

import static org.junit.jupiter.api.Assertions.*;

import com.isppG8.infantem.infantem.InfantemApplication;
import com.isppG8.infantem.infantem.baby.Baby;
import com.isppG8.infantem.infantem.baby.BabyService;
import com.isppG8.infantem.infantem.exceptions.ResourceNotFoundException;
import com.isppG8.infantem.infantem.exceptions.ResourceNotOwnedException;
import com.isppG8.infantem.infantem.recipe.Recipe;
import com.isppG8.infantem.infantem.recipe.RecipeRepository;
import com.isppG8.infantem.infantem.user.User;
import com.isppG8.infantem.infantem.user.UserService;

import java.time.LocalDateTime;
import java.util.List;
import java.util.Optional;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.autoconfigure.jdbc.AutoConfigureTestDatabase;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.boot.test.context.TestConfiguration;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Import;
import org.springframework.test.context.ActiveProfiles;
import org.springframework.transaction.annotation.Transactional;

@SpringBootTest(classes = { InfantemApplication.class, IntakeService.class, IntakeServiceTest.TestConfig.class })
@ActiveProfiles("test")
@AutoConfigureTestDatabase(replace = AutoConfigureTestDatabase.Replace.NONE) // Use the configured test database
@Transactional
@Import(IntakeServiceTest.TestConfig.class)
public class IntakeServiceTest {

    @TestConfiguration
    static class TestConfig {
        @Bean
        public UserService userService() {
            return org.mockito.Mockito.mock(UserService.class);
        }

        @Bean
        public BabyService babyService() {
            return org.mockito.Mockito.mock(BabyService.class);
        }
    }

    @Autowired
    private IntakeRepository intakeRepository;

    @Autowired
    private IntakeService intakeService;

    @Autowired
    private UserService userService;
    @Autowired
    private BabyService babyService;

    @Autowired
    private RecipeRepository recipeRepository;

    // Test data
    private User currentUser;
    private Baby testBaby;
    private Intake testIntake;

    @BeforeEach
    public void setUp() {

        currentUser = new User();
        currentUser.setId(1);
        currentUser.setUsername("user1");

        testBaby = new Baby();
        testBaby.setId(1);
        testBaby.setName("Juan");
        testBaby.setUsers(List.of(currentUser));

        Recipe breakfastRecipe = new Recipe();
        breakfastRecipe.setName("Breakfast Recipe");
        breakfastRecipe = recipeRepository.save(breakfastRecipe);

        testIntake = new Intake();
        testIntake.setDate(LocalDateTime.now());
        testIntake.setQuantity(200);
        testIntake.setObservations("Breakfast: the baby ate well, no issues.");
        testIntake.setBaby(testBaby);
        testIntake.setRecipes(List.of(breakfastRecipe));
        testIntake = intakeRepository.save(testIntake);
    }

    // Test for getAllIntakes: persist two records and verify that they are returned
    @Test
    public void testGetAllIntakes_ByCurrentUser() {

        Recipe lunchRecipe = new Recipe();
        lunchRecipe.setName("Lunch Recipe");
        lunchRecipe = recipeRepository.save(lunchRecipe);

        Intake secondIntake = new Intake();
        secondIntake.setDate(LocalDateTime.now());
        secondIntake.setQuantity(150);
        secondIntake.setObservations("Lunch: the baby left some food.");
        secondIntake.setBaby(testBaby);

        secondIntake.setRecipes(List.of(lunchRecipe));
        secondIntake = intakeRepository.save(secondIntake);

        org.mockito.Mockito.when(userService.findCurrentUser()).thenReturn(currentUser);
        List<Intake> result = intakeService.getAllIntakes();

        assertTrue(result.size() >= 2);
    }

    // Test for getIntakeById success
    @Test
    public void testGetIntakeById_Success() {
        Long id = testIntake.getId();
        org.mockito.Mockito.when(userService.findCurrentUser()).thenReturn(currentUser);
        org.mockito.Mockito.when(babyService.findById(testBaby.getId())).thenReturn(testBaby);

        Intake result = intakeService.getIntakeById(id);
        assertNotNull(result);
        assertEquals(testIntake.getObservations(), result.getObservations());
    }

    // Test for getIntakeById when not found
    @Test
    public void testGetIntakeById_NotFound() {
        Long id = 999L;
        org.mockito.Mockito.when(userService.findCurrentUser()).thenReturn(currentUser);

        assertThrows(ResourceNotFoundException.class, () -> intakeService.getIntakeById(id));
    }

    // Test for getIntakeById when the current user does not own the resource
    @Test
    public void testGetIntakeById_NotOwned() {
        Long id = testIntake.getId();

        User otherUser = new User();
        otherUser.setId(2);
        otherUser.setUsername("user2");
        org.mockito.Mockito.when(userService.findCurrentUser()).thenReturn(otherUser);
        org.mockito.Mockito.when(babyService.findById(testBaby.getId())).thenReturn(testBaby);

        assertThrows(ResourceNotOwnedException.class, () -> intakeService.getIntakeById(id));
    }

    // Test for saveIntake success using the real repository
    @Test
    public void testSaveIntake_Success() {

        Intake newIntake = new Intake();
        newIntake.setDate(LocalDateTime.now());
        newIntake.setQuantity(180);
        newIntake.setObservations("Snack: new intake record.");
        newIntake.setBaby(testBaby);

        Recipe snackRecipe = new Recipe();
        snackRecipe.setName("Snack Recipe");
        snackRecipe = recipeRepository.save(snackRecipe);
        newIntake.setRecipes(List.of(snackRecipe));

        org.mockito.Mockito.when(userService.findCurrentUser()).thenReturn(currentUser);
        org.mockito.Mockito.when(babyService.findById(testBaby.getId())).thenReturn(testBaby);

        Intake saved = intakeService.saveIntake(newIntake);
        assertNotNull(saved.getId());
        assertEquals("Snack: new intake record.", saved.getObservations());
    }

    @Test
    public void testSaveIntake_NotOwned() {
        Intake newIntake = new Intake();
        newIntake.setDate(LocalDateTime.now());
        newIntake.setQuantity(180);
        newIntake.setObservations("Snack: new intake record.");
        newIntake.setBaby(testBaby);

        User otherUser = new User();
        otherUser.setId(2);
        otherUser.setUsername("user2");
        org.mockito.Mockito.when(userService.findCurrentUser()).thenReturn(otherUser);
        org.mockito.Mockito.when(babyService.findById(testBaby.getId())).thenReturn(testBaby);

        assertThrows(ResourceNotOwnedException.class, () -> intakeService.saveIntake(newIntake));
    }

    // Test for updateIntake success
    @Test
    public void testUpdateIntake_Success() {
        Long id = testIntake.getId();

        Intake updatedIntake = new Intake();
        updatedIntake.setDate(LocalDateTime.now());
        updatedIntake.setQuantity(250);
        updatedIntake.setObservations("Update: quantity modified.");
        updatedIntake.setBaby(testBaby);

        org.mockito.Mockito.when(userService.findCurrentUser()).thenReturn(currentUser);
        org.mockito.Mockito.when(babyService.findById(testBaby.getId())).thenReturn(testBaby);

        Intake result = intakeService.updateIntake(id, updatedIntake);
        assertEquals(250, result.getQuantity());
        assertEquals("Update: quantity modified.", result.getObservations());
    }

    // Test for updateIntake when the current user does not own the resource
    @Test
    public void testUpdateIntake_NotOwned() {
        Long id = testIntake.getId();
        Intake updatedIntake = new Intake();
        updatedIntake.setBaby(testBaby);

        User otherUser = new User();
        otherUser.setId(2);
        otherUser.setUsername("user2");
        org.mockito.Mockito.when(userService.findCurrentUser()).thenReturn(otherUser);
        org.mockito.Mockito.when(babyService.findById(testBaby.getId())).thenReturn(testBaby);

        assertThrows(ResourceNotOwnedException.class, () -> intakeService.updateIntake(id, updatedIntake));
    }

    // Test for updateIntake when the intake to update is not found
    @Test
    public void testUpdateIntake_NotFound() {
        Long id = 999L; // Non-existent ID
        Intake updatedIntake = new Intake();
        updatedIntake.setBaby(testBaby);

        org.mockito.Mockito.when(userService.findCurrentUser()).thenReturn(currentUser);
        org.mockito.Mockito.when(babyService.findById(testBaby.getId())).thenReturn(testBaby);

        assertThrows(ResourceNotFoundException.class, () -> intakeService.updateIntake(id, updatedIntake));
    }

    // Test for deleteIntake success
    @Test
    public void testDeleteIntake_Success() {
        Long id = testIntake.getId();
        org.mockito.Mockito.when(userService.findCurrentUser()).thenReturn(currentUser);
        org.mockito.Mockito.when(babyService.findById(testBaby.getId())).thenReturn(testBaby);

        assertDoesNotThrow(() -> intakeService.deleteIntake(id));

        Optional<Intake> deleted = intakeRepository.findById(id);
        assertTrue(deleted.isEmpty());
    }

    // Test for deleteIntake when the current user does not own the resource
    @Test
    public void testDeleteIntake_NotOwned() {
        Long id = testIntake.getId();
        User otherUser = new User();
        otherUser.setId(2);
        otherUser.setUsername("user2");
        org.mockito.Mockito.when(userService.findCurrentUser()).thenReturn(otherUser);
        org.mockito.Mockito.when(babyService.findById(testBaby.getId())).thenReturn(testBaby);

        assertThrows(ResourceNotOwnedException.class, () -> intakeService.deleteIntake(id));
    }

    // Test for deleteIntake when the intake is not found
    @Test
    public void testDeleteIntake_NotFound() {
        Long id = 999L;
        assertThrows(ResourceNotFoundException.class, () -> intakeService.deleteIntake(id));
    }
}
