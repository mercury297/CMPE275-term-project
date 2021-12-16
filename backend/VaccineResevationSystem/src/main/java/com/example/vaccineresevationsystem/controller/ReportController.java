package com.example.vaccineresevationsystem.controller;

import com.example.vaccineresevationsystem.aspect.Authorizable;
import com.example.vaccineresevationsystem.service.ReportService;
import com.example.vaccineresevationsystem.service.VaccinationService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.*;

import java.text.ParseException;

@Controller
@RequestMapping(path="/report")
public class ReportController {
    @Autowired
    private ReportService reportService;
    @Authorizable
    @GetMapping(path="/patientreport")
    public @ResponseBody
    ResponseEntity<?> getPatientReport(@RequestParam String MRN,@RequestParam String startDate, @RequestParam String endDate, @RequestParam String currentTime) throws ParseException {
        return reportService.getPatientReport(MRN,startDate, endDate,currentTime);
//        return ResponseEntity.ok("Patient Report");
    }
    @Authorizable
    @GetMapping (path="/clinicreport")
    public @ResponseBody
    ResponseEntity<?> getClinicReport(@RequestParam String startDate, @RequestParam String endDate, @RequestParam String currentTime) throws ParseException {
        return reportService.getClinicReport(startDate, endDate,currentTime);
//        return ResponseEntity.ok("Clininc Report");
    }
}
