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


    public ResponseEntity<?> addClinic(String name, String street, String number, String city, String state, String zipCode, int startTime, int endTime, int numberOfPhysicians) {
        if(!checkBusinessHours(startTime, endTime)){
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
        clinic.setStartTime(startTime);
        clinic.setEndTime(endTime);
        clinicRepository.save(clinic);
        return ResponseEntity.of(Optional.of(clinic));
    }

    /**
     * Function to check that business hours of clinic are not more than 8 hours
     * */
    public Boolean checkBusinessHours( int startTime, int endTime)
    {
        return endTime - startTime >= 8;
    }


}