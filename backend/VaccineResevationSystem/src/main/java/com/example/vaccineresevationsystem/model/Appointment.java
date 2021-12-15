package com.example.vaccineresevationsystem.model;

import com.fasterxml.jackson.annotation.JsonIgnoreProperties;
import org.hibernate.annotations.GenericGenerator;

import javax.persistence.*;
import java.util.Date;
import java.util.List;

@Entity
@Table(name = "Appointment")
public class Appointment {
    @Id
    @GeneratedValue(generator = "uuid")
    @GenericGenerator(name = "uuid", strategy = "uuid2")
    private String appointmentID;
    private String checkIn;//Not Checked in=0, Checked in=1, NoShow=2

    private Date appointmentDate;



    @OneToMany(targetEntity = Vaccination.class, cascade = CascadeType.DETACH)
    @JoinColumn(name="appointmentID")
    @JsonIgnoreProperties({"Manufacturer", "NumberOfShots","ShotInternalVal","duration"})
    private List<Vaccination> vaccinationList;
    public Appointment(){

    }
    public Appointment( List<Vaccination> vaccinations,Date appointmentDate){
        this.appointmentDate = appointmentDate;
        this.vaccinationList = vaccinations;
//        this.clinic=clinic;
    }

    public String getAppointmentID() {
        return appointmentID;
    }

    public void setAppointmentID(String appointmentID) {
        this.appointmentID = appointmentID;
    }

    public Date getAppointmentDate() {
        return appointmentDate;
    }

    public void setAppointmentDate(Date appointmentDate) {
        this.appointmentDate = appointmentDate;
    }

    public List<Vaccination> getVaccinationList() {
        return vaccinationList;
    }

    public void addVaccinations(Vaccination vaccination) {
        this.vaccinationList.add(vaccination);
    }
}

