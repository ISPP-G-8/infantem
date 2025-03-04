package com.isppG8.infantem.infantem.ingesta;

import java.util.List;

import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.OneToMany;
import jakarta.persistence.Table;
import lombok.Getter;
import lombok.Setter;

@Entity
@Table(name = "receta_table")
@Getter @Setter
public class Receta {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;
    private Integer edadMinRecomendada;
    private Integer edadMaxRecomendada;
    private String elaboracion;

    @OneToMany
    private List<IngredienteReceta> ingredientes;
    
}
