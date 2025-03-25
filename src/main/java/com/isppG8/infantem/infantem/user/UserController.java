package com.isppG8.infantem.infantem.user;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestHeader;

import com.isppG8.infantem.infantem.auth.jwt.JwtUtils;
import com.isppG8.infantem.infantem.auth.payload.response.MessageResponse;

import com.isppG8.infantem.infantem.user.dto.UserDTO;

import jakarta.validation.Valid;

import java.util.List;

@RestController
@RequestMapping("api/v1/users")
public class UserController {

    private final UserService userService;
    private final JwtUtils jwtUtils;

    @Autowired
    public UserController(UserService userService, JwtUtils jwtUtils) {
        this.userService = userService;
        this.jwtUtils = jwtUtils;
    }

    @PreAuthorize("hasAuthority('admin')")
    @GetMapping
    public List<UserDTO> getAllUsers() {
        List<UserDTO> users = this.userService.getAllUsers().stream().map(UserDTO::new).toList();
        return users;
    }

    @GetMapping("/{id}")
    public ResponseEntity<Object> getUserById(@PathVariable Long id,
            @RequestHeader(name = "Authorization") String token) {

        String jwtId = jwtUtils.getIdFromJwtToken(token.substring(6));
        if (!(jwtId.equals(id.toString()))) {
            return ResponseEntity.badRequest().body(new MessageResponse("Not your user"));
        }

        User user = userService.getUserById(id);

        if (user == null) {
            return ResponseEntity.badRequest().body(new MessageResponse("Something went wrong"));
        }

        return ResponseEntity.ok().body(new UserDTO(user));

    }

    @PostMapping
    public ResponseEntity<UserDTO> createUser(@Valid @RequestBody User user) {
        User createdUser = this.userService.createUser(user);
        return ResponseEntity.ok(new UserDTO(createdUser));
    }

    @PutMapping("/{id}")
    public ResponseEntity<Object> updateUser(@PathVariable Long id, @Valid @RequestBody User userDetails,
            @RequestHeader(name = "Authorization") String token) {

        String jwtId = jwtUtils.getIdFromJwtToken(token.substring(6));

        if (!(jwtId.equals(id.toString()))) {
            return ResponseEntity.badRequest().body(new MessageResponse("Not your user"));
        }

        User updatedUser = userService.updateUser(id, userDetails);
        return ResponseEntity.ok().body(new UserDTO(updatedUser));

    }

    @DeleteMapping("/{id}")
    public ResponseEntity<MessageResponse> deleteUser(@PathVariable Long id,
            @RequestHeader(name = "Authorization") String token) {

        String jwtId = jwtUtils.getIdFromJwtToken(token.substring(6));

        if (!(jwtId.equals(id.toString()))) {
            return ResponseEntity.badRequest().body(new MessageResponse("Not your user"));
        }

        if (userService.deleteUser(id)) {
            return ResponseEntity.ok().body(new MessageResponse("User deleted successfully"));
        }

        // Unreachable code unless some kind of race condition happens
        return ResponseEntity.badRequest().body(new MessageResponse("Something went wrong"));

    }
}
