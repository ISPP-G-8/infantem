package com.isppG8.infantem.infantem.disease;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("api/v1/diseases")
public class DiseaseController {
    @Autowired
    private final DiseaseService service;
    
    public DiseaseController(DiseaseService service) {
        this.service = service;
    }
    @GetMapping
    public List<Disease> getAll() {
        return service.getAll();
    }
    @GetMapping("/{id}")
    public Disease getById(@PathVariable Long id) {
        return service.getById(id);
    }
    @PostMapping
    public Disease create(@RequestBody Disease disease) {
        return service.save(disease);
    }
    @DeleteMapping("/{id}")
    public void delete(@PathVariable Long id) {
        service.delete(id); }
}
    

