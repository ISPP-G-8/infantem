package com.isppG8.infantem.infantem.dream;

import static org.junit.jupiter.api.Assertions.*;
import static org.mockito.ArgumentMatchers.*;
import static org.mockito.Mockito.*;

import java.time.LocalDate;
import java.time.LocalDateTime;
import java.util.Arrays;
import java.util.Collections;
import java.util.HashSet;
import java.util.List;
import java.util.Optional;
import java.util.Set;

import org.junit.jupiter.api.BeforeAll;
import org.junit.jupiter.api.Test;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.test.context.ActiveProfiles;
import org.springframework.transaction.annotation.Transactional;

import com.isppG8.infantem.infantem.baby.Baby;
import com.isppG8.infantem.infantem.baby.BabyRepository;
import com.isppG8.infantem.infantem.dream.dto.DreamSummary;
import com.isppG8.infantem.infantem.exceptions.ResourceNotFoundException;
import com.isppG8.infantem.infantem.exceptions.ResourceNotOwnedException;
import com.isppG8.infantem.infantem.user.User;
import com.isppG8.infantem.infantem.user.UserService;
import com.isppG8.infantem.infantem.util.Tuple;

@SpringBootTest
@ActiveProfiles("test")
@Transactional
public class DreamServiceTest {

    @Mock
    private DreamRepository dreamRepository;

    @Mock
    private BabyRepository babyRepository;

    @Mock
    private UserService userService;

    @InjectMocks
    private DreamService dreamService;

    static Dream dream;

    @BeforeAll
    static void setUp() {
        Baby baby = new Baby();
        baby.setId(1);

        dream = new Dream();
        dream.setId(1L);
        dream.setDateStart(LocalDateTime.of(2023, 1, 1, 22, 0));
        dream.setDateEnd(LocalDateTime.of(2023, 1, 2, 6, 0));
        dream.setNumWakeups(1);
        dream.setDreamType(DreamType.DEEP);
        dream.setBaby(baby);
    }

    @Test
    public void testGetDreamById() {
        when(dreamRepository.findById(1L)).thenReturn(Optional.of(dream));
        Dream found = dreamService.getDreamById(1L);
        assertNotNull(found);
        assertEquals(DreamType.DEEP, found.getDreamType());
        assertEquals(1, found.getNumWakeups());
    }

    @Test
    public void testCreateDream() {
        User user = new User();
        user.setId((int) 1L);

        Baby baby = new Baby();
        baby.setId(1);
        baby.setUsers(List.of(user));

        Dream dream = new Dream();
        dream.setId(1L);
        dream.setDateStart(LocalDateTime.now().minusHours(2));
        dream.setDateEnd(LocalDateTime.now());
        dream.setNumWakeups(1);
        dream.setDreamType(DreamType.DEEP);
        dream.setBaby(baby);

        when(userService.findCurrentUser()).thenReturn(user);
        when(babyRepository.findById(1)).thenReturn(Optional.of(baby));
        when(dreamRepository.save(any(Dream.class))).thenReturn(dream);

        Dream saved = dreamService.createDream(dream);

        assertNotNull(saved);
        assertEquals(dream.getDateStart(), saved.getDateStart());
    }

    @Test
    public void testUpdateDream() {
        User currentUser = new User();
        Baby baby = dream.getBaby();
        baby.setUsers(List.of(currentUser));

        when(userService.findCurrentUser()).thenReturn(currentUser);
        when(babyRepository.findById(1)).thenReturn(Optional.of(baby));
        when(dreamRepository.findById(1L)).thenReturn(Optional.of(dream));
        when(dreamRepository.save(any(Dream.class))).thenReturn(dream);

        Dream updatedDetails = new Dream();
        updatedDetails.setDateStart(LocalDateTime.of(2023, 4, 1, 21, 30));
        updatedDetails.setDateEnd(LocalDateTime.of(2023, 4, 2, 6, 0));
        updatedDetails.setNumWakeups(1);
        updatedDetails.setDreamType(DreamType.DEEP);
        updatedDetails.setBaby(baby);

        Dream updated = dreamService.updateDream(1L, updatedDetails);
        assertNotNull(updated);
        assertEquals(DreamType.DEEP, updated.getDreamType());
        assertEquals(1, updated.getNumWakeups());
    }

