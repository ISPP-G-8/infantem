package com.isppG8.infantem.infantem.allergen;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import com.isppG8.infantem.infantem.exceptions.ResourceNotFoundException;
import com.isppG8.infantem.infantem.allergen.dto.AllergenAnswerDTO;
import com.isppG8.infantem.infantem.allergen.dto.AllergenQuestionsDTO;
import com.isppG8.infantem.infantem.allergen.dto.AllergenDTO;
import com.isppG8.infantem.infantem.intake.IntakeService;
import com.isppG8.infantem.infantem.intake.Intake;
import com.isppG8.infantem.infantem.question.Question;
import com.isppG8.infantem.infantem.question.QuestionService;
import com.isppG8.infantem.infantem.baby.Baby;
import com.isppG8.infantem.infantem.baby.BabyService;
import jakarta.persistence.EntityNotFoundException;

import java.util.List;
import java.util.ArrayList;
import java.util.Collection;
import java.util.Collections;

@Service
public class AllergenService {

    private AllergenRepository allergenRepository;

    private IntakeService intakeService;

    private BabyService babyService;

    private QuestionService questionService;

    @Autowired
    public AllergenService(AllergenRepository allergenRepository, IntakeService intakeService, BabyService babyService,
            QuestionService questionService) {
        this.allergenRepository = allergenRepository;
        this.intakeService = intakeService;
        this.babyService = babyService;
        this.questionService = questionService;
    }

    @Transactional(readOnly = true)
    public List<Allergen> getAllAllergens() {
        return allergenRepository.findAll();
    }

    @Transactional(readOnly = true)
    public List<Allergen> getAllAllergensByBabyId(Integer babyId) {
        // checks ownership for us
        Baby baby = babyService.findById(babyId);

        return allergenRepository.findAllByBabyId(babyId);
    }

    @Transactional(readOnly = true)
    public Allergen getAllergenById(Long id) {
        return allergenRepository.findById(id).orElseThrow(() -> new ResourceNotFoundException("Allergen", "id", id));
    }

    @Transactional
    public Allergen createAllergen(Allergen allergen) {
        if (allergen.getName() == null || allergen.getName().trim().isEmpty() || allergen.getDescription() == null
                || allergen.getDescription().trim().isEmpty()) {
            throw new IllegalArgumentException("El nombre y la descripción del alérgeno no pueden estar vacíos");
        }

        if (allergenRepository.findByName(allergen.getName()).isPresent()) {
            throw new IllegalArgumentException("Ya existe un alérgeno con el nombre: " + allergen.getName());
        }

        return allergenRepository.save(allergen);
    }

    @Transactional
    public Allergen updateAllergen(Long id, Allergen allergenDetails) {
        return allergenRepository.findById(id).map(allergen -> {
            allergen.setName(allergenDetails.getName());
            allergen.setDescription(allergenDetails.getDescription());
            return allergenRepository.save(allergen);
        }).orElseThrow(() -> new ResourceNotFoundException("Allergen", "id", id));
    }

    @Transactional
    public void deleteAllergen(Long id) {
        if (!allergenRepository.existsById(id)) {
            throw new ResourceNotFoundException("Allergen", "id", id);
        }
        allergenRepository.deleteById(id);
    }

    @Transactional
    public AllergenAnswerDTO calculateAllergies(AllergenQuestionsDTO answers) {
        Integer babyId = answers.getBabyId();
        // findById checks baby ownership for us
        Baby baby = babyService.findById(babyId);
        Intake intake = intakeService.getLastIntake(baby.getId());
        List<Question> questions = new ArrayList<Question>();
        List<Integer> a = answers.getAnswers();

        Double estimation = 0.0;
        List<Double> weights = new ArrayList<>();
        Collections.addAll(weights, Double.valueOf(0.1), Double.valueOf(-0.1), Double.valueOf(0.2), Double.valueOf(0),
                Double.valueOf(-0.2), Double.valueOf(0.3), Double.valueOf(0.2));

        for (int i = 0; i < a.size(); i++) {

            Question q = new Question();
            q.setAnswer(a.get(i));
            q.setQuestion(i);
            q.setIntake(intake);
            q.setBaby(baby);
            questions.add(q);
            estimation += weights.get(i) * a.get(i);
        }
        AllergenAnswerDTO result = null;
        if (estimation > 1) {
            List<Allergen> possibleAllergies = allergenRepository.getAllergensByIntakeId(intake.getId());
            result = new AllergenAnswerDTO(true, possibleAllergies.stream().map(AllergenDTO::new).toList(),
                    "Tu bebé parece haber tenido una reacción alérgica a alguno de los elementos en su última comida. Llévalo al médico cuanto antes");
        } else {
            result = new AllergenAnswerDTO(false, null,
                    "Los síntomas de tu bebé no parecen estar relacionados a la última comida. Si no mejora en un rato, considera avisar a tu médico de familia");
        }

        questionService.saveAll(questions);
        return result;
    }

}
