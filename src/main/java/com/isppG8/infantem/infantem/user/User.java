package com.isppG8.infantem.infantem.user;

import java.util.ArrayList;
import java.util.List;

import org.hibernate.validator.constraints.URL;

import com.isppG8.infantem.infantem.baby.Baby;
import com.isppG8.infantem.infantem.recipe.Recipe;

import jakarta.persistence.CascadeType;
import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.ManyToMany;
import jakarta.persistence.ManyToOne;
import jakarta.persistence.OneToMany;
import jakarta.persistence.Table;
import jakarta.validation.constraints.Email;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.Pattern;
import jakarta.validation.constraints.Size;

import com.fasterxml.jackson.annotation.JsonBackReference;
import com.fasterxml.jackson.annotation.JsonIdentityInfo;
import com.fasterxml.jackson.annotation.JsonManagedReference;
import com.fasterxml.jackson.annotation.ObjectIdGenerators;
import com.isppG8.infantem.infantem.auth.Authorities;
import lombok.Getter;
import lombok.Setter;

@Entity
@Table(name = "user_table")
@Getter
@Setter
@JsonIdentityInfo(generator = ObjectIdGenerators.PropertyGenerator.class, property = "id")

public class User {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private int id;

    @NotBlank
    @Size(min = 3, max = 50)
    private String name;

    @NotBlank
    @Size(min = 3, max = 50)
    private String surname;

    @Column(unique = true)
    @NotBlank
    @Size(min = 3, max = 50)
    @Pattern(regexp = "^[a-zA-Z0-9._-]{3,50}$", 
    message = "The username can only contain letters, numbers, periods, hyphens, and underscores.")
    private String username;

    @NotBlank
    private String password;

    @Email
    @Column(unique = true)
    private String email;

    @URL
    private String profilePhotoRoute;

    @ManyToOne
    @JoinColumn(name = "authority_id")
    private Authorities authorities;

    @OneToMany(mappedBy = "user", cascade = CascadeType.ALL, orphanRemoval = true)
    @JsonManagedReference
    private List<Recipe> recipes = new ArrayList<>();

    @ManyToMany(mappedBy = "users")
    List<Baby> babies = new ArrayList<>();
}
