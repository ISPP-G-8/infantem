package com.isppG8.infantem.infantem.dream;

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

import com.isppG8.infantem.infantem.dream.dto.DreamDTO;
import com.isppG8.infantem.infantem.auth.AuthoritiesService;

import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.media.Content;
import io.swagger.v3.oas.annotations.media.Schema;
import io.swagger.v3.oas.annotations.responses.ApiResponse;
import io.swagger.v3.oas.annotations.tags.Tag;
import jakarta.validation.Valid;

@Tag(name = "DreamAdmin", description = "Gestión de los sueños admin")
@RestController
@RequestMapping("api/v1/admin/dream")
public class DreamControllerAdmin {

    private DreamService dreamService;

    private AuthoritiesService authoritiesService;

    @Autowired
    public DreamControllerAdmin(DreamService dreamService, AuthoritiesService authoritiesService) {
        this.dreamService = dreamService;
        this.authoritiesService = authoritiesService;

    }

    @Operation(summary = "Obtener todos los sueños",
            description = "Devuelve la lista de todos los sueños registrados.") @ApiResponse(responseCode = "200",
                    description = "Lista de sueños obtenida exitosamente",
                    content = @Content(schema = @Schema(implementation = DreamDTO.class))) @GetMapping
    public List<DreamDTO> getAllDreams() {
        if (authoritiesService.isAdmin()) {
            return dreamService.getAllDreams().stream().map(DreamDTO::new).toList();
        }
        return null;
    }

    @Operation(summary = "Obtener sueño por ID",
            description = "Devuelve el sueño con el ID especificado.") @ApiResponse(responseCode = "200",
                    description = "Sueño encontrado",
                    content = @Content(schema = @Schema(implementation = DreamDTO.class))) @ApiResponse(
                            responseCode = "404", description = "Sueño no encontrado") @GetMapping("/{id}")
    public ResponseEntity<DreamDTO> getDreamById(@PathVariable Long id) {
        if (authoritiesService.isAdmin()) {
            Dream dream = dreamService.getDreamById(id);
            return ResponseEntity.ok(new DreamDTO(dream));
        }
        return null;
    }

    @Operation(summary = "Crear nuevo sueño", description = "Registra un nuevo sueño en el sistema.") @ApiResponse(
            responseCode = "201", description = "Sueño creado exitosamente",
            content = @Content(schema = @Schema(implementation = DreamDTO.class))) @PostMapping
    public ResponseEntity<DreamDTO> createDream(@Valid @RequestBody Dream dream) {
        if (authoritiesService.isAdmin()) {
            Dream createdDream = dreamService.createDreamAdmin(dream);
            return ResponseEntity.status(201).body(new DreamDTO(createdDream));
        }
        return null;
    }

    @Operation(summary = "Actualizar sueño", description = "Actualiza los datos de un sueño existente.") @ApiResponse(
            responseCode = "200", description = "Sueño actualizado exitosamente",
            content = @Content(schema = @Schema(implementation = DreamDTO.class))) @ApiResponse(responseCode = "404",
                    description = "Sueño no encontrado") @PutMapping("/{id}")
    public ResponseEntity<DreamDTO> updateDream(@PathVariable Long id, @Valid @RequestBody Dream dreamDetails) {
        if (authoritiesService.isAdmin()) {
            Dream updatedDream = dreamService.updateDreamAdmin(id, dreamDetails);
            return ResponseEntity.ok(new DreamDTO(updatedDream));
        }
        return null;
    }

    @Operation(summary = "Eliminar sueño", description = "Elimina un sueño registrado del sistema.") @ApiResponse(
            responseCode = "204", description = "Sueño eliminado exitosamente") @ApiResponse(responseCode = "404",
                    description = "Sueño no encontrado") @DeleteMapping("/{id}")
    public ResponseEntity<Void> deleteDream(@PathVariable Long id) {
        if (authoritiesService.isAdmin()) {
            dreamService.deleteDream(id);
            return ResponseEntity.noContent().build();
        }
        return null;
    }
}
