package com.isppG8.infantem.infantem.milestone;

import com.isppG8.infantem.infantem.milestoneCompleted.MilestoneCompleted;
import java.util.*;
import jakarta.persistence.*;
import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
@Entity
public class Milestone {
    
    //Id

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    //Atributos

    private String name;
    private String description;

    //Relaciones

    @OneToMany
    private List<MilestoneCompleted> milestonesCompleted = new ArrayList<>();

}
