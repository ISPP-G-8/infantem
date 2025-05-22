package com.isppG8.infantem.infantem.recipe;

import static org.junit.jupiter.api.Assertions.assertEquals;
import static org.junit.jupiter.api.Assertions.assertFalse;
import static org.junit.jupiter.api.Assertions.assertNotNull;
import static org.junit.jupiter.api.Assertions.assertThrows;

import java.time.LocalDateTime;
import java.util.List;

import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.mockito.Mockito;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.test.context.ActiveProfiles;
import org.springframework.test.context.bean.override.mockito.MockitoBean;

import com.isppG8.infantem.infantem.auth.Authorities;
import com.isppG8.infantem.infantem.auth.AuthoritiesService;
import com.isppG8.infantem.infantem.exceptions.CustomRecipeRequestLimitException;
import com.isppG8.infantem.infantem.exceptions.ResourceNotFoundException;
import com.isppG8.infantem.infantem.exceptions.ResourceNotOwnedException;
import com.isppG8.infantem.infantem.recipe.dto.CustomRecipeRequestCreateDTO;
import com.isppG8.infantem.infantem.user.User;
import com.isppG8.infantem.infantem.user.UserRepository;
import com.isppG8.infantem.infantem.user.UserService;

import jakarta.transaction.Transactional;

@SpringBootTest
@ActiveProfiles("test")
@Transactional
public class CustomRecipeRequestServiceTest {
    private static final String TEST_DETAILS = "Test details";

    @MockitoBean
    private UserService userService;

    @Autowired
    private UserRepository userRepository;

    @Autowired
    private AuthoritiesService authoritiesService;

    @Autowired
    private CustomRecipeRequestRepository requestRepository;

    @Autowired
    private CustomRecipeRequestService requestService;

    private User mockUser = new User();

    @BeforeEach
    public void setUp() {
        mockUser.setName("John");
        mockUser.setSurname("Doe");
        mockUser.setEmail("john.doe@example.com");
        mockUser.setUsername("johndoe");
        mockUser.setPassword("password123");
        Authorities mockAuthorities = Mockito.mock(Authorities.class);
        mockUser.setAuthorities(mockAuthorities);
        Mockito.when(mockUser.getAuthorities().getAuthority()).thenReturn("nutritionist");
        Mockito.when(userService.findCurrentUser()).thenReturn(mockUser);
    }

    @Test
    public void getAllOpenRequestsTest() {
        List<CustomRecipeRequest> result = requestService.getAllOpenRequests();
        assertNotNull(result);
        assertFalse(result.isEmpty());
        assertEquals(1, result.size());
    }

    @Test
    public void getAllOpenRequestsTestNotNutritionist() {
        Mockito.when(mockUser.getAuthorities().getAuthority()).thenReturn("user");

        assertThrows(ResourceNotOwnedException.class, () -> requestService.getAllOpenRequests());
    }

    @Test
    public void getNumRequestsByUserIdActualMonthTest() {
        Long userId = 1L;
        User user = userRepository.getReferenceById(userId);

        CustomRecipeRequest request = new CustomRecipeRequest();
        request.setDetails(TEST_DETAILS);
        request.setUser(user);
        request.setStatus(RequestStatus.OPEN);
        request.setCreatedAt(LocalDateTime.now());
        requestRepository.save(request);

        Integer result = requestService.getNumRequestsByUserIdActualMonth(userId.intValue());

        assertNotNull(result);
        assertEquals(1, result);
    }

    @Test
    public void getNumRequestsByUserIdActualMonthTestNotNutritionist() {
        Mockito.when(mockUser.getAuthorities().getAuthority()).thenReturn("user");

        Integer userId = 1;
        assertThrows(ResourceNotOwnedException.class, () -> requestService.getNumRequestsByUserIdActualMonth(userId));
    }

    @Test
    public void getNumRequestsByUserIdActualMonthPremiumTest() {
        Long userId = 1L;
        User user = userRepository.getReferenceById(userId);

        CustomRecipeRequest request = new CustomRecipeRequest();
        request.setDetails("Premium test details");
        request.setUser(user);
        request.setStatus(RequestStatus.OPEN);
        request.setCreatedAt(LocalDateTime.now());
        requestRepository.save(request);

        Integer result = requestService.getNumRequestsByUserIdActualMonthPremium(userId.intValue());

        assertNotNull(result);
        assertEquals(1, result);
    }

    @Test
    public void getRequestsByUserTest() {
        Authorities existingAuthority = authoritiesService.findByAuthority("premium");
        mockUser.setAuthorities(existingAuthority);

        User persistedUser = userRepository.save(mockUser);

        Mockito.when(userService.findCurrentUser()).thenReturn(persistedUser);

        CustomRecipeRequestCreateDTO req = new CustomRecipeRequestCreateDTO();
        req.setDetails(TEST_DETAILS);

        requestService.createRequest(req);

        List<CustomRecipeRequest> result = requestService.getRequestsByUser();

        assertNotNull(result);
        assertFalse(result.isEmpty());
        assertEquals(1, result.size());
    }

    @Test
    public void getRequestsByUserNotPremiumTest() {
        Mockito.when(mockUser.getAuthorities().getAuthority()).thenReturn("user");

        assertThrows(ResourceNotOwnedException.class, () -> requestService.getRequestsByUser());
    }

