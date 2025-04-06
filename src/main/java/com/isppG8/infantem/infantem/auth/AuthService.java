package com.isppG8.infantem.infantem.auth;

import jakarta.annotation.Nullable;
import jakarta.transaction.Transactional;
import jakarta.validation.Valid;

import com.isppG8.infantem.infantem.user.UserService;
import com.isppG8.infantem.infantem.user.User;
import com.isppG8.infantem.infantem.auth.email.EmailDetails;
import com.isppG8.infantem.infantem.auth.email.EmailDetailsService;
import com.isppG8.infantem.infantem.auth.payload.request.SignupRequest;
import com.isppG8.infantem.infantem.auth.resetPassword.PasswordResetService;
import com.isppG8.infantem.infantem.auth.resetPassword.PasswordResetToken;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

@Service
public class AuthService {

    private final PasswordEncoder encoder;
    private final AuthoritiesService authoritiesService;
    private final UserService userService;
    private final PasswordResetService passwordResetService;
    private final EmailDetailsService emailDetailsService;

    @Value("${frontend.url}")
    private String frontendUrl;

    @Autowired
    public AuthService(@Nullable PasswordEncoder encoder, AuthoritiesService authoritiesService,
            UserService userService, PasswordResetService passwordResetService,
            EmailDetailsService emailDetailsService) {
        if (encoder != null) {
            this.encoder = encoder;
        } else {
            this.encoder = new BCryptPasswordEncoder();
        }
        this.authoritiesService = authoritiesService;
        this.userService = userService;
        this.passwordResetService = passwordResetService;
        this.emailDetailsService = emailDetailsService;
    }

    @Transactional
    public void createUser(@Valid SignupRequest request) {
        User user = new User();
        user.setUsername(request.getUsername());
        user.setPassword(encoder.encode(request.getPassword()));
        user.setName(request.getName());
        user.setSurname(request.getSurname());
        user.setUsername(request.getUsername());
        user.setEmail(request.getEmail());
        Authorities authority = authoritiesService.findByAuthority("user");
        user.setAuthorities(authority);
        userService.save(user);

    }

    public void initiatePasswordReset(String email) {
        User user = userService.findByEmail(email);

        if (user != null) {
            String token = passwordResetService.createToken(user);
            String resetLink = frontendUrl + "/reset?token=" + token;

            String subject = "Restablece tu contraseña";
            String body = "Hola " + user.getName() + ",\n\n"
                    + "Haz clic en el siguiente enlace para restablecer tu contraseña:\n" + resetLink + "\n\n"
                    + "Este enlace caduca en 30 minutos.";

            EmailDetails emailDetails = new EmailDetails(user.getEmail(), body, subject);
            emailDetailsService.sendSimpleMail(emailDetails);
        }

    }

    public void resetPassword(String token, String newPassword) {
        PasswordResetToken resetToken = passwordResetService.validateToken(token);
        User user = resetToken.getUser();
        String encodePassword = encoder.encode(newPassword);
        userService.updatePassword(user.getId().longValue(), encodePassword);
        passwordResetService.invalidateToken(resetToken);
    }
}
