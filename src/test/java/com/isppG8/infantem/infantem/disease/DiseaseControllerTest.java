package com.isppG8.infantem.infantem.disease;

import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.jsonPath;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.status;

import java.util.List;

import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.delete;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.get;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.post;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.put;
import com.isppG8.infantem.infantem.utils.ResultMatcherUtils;

import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.mockito.Mockito;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.autoconfigure.web.servlet.AutoConfigureMockMvc;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.http.MediaType;
import org.springframework.test.context.ActiveProfiles;
import org.springframework.test.context.bean.override.mockito.MockitoBean;
import org.springframework.test.web.servlet.MockMvc;
import org.springframework.test.web.servlet.setup.MockMvcBuilders;
import org.springframework.transaction.annotation.Transactional;

import com.isppG8.infantem.infantem.baby.Baby;
import com.isppG8.infantem.infantem.baby.BabyService;
import com.isppG8.infantem.infantem.user.User;
import com.isppG8.infantem.infantem.user.UserService;

@SpringBootTest
@ActiveProfiles("test")
@Transactional
@AutoConfigureMockMvc
public class DiseaseControllerTest {

    @Autowired
    private MockMvc mockMvc;

    @MockitoBean
    private UserService userService;

    @MockitoBean
    private BabyService babyService;

    @Autowired
    private DiseaseController diseaseController;
    /*
     * @Id
     * @GeneratedValue(strategy = GenerationType.IDENTITY) private Integer Id;
     * @NotBlank private String name;
     * @NotNull
     * @PastOrPresent private LocalDate startDate;
     * @NotNull
     * @PastOrPresent private LocalDate endDate;
     * @NotBlank private String symptoms; private String extraObservations;
     * @ManyToOne
     * @NotNull
     * @JoinColumn(name = "baby_id") private Baby baby;
     */

    @BeforeEach
    void setUp() {
        Baby baby = new Baby();
        baby.setId(1);
        baby.setBirthDate(java.time.LocalDate.of(2018, 1, 1));

        User user = new User();
        user.setId(1);
        user.setBabies(List.of(baby));

        Mockito.when(babyService.findById(1)).thenReturn(baby);
        Mockito.when(userService.findCurrentUser()).thenReturn(user);
        Mockito.when(userService.findCurrentUserId()).thenReturn(1);
        mockMvc = MockMvcBuilders.standaloneSetup(diseaseController).build();
    }

    @Test
    void testGetAll() throws Exception {
        mockMvc.perform(get("/api/v1/disease").contentType(MediaType.APPLICATION_JSON)).andExpect(status().isOk())
                .andExpect(ResultMatcherUtils.isLargerThan("$.length()", "4"))
                .andExpect(jsonPath("$[0].name").value("Varicela"));
    }

    @Test
    void testGetDiseaseById() throws Exception {
        mockMvc.perform(get("/api/v1/disease/2").contentType(MediaType.APPLICATION_JSON)).andExpect(status().isOk())
                .andExpect(jsonPath("$.name").value("Gripe"));
    }

}
