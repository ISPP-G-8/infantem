package com.isppG8.infantem.infantem.calendar.dto;

import java.util.ArrayList;
import java.util.List;

import com.isppG8.infantem.infantem.disease.dto.DiseaseSummary;
import com.isppG8.infantem.infantem.dream.dto.DreamSummary;
import com.isppG8.infantem.infantem.intake.dto.IntakeSummary;
import com.isppG8.infantem.infantem.metric.dto.MetricSummary;
import com.isppG8.infantem.infantem.vaccine.dto.VaccineSummary;

import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
public class CalendarDay {
    private Integer babyId;
    private List<DreamSummary> dreams = new ArrayList<>();
    private List<DiseaseSummary> diseases = new ArrayList<>();
    private List<VaccineSummary> vaccines = new ArrayList<>();
    private List<IntakeSummary> intakes = new ArrayList<>();
    private List<MetricSummary> metrics = new ArrayList<>();

    public CalendarDay(Integer babyId) {
        this.babyId = babyId;
    }
}
