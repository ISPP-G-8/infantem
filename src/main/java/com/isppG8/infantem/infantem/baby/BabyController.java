package com.isppG8.infantem.infantem.baby;

import java.util.List;

import javax.validation.Valid;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.ResponseStatus;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.http.HttpStatus;

@RestController
@RequestMapping("")
public class BabyController {

    private final BabyService babyService;

    @Autowired
    public BabyController(BabyService babyService) {
        this.babyService = babyService;
    }
    
    @GetMapping
    public List<Baby> findAll() {
        return babyService.findAll();
    }

    @GetMapping("/{id}")
    public Baby findById(int id) {
        return babyService.findById(id);
    }

    @PostMapping
    @ResponseStatus(HttpStatus.CREATED)
    public Baby createBebe(@RequestBody @Valid Baby baby) {
        babyService.save(baby);
        return baby;
    }

    @PutMapping("/update/{id}")
    public void updateBebe(@PathVariable("id") Integer id,@RequestBody @Valid Baby baby) {
        Baby bebeToUpdate = babyService.findById(id);
        if(bebeToUpdate == null) {
            throw new RuntimeException("Bebe not found");
        }
        bebeToUpdate.setName(baby.getName());
        bebeToUpdate.setBirthDate(baby.getBirthDate());
        bebeToUpdate.setGenre(baby.getGenre());
        bebeToUpdate.setWeight(baby.getWeight());
        bebeToUpdate.setHeight(baby.getHeight());
        bebeToUpdate.setCephalicPerimeter(baby.getCephalicPerimeter());
        bebeToUpdate.setFoodPreference(baby.getFoodPreference());

        babyService.save(bebeToUpdate);
    }

    @DeleteMapping("/delete/{id}")
    public void deleteBaby(@PathVariable("id") Integer id) {
        babyService.deleteBaby(id);
    }
}
