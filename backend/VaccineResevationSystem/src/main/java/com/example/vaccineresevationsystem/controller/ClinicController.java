package com.example.vaccineresevationsystem.controller;

import com.example.vaccineresevationsystem.aspect.Authorizable;
import com.example.vaccineresevationsystem.service.ClinicService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.*;

@Controller
@RequestMapping(path = "/clinic")
public class ClinicController {

    @Autowired
    private ClinicService clinicService;

    @Authorizable
    @GetMapping(path = "createClinic")
    public @ResponseBody
    ResponseEntity<?> createClinic(@RequestParam String MRN, @RequestParam String name, @RequestParam String street, @RequestParam String number, @RequestParam String city, @RequestParam String state, @RequestParam String zipCode, @RequestParam int startTime, @RequestParam int endTime, @RequestParam int numberOfPhysicians)
    {
        return clinicService.addClinic(name,street,number,city,state,zipCode,startTime, endTime, numberOfPhysicians);
    }

    @Authorizable
    @GetMapping(path = "getClinic")
    public @ResponseBody
    ResponseEntity<?> getClinics(@RequestParam String MRN)
    {
        return clinicService.getClinics();
    }

}
