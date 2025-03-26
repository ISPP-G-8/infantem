package com.isppG8.infantem.infantem.calendar.dto;

import java.time.LocalDate;
import java.util.HashMap;
import java.util.HashSet;
import java.util.List;
import java.util.Map;
import java.util.Set;

import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
public class CalendarEvents {
    private Integer babyId;
    private Map<String, Set<String>> events;

    public CalendarEvents() {
    }

    public CalendarEvents(Integer babyId) {
        this.babyId = babyId;
        this.events = new HashMap<>();
    }

    public void addDreamEvents(Set<LocalDate> dreamDates) {
        for (LocalDate date : dreamDates) {
            addEvent(date, "Dream");
        }
    }

    public void addDiseaseEvents(Set<LocalDate> diseaseDates) {
        for (LocalDate date : diseaseDates) {
            addEvent(date, "Disease");
        }
    }

    public void addVaccineEvents(List<LocalDate> vaccineDates) {
        for (LocalDate date : vaccineDates) {
            addEvent(date, "Vaccine");
        }
    }

    public void addIntakeEvents(List<LocalDate> intakeDates) {
        for (LocalDate date : intakeDates) {
            addEvent(date, "Intake");
        }
    }

    public void addMetricEvents(List<LocalDate> metricDates) {
        for (LocalDate date : metricDates) {
            addEvent(date, "Metric");
        }
    }

    private void addEvent(LocalDate date, String event) {
        String formattedDate = date.toString();
        if (!this.events.containsKey(formattedDate)) {
            Set<String> events = new HashSet<>();
            events.add(event);
            this.events.put(formattedDate, events);
        } else {
            this.events.get(formattedDate).add(event);
        }
    }

}