    @Test
    public void testCreateDreamNotOwned() {
        User user = new User();
        user.setId(2);

        Baby baby = new Baby();
        baby.setId(1);
        baby.setUsers(List.of(new User()));

        Dream dream = new Dream();
        dream.setId(1L);
        dream.setDateStart(LocalDateTime.now().minusHours(2));
        dream.setDateEnd(LocalDateTime.now());
        dream.setNumWakeups(1);
        dream.setDreamType(DreamType.DEEP);
        dream.setBaby(baby);

        when(userService.findCurrentUser()).thenReturn(user);
        when(babyRepository.findById(1)).thenReturn(Optional.of(baby));

        assertThrows(ResourceNotOwnedException.class, () -> dreamService.createDream(dream));
    }

    @Test
    public void testGetDreamsByBabyIdAndDate() {
        LocalDate start = LocalDate.of(2023, 1, 1);
        LocalDate end = LocalDate.of(2023, 1, 7);

        Set<LocalDate> expectedDates = new HashSet<>(Arrays.asList(LocalDate.of(2023, 1, 1), LocalDate.of(2023, 1, 2)));

        when(dreamRepository.findDreamDatesByBabyIdAndDate(eq(1), any(), any())).thenReturn(
                Arrays.asList(new Tuple<>(LocalDateTime.of(2023, 1, 1, 22, 0), LocalDateTime.of(2023, 1, 2, 6, 0))));

        Set<LocalDate> result = dreamService.getDreamsByBabyIdAndDate(1, start, end);

        assertNotNull(result);
        assertEquals(expectedDates, result);

        start = LocalDate.of(2023, 1, 31);
        end = LocalDate.of(2023, 2, 1);

        expectedDates = new HashSet<>(Arrays.asList(LocalDate.of(2023, 1, 31), LocalDate.of(2023, 2, 1)));

        when(dreamRepository.findDreamDatesByBabyIdAndDate(eq(1), any(), any())).thenReturn(
                Arrays.asList(new Tuple<>(LocalDateTime.of(2023, 1, 31, 22, 0), LocalDateTime.of(2023, 2, 1, 6, 0))));

        result = dreamService.getDreamsByBabyIdAndDate(1, start, end);

        assertNotNull(result);
        assertEquals(expectedDates, result);
    }

    @Test
    public void testGetDreamSummaryByBabyIdAndDate() {
        LocalDate day = LocalDate.of(2023, 1, 1);

        DreamSummary dreamSummary = new DreamSummary(dream);
        List<DreamSummary> expectedSummary = List.of(dreamSummary);

        when(dreamRepository.findDreamSummaryByBabyIdAndDate(eq(1), any(), any())).thenReturn(Arrays.asList(dream));

        List<DreamSummary> result = dreamService.getDreamSummaryByBabyIdAndDate(1, day);

        assertNotNull(result);
        assertEquals(expectedSummary.size(), result.size());
        assertEquals(expectedSummary.get(0).getDreamType(), result.get(0).getDreamType());
    }

    @Test
    public void testGetDreamByIdNotFound() {
        when(dreamRepository.findById(1L)).thenReturn(Optional.empty());
        assertThrows(ResourceNotFoundException.class, () -> dreamService.getDreamById(1L));
    }

    @Test
    public void testDeleteDream() {
        when(dreamRepository.existsById(1L)).thenReturn(true);
        doNothing().when(dreamRepository).deleteById(1L);
        dreamService.deleteDream(1L);
        verify(dreamRepository, times(1)).deleteById(1L);
    }

    @Test
    public void testDeleteDreamNotFound() {
        assertThrows(ResourceNotFoundException.class, () -> dreamService.deleteDream(999L));
    }

    @Test
    public void testGetAllDreams() {
        Dream dream1 = new Dream();
        dream1.setId(1L);
        dream1.setDateStart(LocalDateTime.of(2023, 1, 1, 22, 0));
        dream1.setDateEnd(LocalDateTime.of(2023, 1, 2, 6, 0));
        dream1.setNumWakeups(1);
        dream1.setDreamType(DreamType.DEEP);

        Dream dream2 = new Dream();
        dream2.setId(2L);
        dream2.setDateStart(LocalDateTime.of(2023, 2, 1, 22, 0));
        dream2.setDateEnd(LocalDateTime.of(2023, 2, 2, 6, 0));
        dream2.setNumWakeups(2);
        dream2.setDreamType(DreamType.LIGHT);

        when(dreamRepository.findAll()).thenReturn(List.of(dream1, dream2));

        List<Dream> dreams = dreamService.getAllDreams();

        assertNotNull(dreams);
        assertEquals(2, dreams.size());
        assertEquals(DreamType.DEEP, dreams.get(0).getDreamType());
        assertEquals(DreamType.LIGHT, dreams.get(1).getDreamType());
    }

