package com.isppG8.infantem.infantem.dream;

import java.util.List;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("api/v1/dream")
public class DreamController {
    
    @Autowired
    private DreamService dreamService;

    @GetMapping
    public List<Dream> getAllDreams() {
        return dreamService.getAllDreams();
    }

    @GetMapping("/{id}")
    public ResponseEntity<Dream> getDreamById(@PathVariable Long id) {
        Optional<Dream> dream = dreamService.getDreamById(id);
        return dream.map(ResponseEntity::ok).orElseGet(() -> ResponseEntity.notFound().build());
    }

    @PostMapping
    public Dream createDream(@RequestBody Dream dream) {
        return dreamService.createDream(dream);
    }

    @PutMapping("/{id}")
    public ResponseEntity<Dream> updateDream(@PathVariable Long id, @RequestBody Dream dreamDetails) {
        Optional<Dream> updatedDream = dreamService.updateDream(id, dreamDetails);
        return updatedDream.map(ResponseEntity::ok).orElseGet(() -> ResponseEntity.notFound().build());
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Void> deleteDream(@PathVariable Long id) {
        boolean deleted = dreamService.deleteDream(id);
        return deleted ? ResponseEntity.noContent().build() : ResponseEntity.notFound().build();
    }
}
