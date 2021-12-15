package com.example.vaccineresevationsystem.controller;

import com.example.vaccineresevationsystem.aspect.Authorizable;
import com.example.vaccineresevationsystem.service.DashboardService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.ResponseBody;

import java.text.ParseException;

@Controller
@RequestMapping(path = "/dashboard")
public class DashboardController {

    @Autowired
    private DashboardService dashboardService;

    @Authorizable
    @GetMapping(path = "")
    public @ResponseBody
    ResponseEntity<?> getVaccinationsDue(@RequestParam String currentTime,@RequestParam String email) throws ParseException {
        return dashboardService.getVaccinationsDue(currentTime, email);
    }

}