package com.isppG8.infantem.infantem.advertisement;

import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.autoconfigure.jdbc.AutoConfigureTestDatabase;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.boot.test.context.TestConfiguration;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Import;
import org.springframework.test.context.ActiveProfiles;

import com.isppG8.infantem.infantem.InfantemApplication;
import com.isppG8.infantem.infantem.exceptions.ResourceNotFoundException;
import com.isppG8.infantem.infantem.user.User;
import com.isppG8.infantem.infantem.user.UserService;
import com.isppG8.infantem.infantem.auth.Authorities;

import static org.junit.jupiter.api.Assertions.*;

import java.util.List;
import java.util.Optional;

import jakarta.transaction.Transactional;

@SpringBootTest(
        classes = { InfantemApplication.class, AdvertisementService.class, AdvertisementServiceTest.TestConfig.class })
@ActiveProfiles("test")
@AutoConfigureTestDatabase(replace = AutoConfigureTestDatabase.Replace.NONE) // Use the configured test database
@Transactional
@Import(AdvertisementServiceTest.TestConfig.class)

public class AdvertisementServiceTest {

    @TestConfiguration
    static class TestConfig {
        @Bean
        public UserService userService() {
            return org.mockito.Mockito.mock(UserService.class);
        }
    }

    @Autowired
    private AdvertisementService advertisementService;

    @Autowired
    private UserService userService;

    @Autowired
    private AdvertisementRepository advertisementRepository;

    private User currentUser;
    private Advertisement testAdvertisement;

    @BeforeEach
    public void setUp() {

        currentUser = new User();
        currentUser.setId(1);
        currentUser.setUsername("user1");
        Authorities premiumAuthority = new Authorities();
        premiumAuthority.setAuthority("premium");
        currentUser.setAuthorities(premiumAuthority);

        testAdvertisement = new Advertisement();
        testAdvertisement.setId(1L);
        testAdvertisement.setCompanyName("Company A");
        testAdvertisement.setTitle("Ad A");
        testAdvertisement.setPhotoRoute("routeA");
        testAdvertisement.setTimeSeen(0);
        testAdvertisement.setMaxMinutes(5);
        testAdvertisement.setTotalClicks(0);
        testAdvertisement.setIsCompleted(false);
        testAdvertisement.setTargetUrl("http://example.com/ad1");

    }

    @Test
    public void testGetAllAdvertisements() {
        Advertisement ad1 = new Advertisement();
        ad1.setId(1L);
        ad1.setCompanyName("Company A");
        ad1.setTitle("Ad A");
        ad1.setPhotoRoute("routeA");
        ad1.setTimeSeen(0);
        ad1.setMaxMinutes(5);
        ad1.setTotalClicks(0);
        ad1.setIsCompleted(false);
        ad1.setTargetUrl("http://example.com/ad1");

        Advertisement ad2 = new Advertisement();
        ad2.setId(2L);
        ad2.setCompanyName("Company B");
        ad2.setTitle("Ad B");
        ad2.setPhotoRoute("routeB");
        ad2.setTimeSeen(0);
        ad2.setMaxMinutes(5);
        ad2.setTotalClicks(0);
        ad2.setIsCompleted(false);
        ad2.setTargetUrl("http://example.com/ad2");

        advertisementRepository.save(ad1);
        advertisementRepository.save(ad2);

        org.mockito.Mockito.when(userService.findCurrentUser()).thenReturn(currentUser);
        List<Advertisement> result = advertisementService.getAllAdvertisements();

        assertTrue(result.size() >= 2);
    }

    @Test
    public void testGetAdvertisementById() {
        advertisementRepository.save(testAdvertisement);
        org.mockito.Mockito.when(userService.findCurrentUser()).thenReturn(currentUser);

        Advertisement result = advertisementService.getAdvertisementById(testAdvertisement.getId());

        assertNotNull(result);
        assertEquals(testAdvertisement.getId(), result.getId());
        assertEquals(testAdvertisement.getCompanyName(), result.getCompanyName());
    }

    @Test
    public void testGetAdvertisementById_NotFound() {
        Long nonExistentId = 999L;
        org.mockito.Mockito.when(userService.findCurrentUser()).thenReturn(currentUser);

        assertThrows(ResourceNotFoundException.class, () -> {
            advertisementService.getAdvertisementById(nonExistentId);
        });
    }

    @Test
    public void testGetAdvertisementByCompanyName() {
        advertisementRepository.save(testAdvertisement);
        org.mockito.Mockito.when(userService.findCurrentUser()).thenReturn(currentUser);

        List<Advertisement> result = advertisementService
                .getAdvertisementByCompanyName(testAdvertisement.getCompanyName());

        assertNotNull(result);
        assertFalse(result.isEmpty());
        assertEquals(testAdvertisement.getCompanyName(), result.get(0).getCompanyName());
    }

    @Test
    public void testGetAdvertisementByCompanyName_NotFound() {
        advertisementRepository.save(testAdvertisement);
        org.mockito.Mockito.when(userService.findCurrentUser()).thenReturn(currentUser);

        List<Advertisement> result = advertisementService.getAdvertisementByCompanyName("NonExistentCompany");

        assertNotNull(result);
        assertTrue(result.isEmpty());
    }

