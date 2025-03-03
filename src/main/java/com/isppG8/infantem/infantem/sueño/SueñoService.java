package com.isppG8.infantem.infantem.sueño;

import java.util.List;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

@Service
public class SueñoService {

    @Autowired
    private SueñoRepository sueñoRepository;

    public List<Sueño> getAllSueños() {
        return sueñoRepository.findAll();
    }

    public Optional<Sueño> getSueñoById(Long id) {
        return sueñoRepository.findById(id);
    }

    public Sueño createSueño(Sueño sueño) {
        return sueñoRepository.save(sueño);
    }

    public Optional<Sueño> updateSueño(Long id, Sueño sueñoDetails) {
        return sueñoRepository.findById(id).map(sueño -> {
            sueño.setInicio(sueñoDetails.getInicio());
            sueño.setFin(sueñoDetails.getFin());
            sueño.setNumDesvalos(sueñoDetails.getNumDesvalos());
            sueño.setTipoSueño(sueñoDetails.getTipoSueño());
            return sueñoRepository.save(sueño);
        });
    }

    public boolean deleteSueño(Long id) {
        if (sueñoRepository.existsById(id)) {
            sueñoRepository.deleteById(id);
            return true;
        }
        return false;
    }
}
