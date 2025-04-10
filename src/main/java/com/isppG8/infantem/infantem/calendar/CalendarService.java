package com.isppG8.infantem.infantem.calendar;

import java.time.LocalDate;
import java.util.ArrayList;
import java.util.List;
import java.util.Set;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.isppG8.infantem.infantem.calendar.dto.CalendarDay;
import com.isppG8.infantem.infantem.calendar.dto.CalendarEvents;
import com.isppG8.infantem.infantem.disease.DiseaseService;
import com.isppG8.infantem.infantem.disease.dto.DiseaseSummary;
import com.isppG8.infantem.infantem.dream.DreamService;
import com.isppG8.infantem.infantem.dream.dto.DreamSummary;
import com.isppG8.infantem.infantem.intake.IntakeService;
import com.isppG8.infantem.infantem.intake.dto.IntakeSummary;
import com.isppG8.infantem.infantem.metric.MetricService;
import com.isppG8.infantem.infantem.metric.dto.MetricSummary;
import com.isppG8.infantem.infantem.user.User;
import com.isppG8.infantem.infantem.user.UserService;
import com.isppG8.infantem.infantem.vaccine.VaccineService;
import com.isppG8.infantem.infantem.vaccine.dto.VaccineSummary;

@Service
public class CalendarService {

    private DreamService dreamService;
    private DiseaseService diseaseService;
    private VaccineService vaccineService;
    private IntakeService intakeService;
    private MetricService metricService;
    private UserService userService;

    @Autowired
    public CalendarService(DreamService dreamService, DiseaseService diseaseService, VaccineService vaccineService,
            IntakeService intakeService, MetricService metricService, UserService userService) {
        this.dreamService = dreamService;
        this.diseaseService = diseaseService;
        this.vaccineService = vaccineService;
        this.intakeService = intakeService;
        this.metricService = metricService;
        this.userService = userService;
    }

    public List<CalendarEvents> getCalendarByUserId(LocalDate start, LocalDate end) {
        User user = this.userService.findCurrentUser();
        List<Integer> babiesId = user.getBabies().stream().map(baby -> baby.getId()).toList();

        List<CalendarEvents> calendar = new ArrayList<>();

        for (Integer babyId : babiesId) {
            CalendarEvents babyCalendar = new CalendarEvents(babyId);

            if (user.getAuthorities().getAuthority().equals("premium")) {
                // Check dream events
                Set<LocalDate> dreamDates = this.dreamService.getDreamsByBabyIdAndDate(babyId, start, end);
                babyCalendar.addDreamEvents(dreamDates);

                // Check diseases events
                Set<LocalDate> diseaseDates = this.diseaseService.getDiseasesByBabyIdAndDate(babyId, start, end);
                babyCalendar.addDiseaseEvents(diseaseDates);

                // Check vaccines events
                List<LocalDate> vaccineDates = this.vaccineService.getVaccinesByBabyIdAndDate(babyId, start, end);
                babyCalendar.addVaccineEvents(vaccineDates);
            }

            // Check intake events
            List<LocalDate> intakeDates = this.intakeService.getIntakesByBabyIdAndDate(babyId, start, end);
            babyCalendar.addIntakeEvents(intakeDates);

            // Check metric events
            List<LocalDate> metricDates = this.metricService.getMetricsByUserIdAndDate(babyId, start, end);
            babyCalendar.addMetricEvents(metricDates);

            calendar.add(babyCalendar);
        }
        return calendar;
    }

    public List<CalendarDay> getCalendarDayByUserId(LocalDate day) {
        User user = this.userService.findCurrentUser();
        List<Integer> babiesId = user.getBabies().stream().map(baby -> baby.getId()).toList();
        List<CalendarDay> events = new ArrayList<>();
        for (Integer babyId : babiesId) {
            CalendarDay calendarDay = new CalendarDay(babyId);

            // Get intake summary
            List<IntakeSummary> intakeSummary = this.intakeService.getIntakeSummaryByBabyIdAndDate(babyId, day);
            calendarDay.setIntakes(intakeSummary);

            // Get metric summary
            List<MetricSummary> metricSummary = this.metricService.getMetricSummaryByBabyIdAndDate(babyId, day);
            calendarDay.setMetrics(metricSummary);

            // Only premium users can see dream, disease and vaccine summaries
            if (user.getAuthorities().getAuthority().equals("premium")) {
                // Get dream summary
                List<DreamSummary> dreamSummary = this.dreamService.getDreamSummaryByBabyIdAndDate(babyId, day);
                calendarDay.setDreams(dreamSummary);

                // Get diseases summary
                List<DiseaseSummary> diseaseSummary = this.diseaseService.getDiseaseSummaryByBabyIdAndDate(babyId, day);
                calendarDay.setDiseases(diseaseSummary);

                // Get vaccine summary
                List<VaccineSummary> vaccineSummary = this.vaccineService.getVaccineSummaryByBabyIdAndDate(babyId, day);
                calendarDay.setVaccines(vaccineSummary);
            }

            events.add(calendarDay);
        }
        return events;
    }
}
