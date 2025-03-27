package com.isppG8.infantem.infantem.vaccine;

import static org.junit.jupiter.api.Assertions.assertEquals;
import static org.junit.jupiter.api.Assertions.assertThrows;
import static org.junit.jupiter.api.Assertions.assertTrue;

import java.time.LocalDate;
import java.util.List;

import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.mockito.Mockito;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.test.context.ActiveProfiles;
import org.springframework.test.context.bean.override.mockito.MockitoBean;

import com.isppG8.infantem.infantem.baby.Baby;
import com.isppG8.infantem.infantem.baby.BabyService;
import com.isppG8.infantem.infantem.exceptions.ResourceNotFoundException;
import com.isppG8.infantem.infantem.user.User;
import com.isppG8.infantem.infantem.user.UserService;

import jakarta.transaction.Transactional;

@SpringBootTest
@ActiveProfiles("test")
@Transactional
public class VaccineServiceTest {
    private VaccineService vaccineService;

    @Autowired
    public VaccineServiceTest(VaccineService vaccineService) {
        this.vaccineService = vaccineService;
    }

    @MockitoBean
    private UserService userService;

    @MockitoBean
    private BabyService babyService;

    private User currentUser;
    private Baby testBaby;

    @BeforeEach
    public void setUp() {

        currentUser = new User();
        currentUser.setId(1);
        currentUser.setUsername("user1");

        testBaby = new Baby();
        testBaby.setId(1);
        testBaby.setName("Juan");
        testBaby.setUsers(List.of(currentUser));
        currentUser.setBabies(List.of(testBaby));

        Mockito.when(userService.findCurrentUser()).thenReturn(currentUser);
        Mockito.when(babyService.findById(testBaby.getId())).thenReturn(testBaby);
    }

    @Test
    public void TestFindAll() {
        List<Vaccine> vaccines = vaccineService.getAll();
        assertEquals(10, vaccines.size(), "There should be 10 vaccines");
    }

    @Test
    public void TestFindVaccineById() {
        Vaccine vaccine = vaccineService.getById(1L);
        assertTrue(vaccine.getId() == 1);
        assertTrue(vaccine.getType().equals("MMR"));
    }

    @Test
    public void TestSaveVaccine() {
        Vaccine vaccine = new Vaccine();
        vaccine.setType("Hepatitis B");
        vaccine.setVaccinationDate(LocalDate.now());
        vaccine.setBaby(babyService.findById(1));

        Integer numVaccionesBefore = vaccineService.getAll().size();

        vaccineService.save(vaccine);

        assertEquals(numVaccionesBefore + 1, vaccineService.getAll().size(), "Vaccine not saved");
    }

    @Test
    public void TestDeleteVaccine() {
        vaccineService.delete(1L);
        assertThrows(ResourceNotFoundException.class, () -> vaccineService.getById(1L));
    }
}
