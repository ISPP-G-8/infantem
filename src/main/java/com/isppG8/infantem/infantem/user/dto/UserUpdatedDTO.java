package com.isppG8.infantem.infantem.user.dto;

import com.isppG8.infantem.infantem.user.User;

import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
public class UserUpdatedDTO {

    private int id;
    private String name;
    private String surname;
    private String username;
    private String email;
    private String profilePhotoRoute;
    private String role;
    private String jwt;

    public UserUpdatedDTO() {

    }

    public UserUpdatedDTO(User user, String jwt) {
        this.id = user.getId();
        this.name = user.getName();
        this.surname = user.getSurname();
        this.username = user.getUsername();
        this.email = user.getEmail();
        this.profilePhotoRoute = user.getProfilePhotoRoute();
        this.role = (user.getAuthorities() != null) ? user.getAuthorities().getAuthority() : null;
        this.jwt = jwt;
    }
}
