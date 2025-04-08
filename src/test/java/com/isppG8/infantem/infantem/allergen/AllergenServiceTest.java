package com.isppG8.infantem.infantem.allergen;

import static org.junit.jupiter.api.Assertions.assertEquals;
import static org.junit.jupiter.api.Assertions.assertNotNull;
import static org.junit.jupiter.api.Assertions.assertThrows;

import java.util.List;

import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;

import jakarta.persistence.EntityNotFoundException;

@SpringBootTest
public class AllergenServiceTest {
    private AllergenService allergenService;

    @Autowired
    public AllergenServiceTest(AllergenService allergenService) {
        this.allergenService = allergenService;
    }

    @Test
    public void testGetAllAllergens() {
        List<Allergen> allergens = this.allergenService.getAllAllergens();
        assertEquals(10, allergens.size());
        assertEquals("Gluten", allergens.get(0).getName());
        assertEquals("Lactosa", allergens.get(1).getName());
        assertEquals("Sulfitos", allergens.get(allergens.size() - 1).getName());
    }

    @Test
    public void testGetAllergenById() {
        Allergen allergen = this.allergenService.getAllergenById(Long.valueOf(1));

        assertNotNull(allergen);
        assertEquals("Gluten", allergen.getName());
        assertEquals("Presente en trigo, cebada, centeno y sus derivados.", allergen.getDescription());
    }

    @Test
    public void testGetAllAllergensWrongID() {
        assertThrows(EntityNotFoundException.class, () -> allergenService.getAllergenById(Long.valueOf(1)));
    }

    @Test
    public void testCreateAllergen() {
        Allergen allergen = new Allergen("Fruta", "Presente en frutas y sus derivados.");
        Allergen createdAllergen = this.allergenService.createAllergen(allergen);
        Allergen storedAllergen = this.allergenService.getAllergenById(createdAllergen.getId());
        assertEquals("Fruta", storedAllergen.getName());
        assertEquals("Presente en frutas y sus derivados.", storedAllergen.getDescription());
    }

    @Test
    public void testCreateAllergenDuplicated() {
        Allergen allergen = new Allergen("Gluten", "Presente en trigo, cebada, centeno y sus derivados.");
        assertThrows(IllegalArgumentException.class, () -> allergenService.createAllergen(allergen));
    }

    @Test
    public void testCreateAllergenNull() {
        Allergen allergen = new Allergen(null, null);
        assertThrows(IllegalArgumentException.class, () -> allergenService.createAllergen(allergen));
    }

    @Test
    public void testCreateAllergenBlank() {
        Allergen allergen = new Allergen("", "");
        assertThrows(IllegalArgumentException.class, () -> allergenService.createAllergen(allergen));
    }

    @Test
    public void testUpdateAllergen() {
        Allergen allergen = new Allergen("Medicamentos", "Presente en medicamentos y fármacos.");
        Allergen createdAllergen = this.allergenService.createAllergen(allergen);
        Allergen updatedAllergen = new Allergen("Medicamentos y jarabes",
                "Presente en medicamentos y fármacos. También en jarabes.");
        this.allergenService.updateAllergen(createdAllergen.getId(), updatedAllergen);
        Allergen storedAllergen = this.allergenService.getAllergenById(createdAllergen.getId());

        assertEquals("Medicamentos y jarabes", storedAllergen.getName());
        assertEquals("Presente en medicamentos y fármacos. También en jarabes.", storedAllergen.getDescription());
    }

    @Test
    public void testUpdateAllergenWrongID() {
        Allergen updatedAllergen = new Allergen("Medicamentos y jarabes",
                "Presente en medicamentos y fármacos. También en jarabes.");
        assertThrows(EntityNotFoundException.class, () -> allergenService.updateAllergen(1000L, updatedAllergen));
    }

    @Test
    public void testDeleteAllergen() {
        Allergen allergen = new Allergen("Prueba", "Prueba");
        Allergen createdAllergen = this.allergenService.createAllergen(allergen);
        this.allergenService.deleteAllergen(createdAllergen.getId());
        Allergen deletedAllergen = this.allergenService.getAllergenById(createdAllergen.getId());
        assertEquals(null, deletedAllergen);
        // Next line is commented until we implement the exception handling in the service
        // assertThrows(EntityNotFoundException.class, () -> allergenService.getAllergenById(createdAllergen.getId()));
    }

    @Test
    public void testDeleteAllergenWrongID() {
        assertThrows(EntityNotFoundException.class, () -> allergenService.deleteAllergen(1000L));
    }

}
