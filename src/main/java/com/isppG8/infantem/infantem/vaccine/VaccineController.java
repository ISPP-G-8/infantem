package com.isppG8.infantem.infantem.vaccine;

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
@RequestMapping("api/v1/vaccines")
public class VaccineController {
    @Autowired
    private final VaccineService service;
    public VaccineController(VaccineService service) {
        this.service = service;
    }
    @GetMapping
    public List<Vaccine> getAll() {
        return service.getAll();
    }
    @GetMapping("/{id}")
    public Vaccine getById(@PathVariable Long id) {
        return service.getById(id);
    }
    @PostMapping
    public Vaccine create(@RequestBody Vaccine vaccine) {
        return service.save(vaccine);
    }
    @PutMapping("/{id}")
    public Vaccine update(@PathVariable Long id, @RequestBody Vaccine vaccine) {
        vaccine.setId(id);
        return service.save(vaccine);
    }
    @DeleteMapping("/{id}")
    public void delete(@PathVariable Long id) {
        service.delete(id);
    }
}
    

