package com.example.vaccineresevationsystem.controller;

import com.example.vaccineresevationsystem.aspect.Authorizable;
import com.example.vaccineresevationsystem.service.DiseaseService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.*;

@Controller
@RequestMapping(path="/disease")
public class DiseaseController {

    @Autowired
    private DiseaseService diseaseService;

    @GetMapping(path="createDisease")
    public @ResponseBody
    ResponseEntity<?> createDisease(@RequestParam String name, @RequestParam String description) {
        //write service
        return diseaseService.createDisease(name, description);
    }

    @Authorizable
    @GetMapping(path="getDiseases")
    public @ResponseBody ResponseEntity<?> getDiseases(@RequestParam String MRN){
        return diseaseService.getAllDiseases();
    }

}
