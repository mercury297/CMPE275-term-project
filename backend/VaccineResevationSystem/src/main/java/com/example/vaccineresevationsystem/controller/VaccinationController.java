package com.example.vaccineresevationsystem.controller;

import com.example.vaccineresevationsystem.aspect.Authorizable;
import com.example.vaccineresevationsystem.service.VaccinationService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.ResponseBody;

import java.util.ArrayList;
import java.util.List;

@Controller
@RequestMapping(path="/vaccination")
public class VaccinationController {

    @Autowired
    private VaccinationService vaccinationService;
    //MRN?name=vaccineA&diseases=A,B,C&manufacturer:companyA&numberOfShots=2&shotInternalVal=12&duration=10

    @Authorizable
    @PostMapping(path = "")
    public @ResponseBody
    ResponseEntity<?> createVaccination(@RequestParam String MRN, @RequestParam String name, @RequestParam String diseases, @RequestParam String manufacturer, @RequestParam int numberOfShots,@RequestParam int shotInternalVal, @RequestParam int duration){
        String[] diseaseNameList = diseases.split(",");
        List<String> diseaseNames = new ArrayList<>();

        for(String disease: diseaseNameList){
            System.out.println(disease);
            diseaseNames.add(disease);
        }
        return vaccinationService.createVaccination(name, diseaseNames, manufacturer, numberOfShots, shotInternalVal, duration);
    }

}
