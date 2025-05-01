package com.isppG8.infantem.infantem.intake;

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

import com.isppG8.infantem.infantem.intake.dto.IntakeDTO;
import com.isppG8.infantem.infantem.auth.AuthoritiesService;

import jakarta.validation.Valid;

@Tag(name = "IntakesAdmin", description = "Gestión de registros de ingesta admin")
@RestController
@RequestMapping("api/v1/admin/intake")
public class IntakeControllerAdmin {

    private IntakeService intakeService;

    private AuthoritiesService authoritiesService;

    @Autowired
    public IntakeControllerAdmin(IntakeService intakeService, AuthoritiesService authoritiesService) {
        this.intakeService = intakeService;
        this.authoritiesService = authoritiesService;
    }

    @Operation(summary = "Obtener todos los registros de ingesta",
            description = "Recupera la lista de todos los registros de ingesta disponibles.") @ApiResponse(
                    responseCode = "200", description = "Lista de registros de ingesta",
                    content = @Content(mediaType = "application/json",
                            schema = @Schema(implementation = IntakeDTO.class))) @GetMapping
    public ResponseEntity<List<IntakeDTO>> getAllIntakes() {
        if (authoritiesService.isAdmin()) {
            List<IntakeDTO> intakes = this.intakeService.getAllIntakesAdmin().stream().map(IntakeDTO::new).toList();
            return ResponseEntity.ok(intakes);
        }
        return null;
    }

    @Operation(summary = "Obtener un registro de ingesta por ID",
            description = "Recupera un registro de ingesta específico mediante su ID.") @ApiResponse(
                    responseCode = "200", description = "Registro de ingesta encontrado",
                    content = @Content(mediaType = "application/json",
                            schema = @Schema(implementation = IntakeDTO.class))) @ApiResponse(responseCode = "404",
                                    description = "Registro de ingesta no encontrado") @GetMapping("/{id}")
    public ResponseEntity<IntakeDTO> getIntakeById(@PathVariable Long id) {
        if (authoritiesService.isAdmin()) {
            return ResponseEntity.ok(new IntakeDTO(this.intakeService.getIntakeByIdAdmin(id)));
        }
        return null;
    }

    @Operation(summary = "Crear un nuevo registro de ingesta",
            description = "Crea un nuevo registro de ingesta en el sistema.") @ApiResponse(responseCode = "200",
                    description = "Registro de ingesta creado", content = @Content(mediaType = "application/json",
                            schema = @Schema(implementation = IntakeDTO.class))) @PostMapping
    public ResponseEntity<IntakeDTO> createIntake(@Valid @RequestBody Intake intake) {
        if (authoritiesService.isAdmin()) {
            return ResponseEntity.ok(new IntakeDTO(this.intakeService.saveIntakeAdmin(intake)));
        }
        return null;
    }

    @Operation(summary = "Actualizar un registro de ingesta",
            description = "Actualiza un registro de ingesta existente.") @ApiResponse(responseCode = "200",
                    description = "Registro de ingesta actualizado",
                    content = @Content(mediaType = "application/json",
                            schema = @Schema(implementation = IntakeDTO.class))) @ApiResponse(responseCode = "404",
                                    description = "Registro de ingesta no encontrado") @PutMapping("/{id}")
    public ResponseEntity<IntakeDTO> updateIntake(@PathVariable Long id, @Valid @RequestBody Intake intake) {
        if (authoritiesService.isAdmin()) {
            return ResponseEntity.ok(new IntakeDTO(this.intakeService.updateIntakeAdmin(id, intake)));
        }
        return null;
    }

    @Operation(summary = "Eliminar un registro de ingesta",
            description = "Elimina un registro de ingesta mediante su ID.") @ApiResponse(responseCode = "204",
                    description = "Registro de ingesta eliminado") @ApiResponse(responseCode = "404",
                            description = "Registro de ingesta no encontrado") @DeleteMapping("/{id}")
    public ResponseEntity<Void> deleteIntake(@PathVariable Long id) {
        if (authoritiesService.isAdmin()) {
            this.intakeService.deleteIntakeAdmin(id);
            return ResponseEntity.noContent().build();
        }
        return null;
    }

}
