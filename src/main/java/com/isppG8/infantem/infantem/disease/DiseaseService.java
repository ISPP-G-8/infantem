package com.isppG8.infantem.infantem.disease;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

@Service
public class DiseaseService {
    @Autowired
    private final DiseaseRepository repository;

    public DiseaseService(DiseaseRepository repository) { 
        this.repository = repository; 
    }
    public List<Disease> getAll() { 
        return repository.findAll(); 
    }
    public Disease getById(Long id) { 
        return repository.findById(id).orElse(null); 
    }
    public Disease save(Disease disease) { 
        return repository.save(disease); 
    }
    public void delete(Long id) { 
        repository.deleteById(id); 
    }
}
    
