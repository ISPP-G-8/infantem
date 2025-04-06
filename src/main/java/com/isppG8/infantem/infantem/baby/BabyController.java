package com.isppG8.infantem.infantem.baby;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.ResponseStatus;
import org.springframework.web.bind.annotation.RestController;

import com.isppG8.infantem.infantem.baby.dto.BabyDTO;

import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.responses.ApiResponse;
import io.swagger.v3.oas.annotations.responses.ApiResponses;
import io.swagger.v3.oas.annotations.tags.Tag;
import jakarta.validation.Valid;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;

@Tag(name = "Baby", description = "Gestión de bebés")
@RestController
@RequestMapping("/api/v1/baby")
public class BabyController {

    private final BabyService babyService;

    @Autowired
    public BabyController(BabyService babyService) {
        this.babyService = babyService;
    }

    @Operation(summary = "Obtener lista de bebés",
            description = "Devuelve la lista de bebés asociados al usuario autenticado") @ApiResponses({
                    @ApiResponse(responseCode = "200", description = "Lista de bebés encontrada"),
                    @ApiResponse(responseCode = "204", description = "No hay bebés registrados") }) @GetMapping
    public ResponseEntity<List<BabyDTO>> findBabiesByUser() {
        List<BabyDTO> babies = babyService.findBabiesByUser().stream().map(baby -> new BabyDTO(baby)).toList();

        if (babies.isEmpty()) {
            return ResponseEntity.noContent().build();
        }

        return ResponseEntity.ok(babies);
    }

    @Operation(summary = "Obtener bebé por ID",
            description = "Devuelve los detalles de un bebé según su ID") @ApiResponses({
                    @ApiResponse(responseCode = "200", description = "Bebé encontrado"),
                    @ApiResponse(responseCode = "404", description = "Bebé no encontrado") }) @GetMapping("/{id}")
    public ResponseEntity<BabyDTO> findById(@PathVariable Integer id) {
        Baby baby = babyService.findById(id);
        return ResponseEntity.ok().body(new BabyDTO(baby));
    }

    @Operation(summary = "Crear un nuevo bebé", description = "Registra un nuevo bebé en el sistema") @ApiResponses({
            @ApiResponse(responseCode = "201", description = "Bebé creado con éxito"),
            @ApiResponse(responseCode = "400",
                    description = "Datos inválidos para la creación") }) @PostMapping @ResponseStatus(HttpStatus.CREATED)
    public ResponseEntity<BabyDTO> createBaby(@RequestBody @Valid BabyDTO babyDTO) {
        Baby createdBaby = babyService.createBaby(babyDTO);
        return ResponseEntity.status(201).body(new BabyDTO(createdBaby));
    }

    @Operation(summary = "Actualizar información de un bebé",
            description = "Modifica los datos de un bebé según su ID") @ApiResponses({
                    @ApiResponse(responseCode = "200", description = "Bebé actualizado con éxito"),
                    @ApiResponse(responseCode = "404", description = "Bebé no encontrado"),
                    @ApiResponse(responseCode = "400",
                            description = "Datos inválidos para la actualización") }) @PutMapping("/{id}")
    public ResponseEntity<BabyDTO> updateBaby(@PathVariable("id") Integer id, @RequestBody @Valid BabyDTO baby) {
        Baby updatedBaby = babyService.updateBaby(id, baby);
        return ResponseEntity.ok(new BabyDTO(updatedBaby));
    }

    @Operation(summary = "Eliminar un bebé",
            description = "Elimina un bebé del sistema según su ID") @ApiResponses({
                    @ApiResponse(responseCode = "204", description = "Bebé eliminado con éxito"),
                    @ApiResponse(responseCode = "404", description = "Bebé no encontrado") }) @DeleteMapping("/{id}")
    public ResponseEntity<Void> deleteBaby(@PathVariable("id") Integer id) {
        this.babyService.deleteBaby(id);
        return ResponseEntity.noContent().build();
    }
}
