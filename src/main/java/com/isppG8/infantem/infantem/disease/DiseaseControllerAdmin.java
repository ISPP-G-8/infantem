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
import com.isppG8.infantem.infantem.auth.AuthoritiesService;

import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.media.Content;
import io.swagger.v3.oas.annotations.media.Schema;
import io.swagger.v3.oas.annotations.responses.ApiResponse;
import io.swagger.v3.oas.annotations.tags.Tag;
import jakarta.validation.Valid;

@Tag(name = "DiseaseAdmin", description = "Gestión de las enfermedades admin")
@RestController
@RequestMapping("api/v1/admin/disease")
public class DiseaseControllerAdmin {

    private final DiseaseService diseaseService;

    private final AuthoritiesService authoritiesService;

    @Autowired
    public DiseaseControllerAdmin(DiseaseService service, AuthoritiesService authoritiesService) {
        this.diseaseService = service;
        this.authoritiesService = authoritiesService;
    }

    @Operation(summary = "Obtener todas las enfermedades",
            description = "Devuelve la lista de todas las enfermedades registradas.") @ApiResponse(responseCode = "200",
                    description = "Lista de enfermedades obtenida exitosamente",
                    content = @Content(schema = @Schema(implementation = Disease.class))) @GetMapping
    public List<Disease> getAll() {
        if (authoritiesService.isAdmin()) {
            return diseaseService.getAll();
        }
        return null;
    }

    @Operation(summary = "Obtener enfermedad por ID",
            description = "Devuelve la enfermedad con el ID especificado.") @ApiResponse(responseCode = "200",
                    description = "Enfermedad encontrada",
                    content = @Content(schema = @Schema(implementation = Disease.class))) @ApiResponse(
                            responseCode = "404", description = "Enfermedad no encontrada") @GetMapping("/{id}")
    public Disease getById(@PathVariable Long id) {
        if (authoritiesService.isAdmin()) {
            return diseaseService.getById(id);
        }
        return null;
    }

    @Operation(summary = "Crear nueva enfermedad",
            description = "Registra una nueva enfermedad en el sistema.") @ApiResponse(responseCode = "200",
                    description = "Enfermedad creada exitosamente",
                    content = @Content(schema = @Schema(implementation = Disease.class))) @PostMapping
    public ResponseEntity<Disease> create(@RequestBody Disease disease) {
        if (authoritiesService.isAdmin()) {
            return ResponseEntity.ok(diseaseService.save(disease));
        }
        return null;
    }

    @Operation(summary = "Actualizar enfermedad",
            description = "Actualiza los datos de una enfermedad existente.") @ApiResponse(responseCode = "200",
                    description = "Enfermedad actualizada exitosamente",
                    content = @Content(schema = @Schema(implementation = Disease.class))) @ApiResponse(
                            responseCode = "404", description = "Enfermedad no encontrada") @PutMapping("/{id}")
    public ResponseEntity<Disease> update(@PathVariable Long id, @Valid @RequestBody Disease disease) {
        if (authoritiesService.isAdmin()) {
            return ResponseEntity.ok(diseaseService.updateAdmin(id, disease));
        }
        return null;
    }

    @Operation(summary = "Eliminar enfermedad",
            description = "Elimina una enfermedad registrada del sistema.") @ApiResponse(responseCode = "204",
                    description = "Enfermedad eliminada exitosamente") @ApiResponse(responseCode = "404",
                            description = "Enfermedad no encontrada") @DeleteMapping("/{id}")
    public ResponseEntity<Void> delete(@PathVariable Long id) {
        if (authoritiesService.isAdmin()) {
            diseaseService.delete(id);
            return ResponseEntity.noContent().build();
        }
        return null;
    }
}
