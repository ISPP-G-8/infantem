package com.isppG8.infantem.infantem.user;

import static org.junit.jupiter.api.Assertions.assertEquals;
import static org.junit.jupiter.api.Assertions.assertFalse;
import static org.junit.jupiter.api.Assertions.assertNotNull;
import static org.junit.jupiter.api.Assertions.assertNull;
import static org.junit.jupiter.api.Assertions.assertThrows;
import static org.junit.jupiter.api.Assertions.assertTrue;

import java.util.List;

import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.autoconfigure.jdbc.AutoConfigureTestDatabase;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.test.context.ActiveProfiles;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.crypto.password.PasswordEncoder;

import com.isppG8.infantem.infantem.InfantemApplication;

import jakarta.transaction.Transactional;

@SpringBootTest(classes = { InfantemApplication.class, UserService.class })
@ActiveProfiles("test")
@AutoConfigureTestDatabase(replace = AutoConfigureTestDatabase.Replace.NONE)
@Transactional
public class UserServiceTest {

    private UserRepository userRepository;
    private UserService userService;
    private PasswordEncoder encoder;

    @Autowired
    public UserServiceTest(UserRepository userRepository, UserService userService, PasswordEncoder passwordEncoder) {
        this.userRepository = userRepository;
        this.userService = userService;
        this.encoder = passwordEncoder;
    }

    @Test
    public void TestGetAllUsers() {

        List<User> users = userService.getAllUsers();
        assertFalse(users.isEmpty());
        assertTrue(users.contains(userRepository.findByUsername("user1").get()));
    }

    @Test
    public void TestFindByUsername() {

        User user = userService.findByUsername("user1");
        assertNotNull(user);
        assertEquals("user1", user.getUsername());
    }

    @Test
    public void TestFindByUsernameNotFound() {

        User user = userService.findByUsername("NonExistentUser");
        assertNull(user);
    }

    @Test
    public void TestSaveUser() {
        User u = new User();
        u.setUsername("user4");
        u.setName("Test");
        u.setSurname("User");
        u.setPassword(encoder.encode("password4"));
        u.setEmail("newEmail@test.com");

        User saved = userService.save(u);
        assertNotNull(saved);
        assertEquals("newEmail@test.com", saved.getEmail());
    }

    @Test
    public void TestSaveUser_InvalidUsername() {
        User u = new User();
        u.setUsername("user1");
        u.setName("Test");
        u.setSurname("User");
        u.setPassword("password4");
        u.setEmail("newEmail@test.com");

        assertThrows(IllegalArgumentException.class, () -> {
            userService.save(u);
        });
    }

    @Test
    public void TestSaveUser_InvalidEmail() {
        User u = new User();
        u.setUsername("user4");
        u.setName("Test");
        u.setSurname("User");
        u.setPassword("password4");
        u.setEmail("user1@example.com");

        assertThrows(IllegalArgumentException.class, () -> {
            userService.save(u);
        });
    }

    @Test
    public void TestFindCurrentUser() {
        SecurityContextHolder.getContext()
                .setAuthentication(new UsernamePasswordAuthenticationToken("user1", "password"));

        User user = userService.findCurrentUser();
        assertNotNull(user);
        assertEquals("user1", user.getUsername());
    }

    @Test
    public void TestUpdateUser() {
        User updatedDetails = new User();
        updatedDetails.setName("Updated");
        updatedDetails.setSurname("User");
        updatedDetails.setUsername("updatedUsername");
        updatedDetails.setEmail("updated@example.com");

        User updatedUser = userService.updateUser((long) 1, updatedDetails);

        assertNotNull(updatedUser);
        assertEquals("Updated", updatedUser.getName());
        assertEquals("updatedUsername", updatedUser.getUsername());
        assertEquals("updated@example.com", updatedUser.getEmail());
    }

    @Test
    public void TestDeleteUser() {
        boolean result = userService.deleteUser((long) 1);
        assertTrue(result);
    }

    @Test
    public void TestDeleteUserNotFound() {
        boolean result = userService.deleteUser((long) 100);
        assertFalse(result);
    }

}