    @Test
    public void createRequestTest() {
        Authorities existingAuthority = authoritiesService.findByAuthority("premium");
        mockUser.setAuthorities(existingAuthority);

        User persistedUser = userRepository.save(mockUser);

        Mockito.when(userService.findCurrentUser()).thenReturn(persistedUser);

        CustomRecipeRequestCreateDTO req = new CustomRecipeRequestCreateDTO();
        req.setDetails(TEST_DETAILS);

        CustomRecipeRequest result = requestService.createRequest(req);

        assertNotNull(result);
        assertEquals(TEST_DETAILS, result.getDetails());
    }

    @Test
    public void createRequestNotPremiumTest() {
        Mockito.when(mockUser.getAuthorities().getAuthority()).thenReturn("user");

        CustomRecipeRequestCreateDTO req = new CustomRecipeRequestCreateDTO();
        req.setDetails(TEST_DETAILS);

        assertThrows(ResourceNotOwnedException.class, () -> requestService.createRequest(req));
    }

    @Test
    public void createRequestLimitExceededTest() {
        Authorities existingAuthority = authoritiesService.findByAuthority("premium");
        mockUser.setAuthorities(existingAuthority);

        User persistedUser = userRepository.save(mockUser);

        Mockito.when(userService.findCurrentUser()).thenReturn(persistedUser);

        CustomRecipeRequestCreateDTO req = new CustomRecipeRequestCreateDTO();
        req.setDetails(TEST_DETAILS);

        for (int i = 0; i < 5; i++) {
            requestService.createRequest(req);
        }

        assertThrows(CustomRecipeRequestLimitException.class, () -> requestService.createRequest(req));
    }

    @Test
    public void deleteRequestTest() {
        Authorities existingAuthority = authoritiesService.findByAuthority("premium");
        mockUser.setAuthorities(existingAuthority);

        User persistedUser = userRepository.save(mockUser);

        Mockito.when(userService.findCurrentUser()).thenReturn(persistedUser);

        CustomRecipeRequestCreateDTO req = new CustomRecipeRequestCreateDTO();
        req.setDetails(TEST_DETAILS);

        CustomRecipeRequest created = requestService.createRequest(req);

        requestService.deleteRequest(created.getId());

        assertThrows(ResourceNotFoundException.class, () -> requestService.deleteRequest(created.getId()));
    }

    @Test
    public void deleteRequestNotOwnedTest() {
        List<CustomRecipeRequest> result = requestService.getAllOpenRequests();
        assertThrows(ResourceNotOwnedException.class, () -> requestService.deleteRequest(result.get(0).getId()));
    }

    @Test
    public void deleteRequestNotFoundTest() {
        Long id = 999L; // Non-existent ID
        assertThrows(ResourceNotFoundException.class, () -> requestService.deleteRequest(id));
    }

    @Test
    public void deleteNotOpenRequestTest() {
        Authorities existingAuthority = authoritiesService.findByAuthority("premium");
        mockUser.setAuthorities(existingAuthority);

        User persistedUser = userRepository.save(mockUser);

        Mockito.when(userService.findCurrentUser()).thenReturn(persistedUser);

        CustomRecipeRequestCreateDTO req = new CustomRecipeRequestCreateDTO();
        req.setDetails(TEST_DETAILS);

        CustomRecipeRequest created = requestService.createRequest(req);

        created.setStatus(RequestStatus.CLOSED);
        CustomRecipeRequest updated = requestRepository.save(created);

        assertThrows(IllegalArgumentException.class, () -> requestService.deleteRequest(updated.getId()));
    }

    @Test
    public void closeRequestTest() {
        Authorities existingAuthority = authoritiesService.findByAuthority("premium");
        mockUser.setAuthorities(existingAuthority);

        User persistedUser = userRepository.save(mockUser);

        Mockito.when(userService.findCurrentUser()).thenReturn(persistedUser);

        CustomRecipeRequestCreateDTO req = new CustomRecipeRequestCreateDTO();
        req.setDetails(TEST_DETAILS);

        CustomRecipeRequest created = requestService.createRequest(req);

        CustomRecipeRequest closedRequest = requestService.closeRequest(created.getId());

        assertEquals(RequestStatus.CLOSED, closedRequest.getStatus());
    }

    @Test
    public void closeRequestNotFoundTest() {
        Long id = 999L;
        assertThrows(ResourceNotFoundException.class, () -> requestService.closeRequest(id));
    }

    @Test
    public void closeRequestAlreadyClosedTest() {
        Authorities existingAuthority = authoritiesService.findByAuthority("premium");
        mockUser.setAuthorities(existingAuthority);

        User persistedUser = userRepository.save(mockUser);

        Mockito.when(userService.findCurrentUser()).thenReturn(persistedUser);

        CustomRecipeRequestCreateDTO req = new CustomRecipeRequestCreateDTO();
        req.setDetails(TEST_DETAILS);

        CustomRecipeRequest created = requestService.createRequest(req);

        created.setStatus(RequestStatus.CLOSED);
        CustomRecipeRequest updated = requestRepository.save(created);
        assertThrows(IllegalArgumentException.class, () -> requestService.closeRequest(updated.getId()));
    }
}
