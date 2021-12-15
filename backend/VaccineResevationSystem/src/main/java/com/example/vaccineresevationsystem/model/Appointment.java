package com.example.vaccineresevationsystem.model;

import com.fasterxml.jackson.annotation.JsonIgnoreProperties;
import org.hibernate.annotations.GenericGenerator;

import javax.persistence.*;
import java.util.Date;
import java.util.List;

public class Appointment {
    @Id
    @GeneratedValue(generator = "uuid")
    @GenericGenerator(name = "uuid", strategy = "uuid2")
    private String appointmentID;
    private String checkIn;//Not Checked in=0, Checked in=1, NoShow=2

    private String appointmentDate;

    @ManyToOne
    @JoinTable( joinColumns = @JoinColumn(name = "appointmentID"), inverseJoinColumns = @JoinColumn(name = "MRN"))
    @JsonIgnoreProperties({"appointments","middleName","password","birthDate","street","number","city","state","zipCode"})
    private User user;

    @OneToOne
    @JoinTable( joinColumns = @JoinColumn(name = "appointmentID"), inverseJoinColumns = @JoinColumn(name = "ID"))
    @JsonIgnoreProperties({"zipCode","street","state","city","number"})
    private Clinic clinic;


    @OneToMany(targetEntity = Vaccination.class, cascade = CascadeType.DETACH)
    @JoinTable( joinColumns = @JoinColumn(name = "appointmentID"), inverseJoinColumns = @JoinColumn(name = "vaccinationID"))
    @JsonIgnoreProperties({"Manufacturer", "NumberOfShots","ShotInternalVal","duration"})
    private List<Vaccination> vaccinationList;
    public Appointment(){

    }
    public Appointment( User user,List<Vaccination> vaccinations,String appointmentDate,Clinic clinic){
        this.appointmentDate = appointmentDate;
        this.user = user;
        this.vaccinationList = vaccinations;
        this.clinic=clinic;
    }

    public String getAppointmentID() {
        return appointmentID;
    }

    public void setAppointmentID(String appointmentID) {
        this.appointmentID = appointmentID;
    }

    public String getAppointmentDate() {
        return appointmentDate;
    }

    public void setAppointmentDate(String appointmentDate) {
        this.appointmentDate = appointmentDate;
    }

    public User getUser() {
        return user;
    }

    public void setUser(User user) {
        this.user = user;
    }

    public List<Vaccination> getVaccinationList() {
        return vaccinationList;
    }

    public void addVaccinations(Vaccination vaccination) {
        this.vaccinationList.add(vaccination);
    }
}


