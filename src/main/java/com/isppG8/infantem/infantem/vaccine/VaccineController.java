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

import jakarta.validation.Valid;

@RestController
@RequestMapping("api/v1/vaccines")
public class VaccineController {

    private final VaccineService service;

    @Autowired
    public VaccineController(VaccineService service) {
        this.service = service;
    }

    @GetMapping
    public ResponseEntity<List<VaccineDTO>> getAll() {
        return ResponseEntity.ok(this.service.getAll().stream().map(VaccineDTO::new).toList());
    }

    @GetMapping("/{id}")
    public ResponseEntity<VaccineDTO> getById(@PathVariable Long id) {
        return ResponseEntity.ok(new VaccineDTO(this.service.getById(id)));
    }

    @PostMapping
    public ResponseEntity<VaccineDTO> create(@Valid @RequestBody Vaccine vaccine) {
        return ResponseEntity.status(201).body(new VaccineDTO(this.service.save(vaccine)));
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Void> delete(@PathVariable Long id) {
        this.service.delete(id);
        return ResponseEntity.noContent().build();
    }
}
