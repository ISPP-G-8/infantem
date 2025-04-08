package com.isppG8.infantem.infantem.disease;

import static org.junit.jupiter.api.Assertions.assertEquals;
import static org.junit.jupiter.api.Assertions.assertFalse;
import static org.junit.jupiter.api.Assertions.assertNotNull;
import static org.junit.jupiter.api.Assertions.assertThrows;
import static org.junit.jupiter.api.Assertions.assertTrue;

import java.time.LocalDate;
import java.util.List;
import java.util.Optional;
import java.util.Set;

import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.autoconfigure.jdbc.AutoConfigureTestDatabase;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.boot.test.context.TestConfiguration;
import org.springframework.boot.test.mock.mockito.MockBean;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Import;
import org.springframework.test.context.ActiveProfiles;
import org.springframework.test.context.bean.override.mockito.MockitoBean;

import com.isppG8.infantem.infantem.InfantemApplication;
import com.isppG8.infantem.infantem.baby.Baby;
import com.isppG8.infantem.infantem.baby.BabyRepository;
import com.isppG8.infantem.infantem.baby.BabyService;
import com.isppG8.infantem.infantem.disease.dto.DiseaseSummary;
import com.isppG8.infantem.infantem.exceptions.ResourceNotFoundException;
import com.isppG8.infantem.infantem.exceptions.ResourceNotOwnedException;
import com.isppG8.infantem.infantem.user.User;
import com.isppG8.infantem.infantem.user.UserService;

import jakarta.transaction.Transactional;

@SpringBootTest(classes = { InfantemApplication.class, DiseaseService.class, DiseaseServiceTest.TestConfig.class })
@ActiveProfiles("test")
@AutoConfigureTestDatabase(replace = AutoConfigureTestDatabase.Replace.NONE) // Use the configured test database
@Transactional
@Import(DiseaseServiceTest.TestConfig.class)
public class DiseaseServiceTest {

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
    private DiseaseRepository diseaseRepository;

    @Autowired
    private DiseaseService diseaseService;

    @Autowired
    private UserService userService;

    @Autowired
    private BabyService babyService;

    @MockitoBean
    private BabyRepository babyRepository;

    private User currentUser;
    private Baby testBaby;
    private Disease testDisease;

    @BeforeEach
    public void setUp() {
        currentUser = new User();
        currentUser.setId(1);
        currentUser.setUsername("user1");

        testBaby = new Baby();
        testBaby.setId(1);
        testBaby.setName("Juan");
        testBaby.setUsers(List.of(currentUser));

        testDisease = new Disease();
        testDisease.setId(1);
        testDisease.setName("Fever");
        testDisease.setStartDate(LocalDate.of(2025, 1, 1));
        testDisease.setEndDate(LocalDate.of(2025, 1, 3));
        testDisease.setSymptoms("High temperature");
        testDisease.setExtraObservations("No other symptoms");
        testDisease.setBaby(testBaby);
        testDisease = diseaseRepository.save(testDisease);
    }

    @Test
    public void testGetAllDiseases() {
        List<Disease> diseases = diseaseService.getAll();
        assertTrue(diseases.contains(testDisease));

        Disease newDisease = new Disease();
        newDisease.setId(2);
        newDisease.setName("Cough");
        newDisease.setStartDate(LocalDate.of(2025, 2, 1));
        newDisease.setEndDate(LocalDate.of(2025, 2, 3));
        newDisease.setSymptoms("Coughing");
        newDisease.setExtraObservations("No other symptoms");
        newDisease.setBaby(testBaby);
        newDisease = diseaseRepository.save(newDisease);
        assertTrue(diseases.contains(newDisease));
    }

    @Test
    public void testGetById_Succes() {
        Long id = (long) testDisease.getId();
        Disease disease = diseaseService.getById(id);
        assertNotNull(disease);
        assertEquals(testDisease.getExtraObservations(), disease.getExtraObservations());
    }

    @Test
    public void testGetById_NotFound() {
        Long id = 999L; // Non-existing ID
        assertThrows(ResourceNotFoundException.class, () -> diseaseService.getById(id));
    }

    @Test
    public void testSaveDisease() {
        Disease newDisease = new Disease();
        newDisease.setId(2);
        newDisease.setName("Flu");
        newDisease.setStartDate(LocalDate.of(2024, 3, 1));
        newDisease.setEndDate(LocalDate.of(2024, 3, 5));
        newDisease.setSymptoms("Coughing and fever");
        newDisease.setExtraObservations("No other symptoms");
        newDisease.setBaby(testBaby);
        Disease savedDisease = diseaseService.save(newDisease);

        assertNotNull(savedDisease.getId());
        assertEquals(newDisease.getName(), savedDisease.getName());

    }

