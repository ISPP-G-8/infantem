package com.isppG8.infantem.infantem.metric;

import java.util.List;
import jakarta.validation.Valid;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
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

@Tag(name = "MetricsAdmin", description = "Gestión de métricas relacionadas con el bebé admin")
@RestController
@RequestMapping("/api/v1/admin/metrics")
public class MetricControllerAdmin {

    private final MetricService metricService;

    private final AuthoritiesService authoritiesService;

    @Autowired
    public MetricControllerAdmin(MetricService metricService, AuthoritiesService authoritiesService) {
        this.metricService = metricService;
        this.authoritiesService = authoritiesService;
    }

    @Operation(summary = "Crear una nueva métrica", description = "Crea una nueva métrica para un bebé.") @ApiResponse(
            responseCode = "201", description = "Métrica creada con éxito",
            content = @Content(mediaType = "application/json",
                    schema = @Schema(implementation = Metric.class))) @PostMapping
    public ResponseEntity<Metric> createMetric(@RequestBody Metric metric) {
        if (authoritiesService.isAdmin()) {
            Metric createdMetric = metricService.createMetric(metric);
            return new ResponseEntity<>(createdMetric, HttpStatus.CREATED);
        }
        return null;
    }

    @Operation(summary = "Obtener métrica por ID",
            description = "Recupera la métrica especificada por su ID.") @ApiResponse(responseCode = "200",
                    description = "Métrica encontrada",
                    content = @Content(mediaType = "application/json",
                            schema = @Schema(implementation = Metric.class))) @ApiResponse(responseCode = "404",
                                    description = "Métrica no encontrada") @GetMapping("/{id}")
    public ResponseEntity<Metric> getMetricById(@PathVariable Long id) {
        if (authoritiesService.isAdmin()) {
            Metric metric = metricService.getMetricById(id);
            return ResponseEntity.ok(metric);
        }
        return null;
    }

    @Operation(summary = "Obtener todas las métricas por ID de bebé",
            description = "Recupera todas las métricas asociadas a un bebé específico por su ID.") @ApiResponse(
                    responseCode = "200", description = "Lista de métricas encontrada",
                    content = @Content(mediaType = "application/json",
                            schema = @Schema(implementation = Metric.class))) @ApiResponse(responseCode = "404",
                                    description = "Bebé no encontrado") @GetMapping("/baby/{babyId}")
    public ResponseEntity<List<Metric>> getAllMetricsByBabyId(@PathVariable Integer babyId) {
        if (authoritiesService.isAdmin()) {
            List<Metric> metrics = metricService.getAllMetricsByBabyId(babyId);
            return ResponseEntity.ok(metrics);
        }
        return null;
    }

    @Operation(summary = "Actualizar una métrica",
            description = "Actualiza los detalles de una métrica existente.") @ApiResponse(responseCode = "200",
                    description = "Métrica actualizada con éxito",
                    content = @Content(mediaType = "application/json",
                            schema = @Schema(implementation = Metric.class))) @ApiResponse(responseCode = "404",
                                    description = "Métrica no encontrada") @PutMapping("/{id}")
    public ResponseEntity<Metric> updateMetric(@PathVariable Long id, @RequestBody @Valid Metric metric) {
        if (authoritiesService.isAdmin()) {
            Metric updatedMetric = metricService.updateMetric(id, metric);
            return ResponseEntity.ok(updatedMetric);
        }
        return null;
    }

    @Operation(summary = "Eliminar una métrica", description = "Elimina una métrica del sistema.") @ApiResponse(
            responseCode = "204", description = "Métrica eliminada con éxito") @ApiResponse(responseCode = "404",
                    description = "Métrica no encontrada") @DeleteMapping("/{id}")
    public ResponseEntity<Void> deleteMetric(@PathVariable Long id) {
        if (authoritiesService.isAdmin()) {
            metricService.deleteMetric(id);
            return ResponseEntity.noContent().build();
        }
        return null;
    }
}
