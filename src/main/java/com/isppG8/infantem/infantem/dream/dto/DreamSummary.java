package com.isppG8.infantem.infantem.dream.dto;

import java.time.LocalDateTime;

import com.isppG8.infantem.infantem.dream.Dream;
import com.isppG8.infantem.infantem.dream.DreamType;

import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
public class DreamSummary {
    private Long id;
    private LocalDateTime dateStart;
    private LocalDateTime dateEnd;
    private Integer numWakeups;
    private DreamType DreamType;

    public DreamSummary(Dream dream) {
        this.id = dream.getId();
        this.dateStart = dream.getDateStart();
        this.dateEnd = dream.getDateEnd();
        this.numWakeups = dream.getNumWakeups();
        this.DreamType = dream.getDreamType();
    }

}
