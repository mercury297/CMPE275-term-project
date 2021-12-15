package com.example.vaccineresevationsystem.controller;
import com.example.vaccineresevationsystem.aspect.Authorizable;
import com.example.vaccineresevationsystem.model.Vaccination;
import com.example.vaccineresevationsystem.service.AppointmentService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.ResponseBody;

import java.text.ParseException;
import java.util.Date;
import java.util.List;

@Controller
@RequestMapping(path = "")
public class AppointmentController {
    @Autowired
    private AppointmentService appointmentService;


    @Authorizable
    @PostMapping(path="createAppointment")
    public @ResponseBody
    ResponseEntity<?> createAppointment(@RequestParam String MRN, @RequestParam List<String> vaccinationId,@RequestParam String ClinicId ,@RequestParam String date) throws ParseException {
        return appointmentService.createAppointment(MRN, vaccinationId, ClinicId,date);
    }

}
