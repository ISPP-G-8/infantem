package com.isppG8.infantem.infantem.baby.dto;

import com.isppG8.infantem.infantem.baby.Baby;

import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
public class BabyNameDTO {
    private String name;

    public BabyNameDTO() {
    }

    public BabyNameDTO(Baby baby) {
        if (baby != null) {
            this.name = baby.getName();
        }
    }
}
