package com.isppG8.infantem.infantem.vaccine;

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

import com.isppG8.infantem.infantem.vaccine.dto.VaccineDTO;
import com.isppG8.infantem.infantem.auth.AuthoritiesService;

import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.media.Content;
import io.swagger.v3.oas.annotations.media.Schema;
import io.swagger.v3.oas.annotations.responses.ApiResponse;
import io.swagger.v3.oas.annotations.tags.Tag;
import jakarta.validation.Valid;

@Tag(name = "VaccinesAdmin", description = "Gestión de vacunas admin")
@RestController
@RequestMapping("api/v1/admin/vaccines")
public class VaccineControllerAdmin {

    private final VaccineService service;

    private final AuthoritiesService authoritiesService;

    @Autowired
    public VaccineControllerAdmin(VaccineService service, AuthoritiesService authoritiesService) {
        this.service = service;
        this.authoritiesService = authoritiesService;
    }

    @Operation(summary = "Obtener todas las vacunas",
            description = "Recupera la lista de todas las vacunas.") @ApiResponse(responseCode = "200",
                    description = "Lista de vacunas obtenida exitosamente",
                    content = @Content(mediaType = "application/json",
                            schema = @Schema(implementation = VaccineDTO.class))) @GetMapping
    public ResponseEntity<List<VaccineDTO>> getAll() {
        if (authoritiesService.isAdmin()) {
            return ResponseEntity.ok(this.service.getAll().stream().map(VaccineDTO::new).toList());
        }
        return null;
    }

    @Operation(summary = "Obtener una vacuna por su ID",
            description = "Recupera los detalles de una vacuna por su ID.") @ApiResponse(responseCode = "200",
                    description = "Vacuna encontrada",
                    content = @Content(mediaType = "application/json",
                            schema = @Schema(implementation = VaccineDTO.class))) @ApiResponse(responseCode = "404",
                                    description = "Vacuna no encontrada") @GetMapping("/{id}")
    public ResponseEntity<VaccineDTO> getById(@PathVariable Long id) {
        if (authoritiesService.isAdmin()) {
            return ResponseEntity.ok(new VaccineDTO(this.service.getById(id)));
        }
        return null;
    }

    @Operation(summary = "Crear una nueva vacuna", description = "Crea una nueva vacuna.") @ApiResponse(
            responseCode = "201", description = "Vacuna creada con éxito",
            content = @Content(mediaType = "application/json",
                    schema = @Schema(implementation = VaccineDTO.class))) @PostMapping
    public ResponseEntity<VaccineDTO> create(@Valid @RequestBody Vaccine vaccine) {
        if (authoritiesService.isAdmin()) {
            return ResponseEntity.status(201).body(new VaccineDTO(this.service.save(vaccine)));
        }
        return null;
    }

    @Operation(summary = "Eliminar una vacuna por su ID", description = "Elimina una vacuna por su ID.") @ApiResponse(
            responseCode = "204", description = "Vacuna eliminada con éxito") @ApiResponse(responseCode = "404",
                    description = "Vacuna no encontrada") @DeleteMapping("/{id}")
    public ResponseEntity<Void> delete(@PathVariable Long id) {
        if (authoritiesService.isAdmin()) {
            this.service.delete(id);
            return ResponseEntity.noContent().build();
        }
        return null;
    }
}
