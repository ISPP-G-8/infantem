package com.isppG8.infantem.infantem.milestoneCompleted;

import com.fasterxml.jackson.annotation.JsonIdentityInfo;
import com.fasterxml.jackson.annotation.ObjectIdGenerators;
import com.isppG8.infantem.infantem.baby.Baby;
import com.isppG8.infantem.infantem.milestone.Milestone;
import lombok.Getter;
import lombok.Setter;

import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.ManyToOne;
import java.util.Date;

@Getter
@Setter
@Entity
@JsonIdentityInfo(scope = MilestoneCompleted.class, generator = ObjectIdGenerators.PropertyGenerator.class,
        property = "id")
public class MilestoneCompleted {

    // Id

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    // Atributos

    private Date date;

    // Relaciones

    @ManyToOne
    private Milestone milestone;

    @ManyToOne
    @JoinColumn(name = "baby_id")
    private Baby baby;

}
