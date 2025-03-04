package com.isppG8.infantem.infantem.ingesta;


import java.util.List;

import jakarta.persistence.CascadeType;
import jakarta.persistence.Entity;
import jakarta.persistence.EnumType;
import jakarta.persistence.Enumerated;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.OneToMany;
import jakarta.persistence.Table;
import lombok.Getter;
import lombok.Setter;

@Entity
@Table(name = "alimento_table")
@Getter @Setter
public class Alimento {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    private String nombre;

    @Enumerated(EnumType.STRING)
    private CategoriaAlimento categoriaAlimento;
    
    @OneToMany(mappedBy = "alimento", cascade = CascadeType.ALL, orphanRemoval = true)
    private List<IngredienteReceta> ingredientes;
}

