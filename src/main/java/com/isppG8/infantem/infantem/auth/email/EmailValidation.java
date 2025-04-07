package com.isppG8.infantem.infantem.auth.email;

import java.time.LocalDateTime;

import jakarta.validation.constraints.Max;
import jakarta.validation.constraints.Min;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;

import org.springframework.format.annotation.DateTimeFormat;

import com.fasterxml.jackson.annotation.JsonIdentityInfo;
import com.fasterxml.jackson.annotation.ObjectIdGenerators;

import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.Table;
import lombok.Getter;
import lombok.Setter;

@Entity
@JsonIdentityInfo(scope = EmailValidation.class, generator = ObjectIdGenerators.PropertyGenerator.class,
        property = "id")
@Getter
@Setter
@Table(name = "email_validation")
public class EmailValidation {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Integer id;

    @NotBlank
    private String email;

    @NotNull
    @DateTimeFormat(pattern = "yyyy/MM/dd")
    private LocalDateTime codeSentDate;

    @NotNull
    @Min(0)
    @Max(999999)
    private Integer code;

    public EmailValidation() {

    }

}
