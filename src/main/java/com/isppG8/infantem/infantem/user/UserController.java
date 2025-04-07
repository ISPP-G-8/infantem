package com.isppG8.infantem.infantem.user;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestHeader;

import com.isppG8.infantem.infantem.auth.jwt.JwtUtils;
import com.isppG8.infantem.infantem.auth.payload.response.MessageResponse;

import com.isppG8.infantem.infantem.user.dto.UserDTO;

import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.media.Content;
import io.swagger.v3.oas.annotations.media.Schema;
import io.swagger.v3.oas.annotations.responses.ApiResponse;
import io.swagger.v3.oas.annotations.tags.Tag;
import jakarta.validation.Valid;

import java.util.List;

@Tag(name = "Users", description = "Gestión de usuarios")
@RestController
@RequestMapping("api/v1/users")
public class UserController {

    @Autowired
    private final UserService userService;
    @Autowired
    private final JwtUtils jwtUtils;

    @Autowired
    public UserController(UserService userService, JwtUtils jwtUtils) {
        this.userService = userService;
        this.jwtUtils = jwtUtils;
    }

    @Operation(summary = "Obtener todos los usuarios",
            description = "Recupera la lista de todos los usuarios.") @ApiResponse(responseCode = "200",
                    description = "Lista de usuarios obtenida exitosamente",
                    content = @Content(mediaType = "application/json", schema = @Schema(
                            implementation = UserDTO.class))) @PreAuthorize("hasAuthority('admin')") @GetMapping
    public List<UserDTO> getAllUsers() {
        List<UserDTO> users = this.userService.getAllUsers().stream().map(UserDTO::new).toList();
        return users;
    }

    @Operation(summary = "Obtener un usuario por su ID",
            description = "Recupera los detalles de un usuario por su ID.") @ApiResponse(responseCode = "200",
                    description = "Usuario encontrado",
                    content = @Content(mediaType = "application/json",
                            schema = @Schema(implementation = UserDTO.class))) @ApiResponse(responseCode = "400",
                                    description = "El usuario no es el tuyo o no existe") @GetMapping("/{id}")
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

    @Operation(summary = "Actualizar un usuario por su ID",
            description = "Actualiza la información de un usuario por su ID.") @ApiResponse(responseCode = "200",
                    description = "Usuario actualizado exitosamente",
                    content = @Content(mediaType = "application/json",
                            schema = @Schema(implementation = UserDTO.class))) @ApiResponse(responseCode = "400",
                                    description = "El usuario no es el tuyo") @PutMapping("/{id}")
    public ResponseEntity<Object> updateUser(@PathVariable Long id, @Valid @RequestBody User userDetails,
            @RequestHeader(name = "Authorization") String token) {

        String jwtId = jwtUtils.getIdFromJwtToken(token.substring(6));

        if (!(jwtId.equals(id.toString()))) {
            return ResponseEntity.badRequest().body(new MessageResponse("Not your user"));
        }

        User updatedUser = userService.updateUser(id, userDetails);
        return ResponseEntity.ok().body(new UserDTO(updatedUser));

    }

    @Operation(summary = "Eliminar un usuario por su ID", description = "Elimina un usuario por su ID.") @ApiResponse(
            responseCode = "200", description = "Usuario eliminado exitosamente",
            content = @Content(mediaType = "application/json",
                    schema = @Schema(implementation = MessageResponse.class))) @ApiResponse(responseCode = "400",
                            description = "El usuario no es el tuyo") @DeleteMapping("/{id}")
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
