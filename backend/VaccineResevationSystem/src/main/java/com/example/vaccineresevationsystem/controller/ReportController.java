package com.example.vaccineresevationsystem.controller;

import com.example.vaccineresevationsystem.aspect.Authorizable;
import com.example.vaccineresevationsystem.service.ReportService;
import com.example.vaccineresevationsystem.service.VaccinationService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.ResponseBody;

@Controller
@RequestMapping(path="/report")
public class ReportController {
    @Autowired
    private ReportService reportService;
    @Authorizable
    @PostMapping(path="patientreport")
    public @ResponseBody
    ResponseEntity<?> getPatientReport(@RequestParam String MRN,@RequestParam String startDate, @RequestParam String endDate, @RequestParam String currentTime) {
//        return reportService.getReport(MRN,startDate, endDate,currentTime);
        return ResponseEntity.ok("Patient Report");
    }
    @Authorizable
    @PostMapping(path="clinicRrport")
    public @ResponseBody
    ResponseEntity<?> getClinicReport(@RequestParam String clinicId,@RequestParam String startDate, @RequestParam String endDate, @RequestParam String currentTime) {
//        return reportService.getClinicReport(clinicId,startDate, endDate,currentTime);
        return ResponseEntity.ok("Clininc Report");
    }
}
