package com.isppG8.infantem.infantem.auth.email;

import java.util.Optional;
import java.time.LocalDateTime;
import java.util.concurrent.TimeUnit;
import java.util.Random;

import com.isppG8.infantem.infantem.auth.email.EmailDetailsService;
import com.isppG8.infantem.infantem.auth.email.EmailDetails;
import com.isppG8.infantem.infantem.auth.payload.request.EmailRequest;
import com.isppG8.infantem.infantem.user.UserService;
import com.isppG8.infantem.infantem.user.User;
import com.isppG8.infantem.infantem.exceptions.ResourceNotOwnedException;

import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.beans.factory.annotation.Autowired;

@Service
public class EmailValidationService {

    @Autowired
    private EmailValidationRepository emailValidationRepository;

    @Autowired
    private EmailDetailsService emailDetailsService;

    @Autowired
    private UserService userService;

    public EmailValidation findByEmail(String email) {
        return emailValidationRepository.findByEmail(email).orElse(null);
    }

    @Transactional
    public void createEmailValidation(EmailRequest emailRequest) {
        try {
            EmailValidation oldEmailValidation = emailValidationRepository.findByEmail(emailRequest.getEmail())
                    .orElse(null);

            User existingEmailUser = userService.findByEmail(emailRequest.getEmail());
            User existingUsernameUser = userService.findByUsername(emailRequest.getUsername());
            if (!(existingEmailUser == null && existingUsernameUser == null)) {
                boolean emailUser = !(existingEmailUser == null);
                boolean usernameUser = !(existingUsernameUser == null);
                String e = "";
                if (emailUser) {
                    if (usernameUser) {
                        e = "Ese usuario e email están siendo utilizados";
                    } else {
                        e = "Ese email ya está siendo utilizado";
                    }
                } else {
                    e = "Ese usuario ya está siendo utilizado";
                }
                throw new ResourceNotOwnedException(e);
            }

            if (!(oldEmailValidation == null)) {
                this.deleteEmailValidation(oldEmailValidation);
            }

            Random rand = new Random();

            EmailValidation newEmailValidation = new EmailValidation();
            newEmailValidation.setEmail(emailRequest.getEmail());
            newEmailValidation.setCodeSentDate(LocalDateTime.now());
            newEmailValidation.setCode(rand.nextInt(999999));

            EmailDetails details = new EmailDetails(emailRequest.getEmail(),
                    String.format("Este es tu código de validación, caducará en 10 minutos: %d",
                            newEmailValidation.getCode()),
                    "Código de validación Infantem");

            System.out.println(emailDetailsService.sendSimpleMail(details));

            emailValidationRepository.save(newEmailValidation);

        } catch (ResourceNotOwnedException e) {
            throw new ResourceNotOwnedException(e.getMessage());
        } catch (Exception e) {
            System.out.println(String.format("Exception while creating confirmation code: %s", e.toString()));
            EmailValidation cleanup = emailValidationRepository.findByEmail(emailRequest.getEmail()).orElse(null);
            if (!(cleanup == null)) {
                this.deleteEmailValidation(cleanup);
            }
            throw new RuntimeException("Something went wrong while generating your confirmation code");
        }
    }

    public Boolean validateCode(String email, Integer code) {
        try {
            EmailValidation currentEmailValidation = emailValidationRepository.findByEmail(email).orElse(null);
            if (currentEmailValidation == null) {
                return false;
            } else if (!currentEmailValidation.getCode().equals(code)) {
                return false;
            } else if (LocalDateTime.now().minusMinutes(10).isAfter(currentEmailValidation.getCodeSentDate())) {
                return false;
            }
            this.deleteEmailValidation(currentEmailValidation);
            return true;

        } catch (Exception e) {
            System.out.println(String.format("Exception while validating confirmation code: {e}", e.toString()));
            throw new RuntimeException(
                    "Something went wrong while validating your confirmation code, please try again");
        }
    }

    @Transactional
    public void deleteEmailValidation(EmailValidation emailValidation) {
        emailValidationRepository.delete(emailValidation);
    }

}
