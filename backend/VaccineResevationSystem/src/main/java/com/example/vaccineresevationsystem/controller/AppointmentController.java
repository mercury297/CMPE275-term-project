package com.example.vaccineresevationsystem.controller;
import com.example.vaccineresevationsystem.aspect.Authorizable;
import com.example.vaccineresevationsystem.model.Vaccination;
import com.example.vaccineresevationsystem.service.AppointmentService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.*;

import javax.mail.MessagingException;
import java.io.UnsupportedEncodingException;
import java.text.ParseException;
import java.util.Date;
import java.util.List;

@Controller
@RequestMapping(path = "/")
public class AppointmentController {
    @Autowired
    private AppointmentService appointmentService;


    @Authorizable
    @PostMapping(path = "createAppointment")
    public @ResponseBody
    ResponseEntity<?> createAppointment(@RequestParam String MRN, @RequestParam List<String> vaccinationId, @RequestParam String ClinicId, @RequestParam String date, @RequestParam String currentTime) throws ParseException, MessagingException, UnsupportedEncodingException {
        return appointmentService.createAppointment(MRN, vaccinationId, ClinicId, date, currentTime);
    }


    @Authorizable
    @PostMapping(path = "cancelAppointment")
    public @ResponseBody
    ResponseEntity<?> cancelAppointment(@RequestParam String appointmentID,@RequestParam String currentTime) throws UnsupportedEncodingException, MessagingException, ParseException {
        return appointmentService.cancelAppointment(appointmentID,currentTime);
    }

    @Authorizable
    @PostMapping(path = "checkInAppointment")
    public @ResponseBody
    ResponseEntity<?> checkInAppointment(@RequestParam String appointmentID, String currentTime) throws UnsupportedEncodingException, MessagingException, ParseException {
        return appointmentService.checkInAppointment(appointmentID, currentTime);
    }

    @Authorizable
    @GetMapping(path = "getPastAppointment")
    public @ResponseBody
    ResponseEntity<?> getPastAppointment(@RequestParam String MRN, @RequestParam String currentTime) throws UnsupportedEncodingException, MessagingException, ParseException {
        return appointmentService.getPastAppointments(MRN, currentTime);
    }

    @Authorizable
    @GetMapping(path = "getFutureAppointment")
    public @ResponseBody
    ResponseEntity<?> getFutureAppointment(@RequestParam String MRN, @RequestParam String currentTime) throws UnsupportedEncodingException, MessagingException, ParseException {
        return appointmentService.getFutureAppointments(MRN, currentTime);
    }
}
