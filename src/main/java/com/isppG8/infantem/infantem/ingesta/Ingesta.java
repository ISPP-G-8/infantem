package com.isppG8.infantem.infantem.ingesta;

import java.time.LocalDateTime;

import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.ManyToOne;
import jakarta.persistence.Table;
import lombok.Getter;
import lombok.Setter;

@Entity
@Table(name = "ingesta_table")
@Getter
@Setter
public class Ingesta {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;
    private LocalDateTime fecha;

    private double cantidad;

    private String observaciones;
    public String descripcion;

    @ManyToOne
    private Alimento alimento;

    @ManyToOne
    private SintomaIngesta sintomaIngesta;
}
