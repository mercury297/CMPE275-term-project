package com.example.vaccineresevationsystem.service;
import com.example.vaccineresevationsystem.handler.ErrorHandler;
import com.example.vaccineresevationsystem.model.Clinic;
import com.example.vaccineresevationsystem.model.Appointment;
import com.example.vaccineresevationsystem.model.User;
import com.example.vaccineresevationsystem.model.Vaccination;
import com.example.vaccineresevationsystem.repository.AppointmentRepository;
import com.example.vaccineresevationsystem.repository.ClinicRepository;
import com.example.vaccineresevationsystem.repository.UserRepository;
import com.example.vaccineresevationsystem.repository.VaccinationRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;

import java.text.DateFormat;
import java.text.ParseException;
import java.text.SimpleDateFormat;
import java.util.ArrayList;
import java.util.Date;
import java.util.List;
import java.util.Optional;

@Service
public class AppointmentService {
    @Autowired
    final AppointmentRepository appointmentRepository;
    @Autowired
    final ClinicRepository clinicRepository;
    @Autowired
    final UserRepository userRepository;
    @Autowired
    final VaccinationRepository vaccinationRepository;

    public AppointmentService (AppointmentRepository appointmentRepository, ClinicRepository clinicRepository, UserRepository userRepository, VaccinationRepository vaccinationRepository) {
        this.appointmentRepository = appointmentRepository;
        this.clinicRepository = clinicRepository;
        this.userRepository = userRepository;
        this.vaccinationRepository = vaccinationRepository;
    }


    public ResponseEntity<?> createAppointment(String MRN, List<String> vaccinationIds, String ClinicId , String date) throws ParseException {
        DateFormat dateFormat = new SimpleDateFormat("yyyy-MM-dd-HH-mm");
        Date newdate = dateFormat.parse(date);
        Clinic clinic = clinicRepository.findById(ClinicId);

        if(clinic==null){
            return ErrorHandler.badRequest(HttpStatus.BAD_REQUEST, "Clinic not found");
        }
        User user = userRepository.findByMRN(MRN);
        if (user==null){
            return ErrorHandler.badRequest(HttpStatus.BAD_REQUEST, "User not found");
        }
        if (vaccinationIds.size()>4){
            return ErrorHandler.badRequest(HttpStatus.BAD_REQUEST, "Maximum 4 vaccinations can be booked at a time");
        }

        List<Vaccination> vaccinations;
        vaccinations = getAllVaccinations(vaccinationIds);
        if (checkAppointmentClashInClinic(newdate,clinic)){
            return ErrorHandler.badRequest(HttpStatus.BAD_REQUEST, "Appointment clash in clinic");
        }
        if (checkAppointmentClashWithUser(newdate, MRN)) {
            return ErrorHandler.badRequest(HttpStatus.BAD_REQUEST, "Appointment clash with users previous appointments");
        }
        Appointment appointment = new Appointment(vaccinations,newdate);
        List<Appointment>  clinicAppointments;
        clinicAppointments = clinic.getAppointments();
        clinicAppointments.add(appointment);
        clinic.setAppointment(clinicAppointments);

        List<Appointment>  userAppointments;
        userAppointments = user.getAppointments();
        userAppointments.add(appointment);
        user.setAppointments(userAppointments);

        userRepository.save(user);
        clinicRepository.save(clinic);
        appointmentRepository.save(appointment);

        return ResponseEntity.of(Optional.of(clinic));

    }

    public List<Vaccination>getAllVaccinations(List<String> vaccinations){
        List<Vaccination> vaccinnations = new ArrayList<>();
        for(String vaccinationId : vaccinations){
            Vaccination vaccination = vaccinationRepository.findById(vaccinationId);
            vaccinnations.add(vaccination);
        }
        return vaccinnations;

    }
    public Boolean checkAppointmentClashInClinic(Date date, Clinic clinic){
        int count = 0;
        for(Appointment appointment:clinic.getAppointments()){
            if(appointment.getAppointmentDate().equals(date)){
                count++;
            }
        };
        if(count==clinic.getNumberOfPhysicians()){
            return true;
        }
        return false;
    }
    public Boolean checkAppointmentClashWithUser(Date date, String MRN){
        User user = getUser(MRN);
        System.out.println("inside checkAppointmentClashWithUser");
        for(Appointment appointment:user.getAppointments()){
            System.out.println("inside ");
            if(appointment.getAppointmentDate().equals(date)){
                return true;
            }

        };
        return false;


    }
    public User getUser(String MRN){
        return userRepository.findByMRN(MRN);
    }



}