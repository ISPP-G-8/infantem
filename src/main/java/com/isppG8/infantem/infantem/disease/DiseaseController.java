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
    public List<Disease> getAll() {
        return diseaseService.getAll();
    }

    @GetMapping("/{id}")
    public Disease getById(@PathVariable Long id) {
        return diseaseService.getById(id);
    }

    @PostMapping
    public ResponseEntity<Disease> create(@RequestBody Disease disease) {
        return ResponseEntity.ok(diseaseService.save(disease));
    }

    @PutMapping("/{id}")
    public ResponseEntity<Disease> update(@PathVariable Long id, @Valid @RequestBody Disease disease) {
        return ResponseEntity.ok(diseaseService.update(id, disease));
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Void> delete(@PathVariable Long id) {
        diseaseService.delete(id);
        return ResponseEntity.noContent().build();
    }
}
