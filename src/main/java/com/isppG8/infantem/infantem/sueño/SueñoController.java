package com.isppG8.infantem.infantem.sueño;

import java.util.List;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("api/v1/sueño")
public class SueñoController {
    
    @Autowired
    private SueñoService sueñoService;

    @GetMapping
    public List<Sueño> getAllSueños() {
        return sueñoService.getAllSueños();
    }

    @GetMapping("/{id}")
    public ResponseEntity<Sueño> getSueñoById(@PathVariable Long id) {
        Optional<Sueño> sueño = sueñoService.getSueñoById(id);
        return sueño.map(ResponseEntity::ok).orElseGet(() -> ResponseEntity.notFound().build());
    }

    @PostMapping
    public Sueño createSueño(@RequestBody Sueño sueño) {
        return sueñoService.createSueño(sueño);
    }

    @PutMapping("/{id}")
    public ResponseEntity<Sueño> updateSueño(@PathVariable Long id, @RequestBody Sueño sueñoDetails) {
        Optional<Sueño> updatedSueño = sueñoService.updateSueño(id, sueñoDetails);
        return updatedSueño.map(ResponseEntity::ok).orElseGet(() -> ResponseEntity.notFound().build());
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Void> deleteSueño(@PathVariable Long id) {
        boolean deleted = sueñoService.deleteSueño(id);
        return deleted ? ResponseEntity.noContent().build() : ResponseEntity.notFound().build();
    }
}