    @Test
    public void testUpdateDreamWithNonExistentBaby() {
        Dream updateWithNonExistentBaby = new Dream();
        updateWithNonExistentBaby.setDateStart(LocalDateTime.of(2023, 1, 1, 22, 0));
        updateWithNonExistentBaby.setDateEnd(LocalDateTime.of(2023, 1, 2, 6, 0));
        updateWithNonExistentBaby.setNumWakeups(2);
        updateWithNonExistentBaby.setDreamType(DreamType.LIGHT);
        updateWithNonExistentBaby.setBaby(new Baby()); // Baby does not exist

        when(dreamRepository.findById(1L)).thenReturn(Optional.of(dream));
        when(babyRepository.findById(anyInt())).thenReturn(Optional.empty());

        assertThrows(ResourceNotFoundException.class, () -> dreamService.updateDream(1L, updateWithNonExistentBaby));
    }

    @Test
    public void testUpdateNonExistingDream() {
        User currentUser = new User();
        Baby baby = dream.getBaby();
        baby.setUsers(List.of(currentUser));

        when(userService.findCurrentUser()).thenReturn(currentUser);
        when(babyRepository.findById(1)).thenReturn(Optional.of(baby));
        when(dreamRepository.findById(1L)).thenReturn(Optional.of(dream));
        when(dreamRepository.save(any(Dream.class))).thenReturn(dream);

        Dream updatedDetails = new Dream();
        updatedDetails.setDateStart(LocalDateTime.of(2023, 4, 1, 21, 30));
        updatedDetails.setDateEnd(LocalDateTime.of(2023, 4, 2, 6, 0));
        updatedDetails.setNumWakeups(1);
        updatedDetails.setDreamType(DreamType.DEEP);
        updatedDetails.setBaby(baby);

        assertThrows(ResourceNotFoundException.class, () -> dreamService.updateDream(999L, updatedDetails));
    }

    @Test
    public void testCreateDreamWithoutBabyAssociation() {
        Baby unassociatedBaby = new Baby();
        unassociatedBaby.setId(2);
        unassociatedBaby.setUsers(Collections.emptyList());

        Dream dreamWithoutBaby = new Dream();
        dreamWithoutBaby.setId(2L);
        dreamWithoutBaby.setDateStart(LocalDateTime.now().minusHours(2));
        dreamWithoutBaby.setDateEnd(LocalDateTime.now());
        dreamWithoutBaby.setNumWakeups(1);
        dreamWithoutBaby.setDreamType(DreamType.DEEP);
        dreamWithoutBaby.setBaby(unassociatedBaby);

        when(userService.findCurrentUser()).thenReturn(new User());
        when(babyRepository.findById(2)).thenReturn(Optional.of(unassociatedBaby));

        assertThrows(ResourceNotOwnedException.class, () -> dreamService.createDream(dreamWithoutBaby));
    }

    @Test
    public void testGetDreamsForBabyInEmptyDateRange() {
        LocalDate start = LocalDate.of(2023, 12, 1);
        LocalDate end = LocalDate.of(2023, 12, 31);

        Set<LocalDate> result = dreamService.getDreamsByBabyIdAndDate(1, start, end);

        assertTrue(result.isEmpty(), "No dreams should be found in an empty date range.");
    }

    @Test
    public void testGetDreamSummaryForInvalidBabyId() {
        LocalDate day = LocalDate.of(2023, 1, 1);
        when(dreamRepository.findDreamSummaryByBabyIdAndDate(eq(999), any(), any()))
                .thenReturn(Collections.emptyList());

        List<DreamSummary> result = dreamService.getDreamSummaryByBabyIdAndDate(999, day);

        assertTrue(result.isEmpty(), "Dream summary should be empty for non-existent baby.");
    }

    @Test
    public void creeateInvalidDreamDate() {
        Dream invalidDream = new Dream();
        invalidDream.setNumWakeups(1);
        invalidDream.setDreamType(DreamType.DEEP);

        assertTrue(invalidDream.isDateValid());

        invalidDream.setDateStart(LocalDateTime.now());
        invalidDream.setDateEnd(null);
        invalidDream.setNumWakeups(1);
        invalidDream.setDreamType(DreamType.DEEP);

        assertTrue(invalidDream.isDateValid());
    }

}
