package com.isppG8.infantem.infantem.marketplace;

import org.hibernate.validator.constraints.URL;

import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.Size;
import lombok.Getter;
import lombok.Setter;

@Entity
@Getter
@Setter
public class Product {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @NotBlank
    @Size(min = 3)
    private String title;

    @NotBlank
    @Size(min = 10, max = 255)
    private String description;

    @NotBlank
    @URL
    private String shopUrl;

    @URL
    @NotBlank
    private String imageUrl;
}