    @Test
    public void testGetAdvertisementToShow_NoAds() {
        advertisementRepository.deleteAll();
        org.mockito.Mockito.when(userService.findCurrentUser()).thenReturn(currentUser);

        Optional<Advertisement> result = advertisementService.getAdvertisementToShow();

        assertFalse(result.isPresent());
    }

    @Test
    public void testUpdateAdvertisement() {
        advertisementRepository.save(testAdvertisement);
        org.mockito.Mockito.when(userService.findCurrentUser()).thenReturn(currentUser);

        Advertisement updatedAd = new Advertisement();
        updatedAd.setCompanyName("Updated Company");
        updatedAd.setTitle("Updated Ad");
        updatedAd.setPhotoRoute("updatedRoute");
        updatedAd.setTimeSeen(0);
        updatedAd.setMaxMinutes(10);
        updatedAd.setTotalClicks(0);
        updatedAd.setIsCompleted(false);
        updatedAd.setTargetUrl("http://example.com/updated");

        Advertisement result = advertisementService.updateAdvertisement(testAdvertisement.getId(), updatedAd);

        assertNotNull(result);
        assertEquals(updatedAd.getCompanyName(), result.getCompanyName());
    }

    @Test
    public void testUpdateAdvertisement_NotFound() {
        Long nonExistentId = 999L;
        org.mockito.Mockito.when(userService.findCurrentUser()).thenReturn(currentUser);

        Advertisement updatedAd = new Advertisement();
        updatedAd.setCompanyName("Updated Company");
        updatedAd.setTitle("Updated Ad");
        updatedAd.setPhotoRoute("updatedRoute");
        updatedAd.setTimeSeen(0);
        updatedAd.setMaxMinutes(10);
        updatedAd.setTotalClicks(0);
        updatedAd.setIsCompleted(false);
        updatedAd.setTargetUrl("http://example.com/updated");

        assertThrows(ResourceNotFoundException.class, () -> {
            advertisementService.updateAdvertisement(nonExistentId, updatedAd);
        });
    }

    @Test
    public void testStopViewingAdvertisement() {
        advertisementRepository.save(testAdvertisement);
        org.mockito.Mockito.when(userService.findCurrentUser()).thenReturn(currentUser);

        advertisementService.startViewingAdvertisement(testAdvertisement.getId());
        advertisementService.stopViewingAdvertisement(testAdvertisement.getId());

        assertEquals(0, advertisementService.getAllAdvertisements().get(0).getTimeSeen());
    }

    @Test
    public void testStopViewingAdvertisement_NotFound() {
        Long nonExistentId = 999L;
        org.mockito.Mockito.when(userService.findCurrentUser()).thenReturn(currentUser);

        assertThrows(ResourceNotFoundException.class, () -> {
            advertisementService.stopViewingAdvertisement(nonExistentId);
        });
    }

    @Test
    public void testCompleteAdvertisement_NotFound() {
        Long nonExistentId = 999L;
        org.mockito.Mockito.when(userService.findCurrentUser()).thenReturn(currentUser);

        assertThrows(ResourceNotFoundException.class, () -> {
            advertisementService.completeAdvertisement(nonExistentId);
        });
    }

    @Test
    public void testUpdateAdvertisementClicks() {
        advertisementRepository.save(testAdvertisement);
        org.mockito.Mockito.when(userService.findCurrentUser()).thenReturn(currentUser);

        Advertisement result = advertisementService.updateAdvertisementClicks(testAdvertisement.getId());

        assertNotNull(result);
        assertEquals(1, result.getTotalClicks());
    }

    @Test
    public void testUpdateAdvertisementClicks_NotFound() {
        Long nonExistentId = 999L;
        org.mockito.Mockito.when(userService.findCurrentUser()).thenReturn(currentUser);

        assertThrows(ResourceNotFoundException.class, () -> {
            advertisementService.updateAdvertisementClicks(nonExistentId);
        });
    }

    @Test
    public void testDeleteAdvertisement() {
        advertisementRepository.save(testAdvertisement);
        org.mockito.Mockito.when(userService.findCurrentUser()).thenReturn(currentUser);

        advertisementService.deleteAdvertisement(testAdvertisement.getId());

        assertThrows(ResourceNotFoundException.class, () -> {
            advertisementService.getAdvertisementById(testAdvertisement.getId());
        });
    }

    @Test
    public void testDeleteAdvertisement_NotFound() {
        Long nonExistentId = 999L;
        org.mockito.Mockito.when(userService.findCurrentUser()).thenReturn(currentUser);

        assertThrows(ResourceNotFoundException.class, () -> {
            advertisementService.deleteAdvertisement(nonExistentId);
        });
    }

    @Test
    public void testDeleteAdvertisement_AlreadyDeleted() {
        advertisementRepository.save(testAdvertisement);
        org.mockito.Mockito.when(userService.findCurrentUser()).thenReturn(currentUser);

        advertisementService.deleteAdvertisement(testAdvertisement.getId());

        assertThrows(ResourceNotFoundException.class, () -> {
            advertisementService.deleteAdvertisement(testAdvertisement.getId());
        });
    }
}
