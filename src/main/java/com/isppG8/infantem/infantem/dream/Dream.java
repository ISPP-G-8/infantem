package com.isppG8.infantem.infantem.dream;

import java.time.DateTimeException;
import java.time.LocalDateTime;

import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.Table;
import lombok.Getter;
import lombok.Setter;

@Entity
@Table(name = "dream_table")
@Getter @Setter
public class Dream {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;


    private LocalDateTime start;
    private LocalDateTime end;
    private Integer numWakeups; // numero de desvelos
    private DreamType DreamType;
    
}
