package com.isppG8.infantem.infantem.user.dto;

import java.util.List;

import com.isppG8.infantem.infantem.baby.dto.BabyDTO;
import com.isppG8.infantem.infantem.user.User;

import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
public class UserSummaryDTO {

    private int id;
    private String name;
    private String surname;
    private String username;
    private List<BabyDTO> babies;

    public UserSummaryDTO() {
    }

    public UserSummaryDTO(User user) {
        this.id = user.getId();
        this.name = user.getName();
        this.surname = user.getSurname();
        this.username = user.getUsername();
        if (user.getBabies() != null)
            this.babies = user.getBabies().stream().map(BabyDTO::new).toList();
    }
}
