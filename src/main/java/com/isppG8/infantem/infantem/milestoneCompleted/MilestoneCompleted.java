package com.isppG8.infantem.infantem.milestoneCompleted;

import java.util.*;

import com.isppG8.infantem.infantem.baby.Baby;
import com.isppG8.infantem.infantem.milestone.Milestone;

import jakarta.persistence.*;
import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
@Entity
public class MilestoneCompleted {

    //Id
    
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    //Atributos

    private Date date;

    //Relaciones

    @ManyToOne
    private Milestone milestone;

    @ManyToOne
    private Baby baby;


}