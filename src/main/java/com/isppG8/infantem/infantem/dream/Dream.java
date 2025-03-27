package com.isppG8.infantem.infantem.dream;

import java.time.LocalDateTime;

import com.fasterxml.jackson.annotation.JsonIdentityInfo;
import com.fasterxml.jackson.annotation.JsonIgnore;
import com.fasterxml.jackson.annotation.ObjectIdGenerators;
import com.isppG8.infantem.infantem.baby.Baby;

import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.ManyToOne;
import jakarta.persistence.Table;
import jakarta.validation.constraints.AssertTrue;
import jakarta.validation.constraints.Min;
import jakarta.validation.constraints.NotNull;
import lombok.Getter;
import lombok.Setter;

@Entity
@Table(name = "dream_table")
@Getter
@Setter
@JsonIdentityInfo(scope = Dream.class, generator = ObjectIdGenerators.PropertyGenerator.class, property = "id")
public class Dream {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @NotNull
    private LocalDateTime dateStart;

    @NotNull
    private LocalDateTime dateEnd;

    @Min(0)
    private Integer numWakeups;

    @NotNull
    private DreamType DreamType;

    @ManyToOne
    @NotNull
    @JoinColumn(name = "baby_id")
    private Baby baby;

    @AssertTrue(message = "The end date must be after the start date")
    @JsonIgnore
    public boolean isDateValid() {
        if (dateStart == null || dateEnd == null) {
            return true;
        }
        return dateEnd.isAfter(dateStart);
    }

}
