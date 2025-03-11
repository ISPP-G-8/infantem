package com.isppG8.infantem.infantem.vaccine;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

@Service
public class VaccineService {
    @Autowired
    private final VaccineRepository repository;
    public VaccineService(VaccineRepository repository) { 
        this.repository = repository; 
    }
    public List<Vaccine> getAll() { 
        return repository.findAll(); 
    }
    public Vaccine getById(Long id) { 
        return repository.findById(id).orElse(null); 
    }
    public Vaccine save(Vaccine vaccine) { 
        return repository.save(vaccine); 
    }
    public void delete(Long id) { 
        repository.deleteById(id); 
    }
    
}
