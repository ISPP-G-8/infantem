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

import com.isppG8.infantem.infantem.disease.dto.DiseaseDTO;

import jakarta.validation.Valid;

@RestController
@RequestMapping("api/v1/disease")
public class DiseaseController {

    private final DiseaseService diseaseService;

    @Autowired
    public DiseaseController(DiseaseService service) {
        this.diseaseService = service;
    }

    @GetMapping
    public ResponseEntity<List<DiseaseDTO>> getAll() {
        return ResponseEntity.ok(diseaseService.getAll().stream().map(DiseaseDTO::new).toList());
    }

    @GetMapping("/{id}")
    public ResponseEntity<DiseaseDTO> getById(@PathVariable Long id) {
        return ResponseEntity.ok(new DiseaseDTO(diseaseService.getById(id)));
    }

    @PostMapping
    public ResponseEntity<DiseaseDTO> create(@RequestBody Disease disease) {
        return ResponseEntity.ok(new DiseaseDTO(diseaseService.save(disease)));
    }

    @PutMapping("/{id}")
    public ResponseEntity<DiseaseDTO> update(@PathVariable Long id, @Valid @RequestBody Disease disease) {
        return ResponseEntity.ok(new DiseaseDTO(diseaseService.update(id, disease)));
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Void> delete(@PathVariable Long id) {
        diseaseService.delete(id);
        return ResponseEntity.noContent().build();
    }
}
