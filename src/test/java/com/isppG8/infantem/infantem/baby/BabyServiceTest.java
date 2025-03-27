package com.isppG8.infantem.infantem.baby;

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
import org.springframework.transaction.annotation.Transactional;

import com.isppG8.infantem.infantem.baby.dto.BabyDTO;
import com.isppG8.infantem.infantem.exceptions.ResourceNotFoundException;
import com.isppG8.infantem.infantem.user.User;
import com.isppG8.infantem.infantem.user.UserService;

@SpringBootTest
@ActiveProfiles("test")
@Transactional
public class BabyServiceTest {

    private BabyService babyService;

    @Autowired
    public BabyServiceTest(BabyService babyService) {
        this.babyService = babyService;
    }

    @MockitoBean
    private UserService userService;

    private User currentUser;
    private Baby testBaby;

    @BeforeEach
    public void setup() {
        currentUser = new User();
        currentUser.setId(1);
        currentUser.setUsername("user1");

        testBaby = new Baby();
        testBaby.setId(1);
        testBaby.setName("Juan");
        currentUser.setBabies(List.of(testBaby));

        Mockito.when(userService.findCurrentUser()).thenReturn(currentUser);
        Mockito.when(userService.findCurrentUserId()).thenReturn(currentUser.getId());
    }

    @Test
    public void TestGetBabiesByUser() {
        List<Baby> babies = babyService.findBabiesByUser();
        assertTrue(babies.size() == 1);

        Baby baby2 = new Baby();
        baby2.setId(2);
        baby2.setName("Pedro");
        currentUser.setBabies(List.of(testBaby, baby2));

        babies = babyService.findBabiesByUser();
        assertTrue(babies.size() == 2);
    }

    @Test
    public void TestUpdateBaby() {

        BabyDTO baby = new BabyDTO();
        baby.setId(1);
        baby.setName("Pedro");
        baby.setBirthDate(LocalDate.of(2021, 12, 31));
        baby.setGenre(Genre.MALE);
        baby.setWeight(7.0);
        baby.setHeight(50);
        baby.setCephalicPerimeter(30);
        baby.setFoodPreference("Leche materna");

        babyService.updateBaby(1, baby);
        assertEquals("Pedro", baby.getName(), "The name should be Pedro");
    }

    @Test
    public void TestCreateBaby() {
        BabyDTO baby = new BabyDTO();
        baby.setId(2);
        baby.setName("Pedro");
        baby.setBirthDate(LocalDate.of(2021, 12, 31));
        baby.setGenre(Genre.MALE);
        baby.setWeight(7.0);
        baby.setHeight(50);
        baby.setCephalicPerimeter(30);
        baby.setFoodPreference("Leche materna");

        Baby b2 = babyService.createBaby(baby);
        currentUser.setBabies(List.of(b2));
        assertTrue(babyService.findBabiesByUser().contains(b2));
        assertTrue(babyService.findBabiesByUser().contains(b2));
    }

    @Test
    public void TestFindbabyById() {
        BabyDTO baby = new BabyDTO();
        baby.setId(2);
        baby.setName("Pedro");
        baby.setBirthDate(LocalDate.of(2021, 12, 31));
        baby.setGenre(Genre.MALE);
        baby.setWeight(7.0);
        baby.setHeight(50);
        baby.setCephalicPerimeter(30);
        baby.setFoodPreference("Leche materna");
        Baby createdBaby = babyService.createBaby(baby);

        Baby baby2 = babyService.findById(createdBaby.getId());
        assertEquals("Pedro", baby2.getName(), "The name should be Pedro");
    }

    @Test
    public void TestDeleteBaby() {
        org.mockito.Mockito.when(userService.findCurrentUser()).thenReturn(currentUser);

        BabyDTO baby2 = new BabyDTO();
        baby2.setName("Pedro");
        baby2.setBirthDate(LocalDate.of(2021, 12, 31));
        baby2.setGenre(Genre.MALE);
        baby2.setWeight(7.0);
        baby2.setHeight(50);
        baby2.setCephalicPerimeter(30);
        baby2.setFoodPreference("Leche materna");
        Baby created = babyService.createBaby(baby2);

        babyService.deleteBaby(created.getId());
        assertThrows(ResourceNotFoundException.class, () -> babyService.findById(created.getId()));
    }

    @Test
    public void TestDeleteBaby_NotFOund() {
        Integer id = 999;
        assertThrows(ResourceNotFoundException.class, () -> babyService.deleteBaby(id));
    }

}
