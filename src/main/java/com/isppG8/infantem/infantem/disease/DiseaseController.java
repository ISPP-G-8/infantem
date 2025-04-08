package com.isppG8.infantem.infantem.disease;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.media.Content;
import io.swagger.v3.oas.annotations.media.Schema;
import io.swagger.v3.oas.annotations.responses.ApiResponse;
import io.swagger.v3.oas.annotations.tags.Tag;
import jakarta.validation.Valid;

@Tag(name = "Disease", description = "Gestión de las enfermedades")
@RestController
@RequestMapping("api/v1/disease")
public class DiseaseController {

    private final DiseaseService diseaseService;

    @Autowired
    public DiseaseController(DiseaseService service) {
        this.diseaseService = service;
    }

    @Operation(summary = "Obtener todas las enfermedades",
            description = "Devuelve la lista de todas las enfermedades registradas.") @ApiResponse(responseCode = "200",
                    description = "Lista de enfermedades obtenida exitosamente",
                    content = @Content(schema = @Schema(implementation = Disease.class))) @GetMapping
    public List<Disease> getAll() {
        return diseaseService.getAll();
    }

    @Operation(summary = "Obtener enfermedad por ID",
            description = "Devuelve la enfermedad con el ID especificado.") @ApiResponse(responseCode = "200",
                    description = "Enfermedad encontrada",
                    content = @Content(schema = @Schema(implementation = Disease.class))) @ApiResponse(
                            responseCode = "404", description = "Enfermedad no encontrada") @GetMapping("/{id}")
    public Disease getById(@PathVariable Long id) {
        return diseaseService.getById(id);
    }

    @Operation(summary = "Crear nueva enfermedad",
            description = "Registra una nueva enfermedad en el sistema.") @ApiResponse(responseCode = "200",
                    description = "Enfermedad creada exitosamente",
                    content = @Content(schema = @Schema(implementation = Disease.class))) @PostMapping
    public ResponseEntity<Disease> create(@RequestBody Disease disease) {
        return ResponseEntity.ok(diseaseService.save(disease));
    }

    @Operation(summary = "Actualizar enfermedad",
            description = "Actualiza los datos de una enfermedad existente.") @ApiResponse(responseCode = "200",
                    description = "Enfermedad actualizada exitosamente",
                    content = @Content(schema = @Schema(implementation = Disease.class))) @ApiResponse(
                            responseCode = "404", description = "Enfermedad no encontrada") @PutMapping("/{id}")
    public ResponseEntity<Disease> update(@PathVariable Long id, @Valid @RequestBody Disease disease) {
        return ResponseEntity.ok(diseaseService.update(id, disease));
    }

    @Operation(summary = "Eliminar enfermedad",
            description = "Elimina una enfermedad registrada del sistema.") @ApiResponse(responseCode = "204",
                    description = "Enfermedad eliminada exitosamente") @ApiResponse(responseCode = "404",
                            description = "Enfermedad no encontrada") @DeleteMapping("/{id}")
    public ResponseEntity<Void> delete(@PathVariable Long id) {
        diseaseService.delete(id);
        return ResponseEntity.noContent().build();
    }
}
