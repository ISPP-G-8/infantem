package com.isppG8.infantem.infantem.calendar;

import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.get;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.status;
import static org.hamcrest.Matchers.hasSize;
import static org.hamcrest.Matchers.is;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.jsonPath;
import java.util.List;

import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.mockito.Mockito;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.autoconfigure.web.servlet.AutoConfigureMockMvc;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.test.context.ActiveProfiles;
import org.springframework.test.context.bean.override.mockito.MockitoBean;
import org.springframework.test.web.servlet.MockMvc;
import org.springframework.test.web.servlet.setup.MockMvcBuilders;
import org.springframework.transaction.annotation.Transactional;

import com.isppG8.infantem.infantem.auth.Authorities;
import com.isppG8.infantem.infantem.baby.Baby;
import com.isppG8.infantem.infantem.user.User;
import com.isppG8.infantem.infantem.user.UserService;

@SpringBootTest
@ActiveProfiles("test")
@Transactional
@AutoConfigureMockMvc
public class CalendarControllerTest {

    @Autowired
    private MockMvc mockMvc;

    @MockitoBean
    private UserService userService;

    @Autowired
    private CalendarController calendarController;

    static User user1 = new User();
    static User user2 = new User();
    static Authorities authorities = new Authorities();

    @BeforeEach
    void setUp() {
        authorities.setAuthority("user");

        user1.setId(1);
        user1.setAuthorities(authorities); // Asigna correctamente las autoridades
        user1.setUsername("user1");

        user2.setId(2);
        user2.setAuthorities(authorities); // Asigna correctamente las autoridades
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

        mockMvc = MockMvcBuilders.standaloneSetup(calendarController).build();
    }

    @Test
    public void testGetCalendarByUserId() throws Exception {
        Mockito.when(userService.findCurrentUser()).thenReturn(user1);
        mockMvc.perform(get("/api/v1/calendar").param("month", "3").param("year", "2025")).andExpect(status().isOk())
                .andExpect(jsonPath("$[0].babyId", is(1)));
    }

    @Test
    public void testGetCalendarByUserIdWithInvalidMonth() throws Exception {
        mockMvc.perform(get("/api/v1/calendar").param("month", "13").param("year", "2025"))
                .andExpect(status().isBadRequest());
        mockMvc.perform(get("/api/v1/calendar").param("month", "0").param("year", "2025"))
                .andExpect(status().isBadRequest());
        mockMvc.perform(get("/api/v1/calendar").param("year", "2025")).andExpect(status().isBadRequest());
    }

    @Test
    public void testGetCalendarByUserIdWithInvalidYear() throws Exception {
        mockMvc.perform(get("/api/v1/calendar").param("month", "3").param("year", "1999"))
                .andExpect(status().isBadRequest());
        mockMvc.perform(get("/api/v1/calendar").param("month", "3")).andExpect(status().isBadRequest());
    }

    @Test
    public void testGetCalendarDayByUserId() throws Exception {
        Mockito.when(userService.findCurrentUser()).thenReturn(user1);
        mockMvc.perform(get("/api/v1/calendar/2025-03-15")).andExpect(status().isOk())
                .andExpect(jsonPath("$", hasSize(2)));
    }

    @Test
    public void testGetCalendarDayByUserIdWithInvalidDateFormat() throws Exception {
        mockMvc.perform(get("/api/v1/calendar/invalid-date")).andExpect(status().isBadRequest());
    }
}
