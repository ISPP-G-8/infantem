package com.isppG8.infantem.infantem.milestoneCompleted;

import java.util.List;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.media.Content;
import io.swagger.v3.oas.annotations.media.Schema;
import io.swagger.v3.oas.annotations.responses.ApiResponse;
import io.swagger.v3.oas.annotations.tags.Tag;

@Tag(name = "Milestones Completed", description = "Gestión de hitos completados del bebé")
@RestController
@RequestMapping("api/v1/milestonesCompleted")
public class MilestoneCompletedController {

    @Autowired
    private MilestoneCompletedService milestoneCompletedService;

    @Operation(summary = "Obtener todos los hitos completados",
            description = "Recupera todos los hitos completados por el bebé.") @ApiResponse(responseCode = "200",
                    description = "Lista de hitos completados encontrada",
                    content = @Content(mediaType = "application/json",
                            schema = @Schema(implementation = MilestoneCompleted.class))) @GetMapping
    public List<MilestoneCompleted> getAllMilestonesCompleted() {
        return milestoneCompletedService.getAllMilestonesCompleted();
    }

    @Operation(summary = "Obtener hitos completados por hito ID",
            description = "Recupera los hitos completados asociados a un hito específico.") @ApiResponse(
                    responseCode = "200", description = "Lista de hitos completados encontrados",
                    content = @Content(mediaType = "application/json", schema = @Schema(
                            implementation = MilestoneCompleted.class))) @GetMapping("/milestone/{milestoneId}")
    public List<MilestoneCompleted> getMilestonesCompletedByMilestoneId(@PathVariable Long milestoneId) {
        return milestoneCompletedService.getMilestonesCompletedByMilestoneId(milestoneId);
    }

    @Operation(summary = "Crear un nuevo hito completado",
            description = "Crea un nuevo hito completado para el bebé.") @ApiResponse(responseCode = "201",
                    description = "Hito completado creado con éxito", content = @Content(mediaType = "application/json",
                            schema = @Schema(implementation = MilestoneCompleted.class))) @PostMapping
    public MilestoneCompleted createMilestoneCompleted(@RequestBody MilestoneCompleted milestoneCompleted) {
        return milestoneCompletedService.createMilestoneCompleted(milestoneCompleted);
    }

    @Operation(summary = "Eliminar un hito completado",
            description = "Elimina un hito completado específico por su ID.") @ApiResponse(responseCode = "204",
                    description = "Hito completado eliminado con éxito") @ApiResponse(responseCode = "404",
                            description = "Hito completado no encontrado") @DeleteMapping("/{id}")
    public ResponseEntity<Void> deleteMilestoneCompleted(@PathVariable Long id) {
        milestoneCompletedService.deleteMilestoneCompleted(id);
        return ResponseEntity.noContent().build();
    }
}
