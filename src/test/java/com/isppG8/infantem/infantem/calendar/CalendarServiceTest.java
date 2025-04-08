package com.isppG8.infantem.infantem.calendar;

import static org.junit.jupiter.api.Assertions.assertEquals;
import static org.junit.jupiter.api.Assertions.assertTrue;

import java.time.LocalDate;
import java.time.LocalTime;
import java.util.List;
import java.util.Set;

import org.junit.jupiter.api.BeforeAll;
import org.junit.jupiter.api.Test;
import org.mockito.Mockito;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.test.context.ActiveProfiles;
import org.springframework.test.context.bean.override.mockito.MockitoBean;
import org.springframework.transaction.annotation.Transactional;

import com.isppG8.infantem.infantem.auth.Authorities;
import com.isppG8.infantem.infantem.baby.Baby;
import com.isppG8.infantem.infantem.calendar.dto.CalendarDay;
import com.isppG8.infantem.infantem.calendar.dto.CalendarEvents;
import com.isppG8.infantem.infantem.user.User;
import com.isppG8.infantem.infantem.user.UserService;

@SpringBootTest
@ActiveProfiles("test")
@Transactional
public class CalendarServiceTest {
    private CalendarService calendarService;

    @Autowired
    public CalendarServiceTest(CalendarService calendarService) {
        this.calendarService = calendarService;
    }

    @MockitoBean
    private UserService userService;

    static User user1 = new User();
    static User user2 = new User();
    static Authorities authorities = new Authorities();

    @BeforeAll
    static void setUp() {
        authorities.setAuthority("user");
        user1.setId(1);
        user1.setAuthorities(authorities);
        user2.setId(2);
        user2.setAuthorities(authorities);
        user1.setUsername("user1");
        user2.setUsername("user2");
        List<Baby> babies1 = user1.getBabies();
        List<Baby> babies2 = user2.getBabies();
        for (Integer i = 1; i <= 4; i++) {
            Baby baby = new Baby();
            baby.setId(i);
            if (i % 2 != 0) {
                babies1.add(baby);
            } else {
                babies2.add(baby);
            }
        }
        user1.setBabies(babies1);
        user2.setBabies(babies2);
    }

    @Test
    public void testGetCalendarByUserId() {
        Mockito.when(userService.findCurrentUser()).thenReturn(user1);

        // Get data for march 2025
        List<CalendarEvents> calendar = calendarService.getCalendarByUserId(LocalDate.of(2025, 3, 1),
                LocalDate.of(2025, 3, 31));

        CalendarEvents baby1Calendar = calendar.get(0);
        CalendarEvents baby3Calendar = calendar.get(1);

        assertEquals(2, calendar.size(), "The calendar should have data for 2 babies");

        assertEquals(1, baby1Calendar.getBabyId(), "The first baby should have id 1");
        assertEquals(3, baby3Calendar.getBabyId(), "The second baby should have id 3");

        assertEquals(Set.of("Intake"), baby1Calendar.getEvents().get("2025-03-01"),
                "The first baby should have a disease, intake and metric event on 2025-03-01");

        assertTrue(baby1Calendar.getEvents().get("2025-03-29") == null,
                "The first baby should not have any event on 2025-03-29");

        // Compare with user 2
        Mockito.when(userService.findCurrentUser()).thenReturn(user2);
        List<CalendarEvents> calendar2 = calendarService.getCalendarByUserId(LocalDate.of(2025, 3, 1),
                LocalDate.of(2025, 3, 31));

        assertTrue(!calendar.equals(calendar2), "The calendar for user 1 and user 2 should be different");

    }

    @Test
    public void testGetCalendarDayByUserId() {
        Mockito.when(userService.findCurrentUser()).thenReturn(user1);

        // Get data for 1st march 2025
        List<CalendarDay> calendar1 = calendarService.getCalendarDayByUserId(LocalDate.of(2025, 3, 1));

        assertEquals(2, calendar1.size(), "The calendar should have data for 2 babies");

        CalendarDay baby1Calendar = calendar1.get(0);
        CalendarDay baby3Calendar = calendar1.get(1);
        assertEquals(1, baby1Calendar.getBabyId(), "The first baby should have id 1");
        assertEquals(3, baby3Calendar.getBabyId(), "The second baby should have id 3");

        // Check dreams
        assertTrue(baby1Calendar.getDreams().isEmpty(), "The first baby should not have any dreams.");

        // Check vaccines
        assertTrue(baby1Calendar.getVaccines().isEmpty(), "The first baby should not have any vaccines.");

        // Check intakes
        assertEquals(1, baby1Calendar.getIntakes().size(), "The first baby should have 2 intakes");
        assertEquals(1, baby1Calendar.getIntakes().get(0).getId(), "The first intake should have id 1");
        assertEquals(LocalTime.of(8, 00), baby1Calendar.getIntakes().get(0).getDate(),
                "The first intake should be at 08:00:00");
        assertTrue(baby1Calendar.getIntakes().get(0).getRecipeNames().contains("Puré de Zanahoria y Batata"),
                "The first intake should contain Puré de Zanahoria y Batata");
    }
}
