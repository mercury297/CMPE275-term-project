package com.example.vaccineresevationsystem.repository;

import com.example.vaccineresevationsystem.model.Appointment;
import com.example.vaccineresevationsystem.model.Clinic;
import com.example.vaccineresevationsystem.model.User;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.CrudRepository;

public interface AppointmentRepository extends CrudRepository<Appointment,Integer> {
    public  Appointment findByappointmentID(String appointmentID);

}
