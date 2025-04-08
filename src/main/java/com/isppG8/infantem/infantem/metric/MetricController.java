package com.isppG8.infantem.infantem.metric;

import java.util.List;

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

import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.media.Content;
import io.swagger.v3.oas.annotations.media.Schema;
import io.swagger.v3.oas.annotations.responses.ApiResponse;
import io.swagger.v3.oas.annotations.tags.Tag;

@Tag(name = "Metrics", description = "Gestión de métricas relacionadas con el bebé")
@RestController
@RequestMapping("/api/v1/metrics")
public class MetricController {

    private final MetricService metricService;

    @Autowired
    public MetricController(MetricService metricService) {
        this.metricService = metricService;
    }

    @Operation(summary = "Crear una nueva métrica", description = "Crea una nueva métrica para un bebé.") @ApiResponse(
            responseCode = "201", description = "Métrica creada con éxito",
            content = @Content(mediaType = "application/json",
                    schema = @Schema(implementation = Metric.class))) @PostMapping
    public ResponseEntity<Metric> createMetric(@RequestBody Metric metric) {
        Metric createdMetric = metricService.createMetric(metric);
        return new ResponseEntity<>(createdMetric, HttpStatus.CREATED);
    }

    @Operation(summary = "Obtener métrica por ID",
            description = "Recupera la métrica especificada por su ID.") @ApiResponse(responseCode = "200",
                    description = "Métrica encontrada",
                    content = @Content(mediaType = "application/json",
                            schema = @Schema(implementation = Metric.class))) @ApiResponse(responseCode = "404",
                                    description = "Métrica no encontrada") @GetMapping("/{id}")
    public ResponseEntity<Metric> getMetricById(@PathVariable Long id) {
        Metric metric = metricService.getMetricById(id);
        return ResponseEntity.ok(metric);
    }

    @Operation(summary = "Obtener todas las métricas por ID de bebé",
            description = "Recupera todas las métricas asociadas a un bebé específico por su ID.") @ApiResponse(
                    responseCode = "200", description = "Lista de métricas encontrada",
                    content = @Content(mediaType = "application/json",
                            schema = @Schema(implementation = Metric.class))) @ApiResponse(responseCode = "404",
                                    description = "Bebé no encontrado") @GetMapping("/baby/{babyId}")
    public ResponseEntity<List<Metric>> getAllMetricsByBabyId(@PathVariable Integer babyId) {
        List<Metric> metrics = metricService.getAllMetricsByBabyId(babyId);
        return ResponseEntity.ok(metrics);
    }

    @Operation(summary = "Actualizar una métrica",
            description = "Actualiza los detalles de una métrica existente.") @ApiResponse(responseCode = "200",
                    description = "Métrica actualizada con éxito",
                    content = @Content(mediaType = "application/json",
                            schema = @Schema(implementation = Metric.class))) @ApiResponse(responseCode = "404",
                                    description = "Métrica no encontrada") @PutMapping("/{id}")
    public ResponseEntity<Metric> updateMetric(@PathVariable Long id, @RequestBody Metric metric) {
        Metric updatedMetric = metricService.updateMetric(id, metric);
        return ResponseEntity.ok(updatedMetric);
    }

    @Operation(summary = "Eliminar una métrica", description = "Elimina una métrica del sistema.") @ApiResponse(
            responseCode = "204", description = "Métrica eliminada con éxito") @ApiResponse(responseCode = "404",
                    description = "Métrica no encontrada") @DeleteMapping("/{id}")
    public ResponseEntity<Void> deleteMetric(@PathVariable Long id) {
        metricService.deleteMetric(id);
        return ResponseEntity.noContent().build();
    }
}
