package com.example.vaccineresevationsystem.controller;

import com.example.vaccineresevationsystem.aspect.Authorizable;
import com.example.vaccineresevationsystem.service.ClinicService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.ResponseBody;

@Controller
@RequestMapping(path = "/clinic")
public class ClinicController {

    @Autowired
    private ClinicService clinicService;

    @Authorizable
    @PostMapping(path = "")
    public @ResponseBody
    ResponseEntity<?> createClinic(@RequestParam String MRN, @RequestParam String name, @RequestParam String street, @RequestParam String number, @RequestParam String city, @RequestParam String state, @RequestParam String zipCode, @RequestParam int startTime, @RequestParam int endTime, @RequestParam int numberOfPhysicians)
    {
        return clinicService.addClinic(name,street,number,city,state,zipCode,startTime, endTime, numberOfPhysicians);
    }

}
