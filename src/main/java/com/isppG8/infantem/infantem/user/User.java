package com.isppG8.infantem.infantem.user;

import java.util.ArrayList;
import java.util.List;

import com.isppG8.infantem.infantem.baby.Baby;
import com.isppG8.infantem.infantem.recipe.CustomRecipeRequest;
import com.isppG8.infantem.infantem.recipe.Recipe;

import jakarta.persistence.CascadeType;
import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.Lob;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.ManyToMany;
import jakarta.persistence.ManyToOne;
import jakarta.persistence.OneToMany;
import jakarta.persistence.Table;
import jakarta.validation.constraints.Email;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.Size;

import com.fasterxml.jackson.annotation.JsonIdentityInfo;
import com.fasterxml.jackson.annotation.JsonManagedReference;
import com.fasterxml.jackson.annotation.ObjectIdGenerators;
import com.fasterxml.jackson.annotation.JsonIgnore;
import com.isppG8.infantem.infantem.auth.Authorities;
import lombok.Getter;
import lombok.Setter;

@Entity
@Table(name = "user_table")
@Getter
@Setter
@JsonIdentityInfo(scope = User.class, generator = ObjectIdGenerators.PropertyGenerator.class, property = "id")

public class User {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Integer id;

    @NotBlank
    @Size(min = 3, max = 50)
    private String name;

    @NotBlank
    @Size(min = 3, max = 50)
    private String surname;

    @NotBlank
    @Size(min = 3, max = 50)
    @Column(unique = true, nullable = false)
    private String username;

    @NotBlank
    private String password;

    @NotBlank
    @Email
    @Column(unique = true, nullable = false)
    private String email;

    @Lob
    private byte[] profilePhoto;

    @ManyToOne
    @JoinColumn(name = "authority_id")
    private Authorities authorities;

    @OneToMany(mappedBy = "user", cascade = CascadeType.ALL, orphanRemoval = true)
    @JsonManagedReference
    private List<Recipe> recipes = new ArrayList<>();

    @JsonIgnore
    @ManyToMany(mappedBy = "users", cascade = CascadeType.ALL)

    List<Baby> babies = new ArrayList<>();

    @OneToMany(mappedBy = "user", cascade = CascadeType.ALL, orphanRemoval = true)
    @JsonManagedReference
    private List<CustomRecipeRequest> customRecipeRequests = new ArrayList<>();
}
