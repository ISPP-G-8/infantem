package com.isppG8.infantem.infantem.auth;

import java.util.List;
import java.util.stream.Collectors;

import jakarta.validation.Valid;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import com.isppG8.infantem.infantem.user.UserService;
import com.isppG8.infantem.infantem.user.User;
import com.isppG8.infantem.infantem.auth.jwt.JwtUtils;
import com.isppG8.infantem.infantem.auth.payload.request.LoginRequest;
import com.isppG8.infantem.infantem.auth.payload.request.SignupRequest;
import com.isppG8.infantem.infantem.auth.payload.response.MessageResponse;
import com.isppG8.infantem.infantem.auth.jwt.JwtResponse;
import com.isppG8.infantem.infantem.config.services.UserDetailsImpl;
import org.springframework.web.bind.annotation.GetMapping;

import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RequestHeader;
import org.springframework.http.HttpHeaders;
import org.springframework.web.bind.annotation.RestController;

import org.springframework.security.authentication.BadCredentialsException;

@RestController
@RequestMapping("/api/v1/auth")
public class AuthController {

    private final AuthenticationManager authenticationManager;
    private final UserService userService;
    private final JwtUtils jwtUtils;
    private final AuthService authService;

    @Autowired
    public AuthController(AuthenticationManager authenticationManager, UserService userService, JwtUtils jwtUtils,
            AuthService authService) {
        this.userService = userService;
        this.jwtUtils = jwtUtils;
        this.authenticationManager = authenticationManager;
        this.authService = authService;
    }

    @PostMapping("/signin")
    public ResponseEntity<Object> authenticateUser(@Valid @RequestBody LoginRequest loginRequest) {
        try {
            Authentication authentication = authenticationManager.authenticate(
                    new UsernamePasswordAuthenticationToken(loginRequest.getUsername(), loginRequest.getPassword()));

            SecurityContextHolder.getContext().setAuthentication(authentication);
            String jwt = jwtUtils.generateJwtToken(authentication);

            UserDetailsImpl userDetails = (UserDetailsImpl) authentication.getPrincipal();
            List<String> roles = userDetails.getAuthorities().stream().map(item -> item.getAuthority())
                    .collect(Collectors.toList());

            return ResponseEntity.ok()
                    .body(new JwtResponse(jwt, userDetails.getId(), userDetails.getUsername(), roles));
        } catch (BadCredentialsException exception) {
            return ResponseEntity.badRequest().body(new MessageResponse("Bad Credentials!"));
        }
    }

    @GetMapping("/me")
    public ResponseEntity<Object> authSantos(@RequestHeader HttpHeaders headers) {
        try {
            if (!headers.containsKey("Authorization")) {
                throw new BadCredentialsException("");
            }
            String token = headers.get("Authorization").get(0).substring(6);
            Boolean isValid = jwtUtils.validateJwtToken(token);
            if (!isValid) {
                throw new BadCredentialsException("");
            }
            String username = jwtUtils.getUserNameFromJwtToken(token);
            User loggedInUser = userService.findByUsername(username);
            if (loggedInUser == null) {
                throw new BadCredentialsException("");
            }
            return ResponseEntity.ok().body(loggedInUser);
        } catch (BadCredentialsException exception) {
            return ResponseEntity.badRequest().body(new MessageResponse("Bad Credentials!"));
        } catch (Exception e) {
            return ResponseEntity.badRequest().body(new MessageResponse("Something went wrong"));
        }
    }

    @GetMapping("/validate")
    public ResponseEntity<Boolean> validateToken(@RequestParam String token) {
        Boolean isValid = jwtUtils.validateJwtToken(token);
        return ResponseEntity.ok(isValid);
    }

    @PostMapping("/signup")
    public ResponseEntity<Object> registerUser(@Valid @RequestBody SignupRequest signUpRequest) {
        if (userService.findByUsername(signUpRequest.getUsername()) != null) {
            return ResponseEntity.badRequest().body(new MessageResponse("Error: Username is already taken!"));
        }
        authService.createUser(signUpRequest);
        Authentication authentication = authenticationManager.authenticate(
                new UsernamePasswordAuthenticationToken(signUpRequest.getUsername(), signUpRequest.getPassword()));
        SecurityContextHolder.getContext().setAuthentication(authentication);
        String jwt = jwtUtils.generateJwtToken(authentication);

        UserDetailsImpl userDetails = (UserDetailsImpl) authentication.getPrincipal();
        List<String> roles = userDetails.getAuthorities().stream().map(item -> item.getAuthority())
                .collect(Collectors.toList());

        return ResponseEntity.ok().body(new JwtResponse(jwt, userDetails.getId(), userDetails.getUsername(), roles));
    }

}
