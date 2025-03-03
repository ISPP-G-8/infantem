package com.isppG8.infantem.infantem.sueño;

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
@Table(name = "sueño_table")
@Getter @Setter
public class Sueño {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;


    private LocalDateTime inicio;
    private LocalDateTime fin;
    private Integer numDesvalos;
    private tipoSueño tipoSueño;
    
}
