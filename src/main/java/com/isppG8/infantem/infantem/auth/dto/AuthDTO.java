package com.isppG8.infantem.infantem.auth.dto;

import com.isppG8.infantem.infantem.user.User;

import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
public class AuthDTO {

    private Integer id;

    private String name;

    private String surname;

    private String username;

    private String email;

    private String profilePhotoRoute;

    public AuthDTO() {

    }

    public AuthDTO(User user) {
        this.id = user.getId();
        this.name = user.getName();
        this.surname = user.getSurname();
        this.username = user.getUsername();
        this.email = user.getEmail();
        this.profilePhotoRoute = user.getProfilePhotoRoute();
    }

}