    @Test
    public void testUpdateDisease_Success() {
        Long id = (long) testDisease.getId();

        Disease updatedDisease = new Disease();
        updatedDisease.setName("Updated Disease");
        updatedDisease.setStartDate(LocalDate.of(2023, 1, 2));
        updatedDisease.setEndDate(LocalDate.of(2023, 1, 4));
        updatedDisease.setSymptoms("Updated Symptoms");
        updatedDisease.setExtraObservations("Updated Observations");
        updatedDisease.setBaby(testBaby);

        testBaby.setUsers(List.of(currentUser));

        org.mockito.Mockito.when(userService.findCurrentUser()).thenReturn(currentUser);
        org.mockito.Mockito.when(babyRepository.findById(testBaby.getId())).thenReturn(Optional.of(testBaby));

        Disease res = diseaseService.update(id, updatedDisease);
        assertEquals("Updated Symptoms", res.getSymptoms());
        assertEquals("Updated Observations", res.getExtraObservations());
    }

    @Test
    public void testUpdateDisease_NotOwned() {
        Long id = (long) testDisease.getId();
        Disease updatedDisease = new Disease();
        updatedDisease.setBaby(testBaby);

        User otherUser = new User();
        otherUser.setId(2);
        otherUser.setUsername("user2");
        org.mockito.Mockito.when(userService.findCurrentUser()).thenReturn(otherUser);
        org.mockito.Mockito.when(babyService.findById(testBaby.getId())).thenReturn(testBaby);

        assertThrows(ResourceNotOwnedException.class, () -> diseaseService.update(id, updatedDisease));
    }

    @Test
    public void testUpdateDisease_NotFound() {
        Long id = 999L; // Non-existent ID
        Disease updatedDisease = new Disease();
        updatedDisease.setBaby(testBaby);

        org.mockito.Mockito.when(userService.findCurrentUser()).thenReturn(currentUser);
        org.mockito.Mockito.when(babyService.findById(testBaby.getId())).thenReturn(testBaby);

        assertThrows(ResourceNotFoundException.class, () -> diseaseService.update(id, updatedDisease));
    }

    @Test
    public void testDeleteDisease_Success() {
        Long id = (long) testDisease.getId();
        diseaseService.delete(id);
        assertThrows(ResourceNotFoundException.class, () -> diseaseService.getById(id));
    }

    @Test
    public void testDeleteDisease_Failure() {
        Long id = 999L;
        assertThrows(ResourceNotFoundException.class, () -> diseaseService.delete(id));
    }

    @Test
    public void testDiseasesByBabyIdAndDate() {
        LocalDate start = LocalDate.of(2025, 1, 1);
        LocalDate end = LocalDate.of(2025, 1, 5);

        Set<LocalDate> diseaseDates = diseaseService.getDiseasesByBabyIdAndDate(testBaby.getId(), start, end);

        // Esperamos que se incluyan 1, 2 y 3 de enero
        assertEquals(3, diseaseDates.size());
        assertTrue(diseaseDates.contains(LocalDate.of(2025, 1, 1)));
        assertTrue(diseaseDates.contains(LocalDate.of(2025, 1, 2)));
        assertTrue(diseaseDates.contains(LocalDate.of(2025, 1, 3)));

        // Fechas fuera del rango de la enfermedad
        assertFalse(diseaseDates.contains(LocalDate.of(2025, 1, 4)));
        assertFalse(diseaseDates.contains(LocalDate.of(2025, 1, 5)));
    }

    @Test
    public void testGetDiseaseSummaryByBabyIdAndDate() {
        // Día dentro del rango de la enfermedad testDisease (1 al 3 de enero 2025)
        LocalDate day = LocalDate.of(2025, 1, 2);

        List<DiseaseSummary> summaryList = diseaseService.getDiseaseSummaryByBabyIdAndDate(testBaby.getId(), day);

        summaryList.forEach(s -> System.out.println("DiseaseSummary: " + s.getId() + ", " + s.getName()));

        assertNotNull(summaryList);
        assertEquals(2, summaryList.size()); // Hay 2 por una que coge de base de datos

        DiseaseSummary summary = summaryList.get(0);
        assertEquals(testDisease.getId(), summary.getId());
        assertEquals(testDisease.getName(), summary.getName());
    }
}
