package com.isppG8.infantem.infantem.calendar;

import java.time.LocalDate;
import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.web.bind.MethodArgumentNotValidException;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.server.ResponseStatusException;

import com.isppG8.infantem.infantem.calendar.dto.CalendarDay;
import com.isppG8.infantem.infantem.calendar.dto.CalendarEvents;

@RestController
@RequestMapping("/api/v1/calendar")
public class CalendarController {

    private CalendarService calendarService;

    @Autowired
    public CalendarController(CalendarService calendarService) {
        this.calendarService = calendarService;
    }

    @GetMapping
    public List<CalendarEvents> getCalendarByUserId(@RequestParam Integer month, @RequestParam Integer year)
            throws MethodArgumentNotValidException {
        // Validate month and year
        if (month < 1 || month > 12) {
            throw new ResponseStatusException(HttpStatus.BAD_REQUEST, "Invalid month. Month must be between 1 and 12.");
        }
        if (year < 2000) {
            throw new ResponseStatusException(HttpStatus.BAD_REQUEST, "Invalid year.");
        }

        // Calculate start date
        LocalDate start = LocalDate.of(year, month, 1);

        // Calculate end of month
        LocalDate end = start.withDayOfMonth(start.lengthOfMonth());

        List<CalendarEvents> calendarData = calendarService.getCalendarByUserId(start, end);

        return calendarData;
    }

    @GetMapping("/{day}")
    public List<CalendarDay> getCalendarDayByUserId(@PathVariable LocalDate day) {
        List<CalendarDay> calendarDayData = calendarService.getCalendarDayByUserId(day);
        return calendarDayData;
    }

}
