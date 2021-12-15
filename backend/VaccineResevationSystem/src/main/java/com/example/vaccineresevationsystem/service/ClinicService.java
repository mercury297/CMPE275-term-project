package com.example.vaccineresevationsystem.service;

import com.example.vaccineresevationsystem.handler.ErrorHandler;
import com.example.vaccineresevationsystem.model.Clinic;
import com.example.vaccineresevationsystem.repository.ClinicRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;

import java.util.Optional;

@Service
public class ClinicService {
    final ClinicRepository clinicRepository;

    @Autowired
    public ClinicService(ClinicRepository clinicRepository) { this.clinicRepository = clinicRepository; }


    public ResponseEntity<?> addClinic(String name, String street, String number, String city, String state, String zipCode, String businessHours, int numberOfPhysicians) {
        if(!checkBusinessHours(businessHours)){
            return ErrorHandler.badRequest(HttpStatus.NOT_FOUND, "The business hours have to be at least 8 hours apart ");
        }

        Clinic clinic = new Clinic();
        clinic.setStreet(street);
        clinic.setState(state);
        clinic.setZipCode(zipCode);
        clinic.setCity(city);
        clinic.setName(name);
        clinic.setNumber(number);
        clinic.setNumberOfPhysicians(numberOfPhysicians);
        clinic.setBussinessHours(businessHours);
        clinicRepository.save(clinic);
        return ResponseEntity.of(Optional.of(clinic));
    }

    /**
     * Function to check that business hours of clinic are not more than 8 hours
     * */
    public Boolean checkBusinessHours(String businessHours)
    {
        String [] hours = businessHours.split("-");
        String leftHours = hours[0].trim();
        String rightHours = hours[1].trim();
        int startTime = 0;
        int endTime = 0;

        if(leftHours.contains("am")){
            startTime =  Integer.parseInt(leftHours.substring(0,leftHours.length() - 2));
        }
        else if(leftHours.contains("pm")){
            startTime = Integer.parseInt(leftHours.substring(0,leftHours.length() - 2)) + 12;
        }

        if(rightHours.contains("am")){
            endTime =  Integer.parseInt(rightHours.substring(0,rightHours.length() - 2));
        }
        else if(rightHours.contains("pm")){
            endTime = Integer.parseInt(rightHours.substring(0,rightHours.length() - 2)) + 12;
        }

        return endTime - startTime >= 8;
    }


}
