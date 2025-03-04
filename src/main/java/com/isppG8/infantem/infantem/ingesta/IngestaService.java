package com.isppG8.infantem.infantem.ingesta;
import java.util.List;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

@Service
public class IngestaService {

    @Autowired
    private IngestaRepository ingestaRepository;

    public List<Ingesta> getAllIngestas() {
        return ingestaRepository.findAll();
    }

    public Optional<Ingesta> getIngestaById(Long id) {
        return ingestaRepository.findById(id);
    }

    public Ingesta saveIngesta(Ingesta ingesta) {
        return ingestaRepository.save(ingesta);
    }

    public void deleteIngesta(Long id) {
        ingestaRepository.deleteById(id);
    }
}

