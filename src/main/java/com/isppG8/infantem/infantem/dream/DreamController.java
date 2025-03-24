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

import jakarta.validation.Valid;

@RestController
@RequestMapping("api/v1/dream")
public class DreamController {

    private DreamService dreamService;

    @Autowired
    public DreamController(DreamService dreamService) {
        this.dreamService = dreamService;
    }

    @GetMapping
    public List<DreamDTO> getAllDreams() {
        return dreamService.getAllDreams().stream().map(DreamDTO::new).toList();
    }

    @GetMapping("/{id}")
    public ResponseEntity<DreamDTO> getDreamById(@PathVariable Long id) {
        Dream dream = dreamService.getDreamById(id);
        return ResponseEntity.ok(new DreamDTO(dream));
    }

    @PostMapping
    public ResponseEntity<DreamDTO> createDream(@Valid @RequestBody Dream dream) {
        Dream createdDream = dreamService.createDream(dream);
        return ResponseEntity.status(201).body(new DreamDTO(createdDream));
    }

    @PutMapping("/{id}")
    public ResponseEntity<DreamDTO> updateDream(@PathVariable Long id, @Valid @RequestBody Dream dreamDetails) {
        Dream updatedDream = dreamService.updateDream(id, dreamDetails);
        return ResponseEntity.ok(new DreamDTO(updatedDream));
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Void> deleteDream(@PathVariable Long id) {
        dreamService.deleteDream(id);
        return ResponseEntity.noContent().build();
    }
}
