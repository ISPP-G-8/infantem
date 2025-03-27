package com.isppG8.infantem.infantem.milestone;

import com.isppG8.infantem.infantem.milestoneCompleted.MilestoneCompleted;

import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.OneToMany;

import java.util.ArrayList;
import java.util.List;

import com.fasterxml.jackson.annotation.JsonIdentityInfo;
import com.fasterxml.jackson.annotation.ObjectIdGenerators;
import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
@Entity
@JsonIdentityInfo(scope = Milestone.class, generator = ObjectIdGenerators.PropertyGenerator.class, property = "id")
public class Milestone {

    // Id

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    // Atributos

    private String name;
    private String description;

    // Relaciones

    @OneToMany
    private List<MilestoneCompleted> milestonesCompleted = new ArrayList<>();

}
