package com.isppG8.infantem.infantem.user;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestHeader;

import com.isppG8.infantem.infantem.auth.jwt.JwtResponse;
import com.isppG8.infantem.infantem.auth.jwt.JwtUtils;
import com.isppG8.infantem.infantem.auth.payload.request.SignupRequest;
import com.isppG8.infantem.infantem.auth.payload.response.MessageResponse;
import com.isppG8.infantem.infantem.config.services.UserDetailsImpl;
import com.isppG8.infantem.infantem.user.dto.UserDTO;
import com.isppG8.infantem.infantem.auth.AuthService;
import com.isppG8.infantem.infantem.auth.AuthoritiesService;
import org.springframework.security.authentication.AuthenticationManager;

import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.media.Content;
import io.swagger.v3.oas.annotations.media.Schema;
import io.swagger.v3.oas.annotations.responses.ApiResponse;
import io.swagger.v3.oas.annotations.tags.Tag;
import jakarta.validation.Valid;

import java.util.List;
import java.util.stream.Collectors;

@Tag(name = "UsersAdmin", description = "Gestión de usuarios admin")
@RestController
@RequestMapping("api/v1/admin/users")
public class UserControllerAdmin {

    private final UserService userService;
    private final AuthoritiesService authoritiesService;
    private final AuthService authService;
    private final AuthenticationManager authenticationManager;
    private final JwtUtils jwtUtils;

    @Autowired
    public UserControllerAdmin(UserService userService, JwtUtils jwtUtils, AuthoritiesService authoritiesService,
            AuthService authService, AuthenticationManager authenticationManager) {
        this.authService = authService;
        this.jwtUtils = jwtUtils;
        this.authenticationManager = authenticationManager;
        this.userService = userService;
        this.authoritiesService = authoritiesService;
    }

    @Operation(summary = "Obtener todos los usuarios",
            description = "Recupera la lista de todos los usuarios.") @ApiResponse(responseCode = "200",
                    description = "Lista de usuarios obtenida exitosamente",
                    content = @Content(mediaType = "application/json",
                            schema = @Schema(implementation = UserDTO.class))) @GetMapping
    public List<UserDTO> getAllUsers() {
        if (authoritiesService.isAdmin()) {
            List<UserDTO> users = this.userService.getAllUsers().stream().map(UserDTO::new).toList();
            return users;
        }
        return null;
    }

    @Operation(summary = "Registrar nuevo usuario",
            description = "Registra un usuario en el sistema y devuelve un token JWT.") @ApiResponse(
                    responseCode = "200", description = "Usuario registrado exitosamente",
                    content = @Content(schema = @Schema(implementation = JwtResponse.class))) @ApiResponse(
                            responseCode = "400",
                            description = "Usuario o email ya en uso o código de validación incorrecto") @PostMapping("/signup")
    public ResponseEntity<Object> registerUser(@Valid @RequestBody SignupRequest signUpRequest) {
        if (authoritiesService.isAdmin()) {
            boolean existingUser = (userService.findByUsername(signUpRequest.getUsername()) == null);
            boolean existingEmail = (userService.findByEmail(signUpRequest.getEmail()) == null);
            if (!(existingUser && existingEmail)) {
                String e = "";
                if (existingEmail) {
                    if (existingUser) {
                        e = "Ese usuario e email están siendo utilizados";
                    } else {
                        e = "Ese email ya está siendo utilizado";
                    }
                } else {
                    e = "Ese usuario ya está siendo utilizado";
                }
                return ResponseEntity.badRequest().body(new MessageResponse(e));
            }
            authService.createUser(signUpRequest);
            Authentication authentication = authenticationManager.authenticate(
                    new UsernamePasswordAuthenticationToken(signUpRequest.getUsername(), signUpRequest.getPassword()));
            SecurityContextHolder.getContext().setAuthentication(authentication);
            String jwt = jwtUtils.generateJwtToken(authentication);

            UserDetailsImpl userDetails = (UserDetailsImpl) authentication.getPrincipal();
            List<String> roles = userDetails.getAuthorities().stream().map(item -> item.getAuthority())
                    .collect(Collectors.toList());
            return ResponseEntity.ok()
                    .body(new JwtResponse(jwt, userDetails.getId(), userDetails.getUsername(), roles));
        }
        return ResponseEntity.badRequest().body(new MessageResponse("No tienes permiso para hacer esto"));
    }

    @Operation(summary = "Obtener un usuario por su ID",
            description = "Recupera los detalles de un usuario por su ID.") @ApiResponse(responseCode = "200",
                    description = "Usuario encontrado",
                    content = @Content(mediaType = "application/json",
                            schema = @Schema(implementation = UserDTO.class))) @ApiResponse(responseCode = "400",
                                    description = "El usuario no es el tuyo o no existe") @GetMapping("/{id}")
    public ResponseEntity<Object> getUserById(@PathVariable Long id,
            @RequestHeader(name = "Authorization") String token) {
        if (authoritiesService.isAdmin()) {
            User user = userService.getUserById(id);
            if (user == null) {
                return ResponseEntity.badRequest().body(new MessageResponse("Something went wrong"));
            }
            return ResponseEntity.ok().body(new UserDTO(user));
        }
        return null;

    }

    @Operation(summary = "Actualizar un usuario por su ID",
            description = "Actualiza la información de un usuario por su ID.") @ApiResponse(responseCode = "200",
                    description = "Usuario actualizado exitosamente",
                    content = @Content(mediaType = "application/json",
                            schema = @Schema(implementation = UserDTO.class))) @ApiResponse(responseCode = "400",
                                    description = "El usuario no es el tuyo") @PutMapping("/{id}")
    public ResponseEntity<Object> updateUser(@PathVariable Long id, @Valid @RequestBody User userDetails,
            @RequestHeader(name = "Authorization") String token) {
        if (authoritiesService.isAdmin()) {
            User updatedUser = userService.updateUser(id, userDetails);
            return ResponseEntity.ok().body(new UserDTO(updatedUser));
        }
        return null;

    }

    @Operation(summary = "Eliminar un usuario por su ID", description = "Elimina un usuario por su ID.") @ApiResponse(
            responseCode = "200", description = "Usuario eliminado exitosamente",
            content = @Content(mediaType = "application/json",
                    schema = @Schema(implementation = MessageResponse.class))) @ApiResponse(responseCode = "400",
                            description = "El usuario no es el tuyo") @DeleteMapping("/{id}")
    public ResponseEntity<MessageResponse> deleteUser(@PathVariable Long id,
            @RequestHeader(name = "Authorization") String token) {
        if (authoritiesService.isAdmin()) {

            if (userService.deleteUser(id)) {
                return ResponseEntity.ok().body(new MessageResponse("User deleted successfully"));
            }

            return ResponseEntity.badRequest().body(new MessageResponse("Something went wrong"));
        }
        return null;

    }
}
