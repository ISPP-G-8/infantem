package com.isppG8.infantem.infantem.dream.dto;

import java.time.LocalDateTime;

import com.fasterxml.jackson.annotation.JsonFormat;
import com.isppG8.infantem.infantem.baby.dto.BabyNameDTO;
import com.isppG8.infantem.infantem.dream.Dream;
import com.isppG8.infantem.infantem.dream.DreamType;

import jakarta.validation.constraints.Min;
import jakarta.validation.constraints.NotNull;
import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
public class DreamDTO {

    private Long id;

    @NotNull
    @JsonFormat(pattern = "yyyy-MM-dd")
    private LocalDateTime dateStart;

    @NotNull
    @JsonFormat(pattern = "yyyy-MM-dd")
    private LocalDateTime dateEnd;

    @Min(0)
    private Integer numWakeups;

    @NotNull
    private DreamType DreamType;

    private BabyNameDTO baby;

    public DreamDTO() {
    }

    public DreamDTO(Dream dream) {
        this.id = dream.getId();
        this.dateStart = dream.getDateStart();
        this.dateEnd = dream.getDateEnd();
        this.numWakeups = dream.getNumWakeups();
        this.DreamType = dream.getDreamType();
        this.baby = new BabyNameDTO(dream.getBaby());

    }
}
