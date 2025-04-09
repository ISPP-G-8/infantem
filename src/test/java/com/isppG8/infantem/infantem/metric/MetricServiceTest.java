package com.isppG8.infantem.infantem.metric;

import static org.junit.jupiter.api.Assertions.*;

import com.isppG8.infantem.infantem.InfantemApplication;
import com.isppG8.infantem.infantem.baby.Baby;
import com.isppG8.infantem.infantem.baby.BabyRepository;
import com.isppG8.infantem.infantem.baby.BabyService;
import com.isppG8.infantem.infantem.exceptions.ResourceNotFoundException;
import com.isppG8.infantem.infantem.user.User;
import com.isppG8.infantem.infantem.user.UserService;

import jakarta.persistence.EntityManager;
import jakarta.persistence.PersistenceContext;

import java.time.LocalDate;
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

@SpringBootTest(classes = { InfantemApplication.class, MetricServiceTest.class, MetricServiceTest.TestConfig.class })
@ActiveProfiles("test")
@AutoConfigureTestDatabase(replace = AutoConfigureTestDatabase.Replace.NONE) // Use the configured test database
@Transactional
@Import(MetricServiceTest.TestConfig.class)
public class MetricServiceTest {

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
    private MetricRepository metricRepository;

    @Autowired
    private MetricService metricService;

    @Autowired
    private UserService userService;
    @Autowired
    private BabyService babyService;

    private User currentUser;
    private Baby testBaby;
    private Metric testMetric;

    @PersistenceContext
    private EntityManager entityManager;

    @BeforeEach
    public void setUp() {
        metricRepository.deleteAll();
        // Reinicia la secuencia de la columna id en la tabla metric_table
        entityManager.createNativeQuery("ALTER TABLE metric_table ALTER COLUMN id RESTART WITH 1").executeUpdate();

        currentUser = new User();
        currentUser.setId(1);
        currentUser.setUsername("user1");

        testBaby = new Baby();
        testBaby.setId(1);
        testBaby.setName("Juan");
        testBaby.setUsers(List.of(currentUser));

        testMetric = new Metric();
        testMetric.setArmCircumference(18.0);
        testMetric.setHeadCircumference(36.0);
        testMetric.setHeight(59.0);
        testMetric.setWeight(8.0);
        testMetric.setDate(LocalDate.now());
        testMetric.setBaby(testBaby);
        testMetric = metricRepository.save(testMetric);
    }

    @Test
    public void testGetMetricById_Success() {
        Metric found = metricService.getMetricById(testMetric.getId().longValue());
        
        assertNotNull(found);
        assertEquals(testMetric.getId(), found.getId());
        assertEquals(8.0, found.getWeight());
    }

    @Test
    public void testGetMetricById_NotFound() {
        Long nonExistentId = 999L;
        assertThrows(ResourceNotFoundException.class, () -> {
            metricService.getMetricById(nonExistentId);
        });
    }

    @Test
    public void testGetAllMetricsByBabyId_Success() {
        Metric secondMetric = new Metric();
        secondMetric.setWeight(7.5);
        secondMetric.setHeight(60.0);
        secondMetric.setHeadCircumference(41.0); // Añadir
        secondMetric.setArmCircumference(16.0); // Añadir
        secondMetric.setDate(LocalDate.now()); // Añadir
        secondMetric.setBaby(testBaby);

        metricRepository.save(secondMetric);

        List<Metric> metrics = metricService.getAllMetricsByBabyId(testBaby.getId());

        assertEquals(2, metrics.size());
        assertTrue(metrics.stream().anyMatch(m -> m.getId().equals(testMetric.getId())));
    }


    @Test
    public void testGetAllMetricsByBabyId_Empty() {
        Integer babyIdWithoutMetrics = 999;
        List<Metric> metrics = metricService.getAllMetricsByBabyId(babyIdWithoutMetrics);
        
        assertTrue(metrics.isEmpty());
    }

    @Test
    public void testUpdateMetric_Success() {
        Metric updatedData = new Metric();
        updatedData.setWeight(5.0);
        updatedData.setHeight(65.0);
        updatedData.setHeadCircumference(38.0);
        updatedData.setArmCircumference(20.0);
        updatedData.setDate(LocalDate.now().plusDays(1));

        Metric updated = metricService.updateMetric(testMetric.getId().longValue(), updatedData);
        
        assertEquals(testMetric.getId(), updated.getId());
        assertEquals(5.0, updated.getWeight());
        assertEquals(65.0, updated.getHeight());
    }

    @Test
    public void testUpdateMetric_NotFound() {
        Long nonExistentId = 999L;
        Metric updatedData = new Metric();
        updatedData.setWeight(5.0);
        updatedData.setHeight(50.0);
        updatedData.setHeadCircumference(35.0);
        updatedData.setArmCircumference(18.0);
        updatedData.setDate(LocalDate.now());
        updatedData.setBaby(testBaby); // Necesario por @NotNull

        assertThrows(ResourceNotFoundException.class, () -> {
            metricService.updateMetric(nonExistentId, updatedData);
        });
    }


    @Test
    public void testDeleteMetric_Success() {
        Long idToDelete = testMetric.getId().longValue();

        assertDoesNotThrow(() -> {
            metricService.deleteMetric(idToDelete);
        });

        Optional<Metric> deleted = metricRepository.findById(idToDelete);
        assertTrue(deleted.isEmpty());
    }

    @Test
    public void testDeleteMetric_NotFound() {
        Long nonExistentId = 999L;
        assertThrows(ResourceNotFoundException.class, () -> {
            metricService.deleteMetric(nonExistentId);
        });
    }

    @Test
    public void testGetMetricsByUserIdAndDate_Success() {
        LocalDate startDate = LocalDate.now().minusDays(1);
        LocalDate endDate = LocalDate.now().plusDays(1);

        List<LocalDate> dates = metricService.getMetricsByUserIdAndDate(testBaby.getId(), startDate, endDate);
        
        assertFalse(dates.isEmpty());
        assertTrue(dates.contains(testMetric.getDate()));
    }
}