package com.isppG8.infantem.infantem.milestone;

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

import java.util.List;
import java.util.Optional;

@Tag(name = "Milestones", description = "Gestión de hitos del bebé")
@RestController
@RequestMapping("api/v1/milestones")
public class MilestoneController {

    @Autowired
    private MilestoneService milestoneService;

    @Operation(summary = "Obtener todos los hitos", description = "Recupera todos los hitos del bebé.") @ApiResponse(
            responseCode = "200", description = "Lista de hitos encontrada",
            content = @Content(mediaType = "application/json",
                    schema = @Schema(implementation = Milestone.class))) @GetMapping
    public List<Milestone> getAllMilestones() {
        return milestoneService.getAllMilestones();
    }

    @Operation(summary = "Obtener un hito por ID", description = "Recupera un hito específico por su ID.") @ApiResponse(
            responseCode = "200", description = "Hito encontrado",
            content = @Content(mediaType = "application/json",
                    schema = @Schema(implementation = Milestone.class))) @ApiResponse(responseCode = "404",
                            description = "Hito no encontrado") @GetMapping("/{id}")
    public ResponseEntity<Milestone> getMilestoneById(@PathVariable Long id) {
        Optional<Milestone> milestone = milestoneService.getMilestoneById(id);
        return milestone.map(ResponseEntity::ok).orElseGet(() -> ResponseEntity.notFound().build());
    }

    @Operation(summary = "Crear un nuevo hito", description = "Crea un nuevo hito para el bebé.") @ApiResponse(
            responseCode = "201", description = "Hito creado con éxito",
            content = @Content(mediaType = "application/json",
                    schema = @Schema(implementation = Milestone.class))) @PostMapping
    public Milestone createMilestone(@RequestBody Milestone milestone) {
        return milestoneService.createMilestone(milestone);
    }

    @Operation(summary = "Actualizar un hito", description = "Actualiza un hito existente por su ID.") @ApiResponse(
            responseCode = "200", description = "Hito actualizado con éxito",
            content = @Content(mediaType = "application/json",
                    schema = @Schema(implementation = Milestone.class))) @ApiResponse(responseCode = "404",
                            description = "Hito no encontrado") @PutMapping("/{id}")
    public ResponseEntity<Milestone> updateMilestone(@PathVariable Long id, @RequestBody Milestone milestoneDetails) {
        Optional<Milestone> updatedMilestone = milestoneService.updateMilestone(id, milestoneDetails);
        return updatedMilestone.map(ResponseEntity::ok).orElseGet(() -> ResponseEntity.notFound().build());
    }

    @Operation(summary = "Eliminar un hito", description = "Elimina un hito específico por su ID.") @ApiResponse(
            responseCode = "204", description = "Hito eliminado con éxito") @ApiResponse(responseCode = "404",
                    description = "Hito no encontrado") @DeleteMapping("/{id}")
    public ResponseEntity<Void> deleteMilestone(@PathVariable Long id) {
        return milestoneService.deleteMilestone(id) ? ResponseEntity.noContent().build()
                : ResponseEntity.notFound().build();
    }
}
