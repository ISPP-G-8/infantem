package com.isppG8.infantem.infantem.ingesta;

import java.util.List;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("api/v1/ingesta")
public class IngestaController {
    @Autowired
    private IngestaService ingestaService;

    @GetMapping
    public List<Ingesta> getAllIngestas() {
        return ingestaService.getAllIngestas();
    }

        @GetMapping("/{id}")
    public Optional<Ingesta> getIngestaById(@PathVariable Long id) {
        return ingestaService.getIngestaById(id);
    }

    @PostMapping
    public Ingesta createIngesta(@RequestBody Ingesta ingesta) {
        return ingestaService.saveIngesta(ingesta);
    }

    @DeleteMapping("/{id}")
    public void deleteIngesta(@PathVariable Long id) {
        ingestaService.deleteIngesta(id);
    }
    
}


