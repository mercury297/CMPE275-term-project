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

    public String getCheckIn() {
        return checkIn;
    }
    @ManyToOne
    @JoinColumn(name = "clinic")
    @JsonIgnoreProperties({"street","state","street","zipCode","appointments","startTime","endTime","numberOfPhysicians"})
    private Clinic clinic;

    public void setCheckIn(String checkIn) {
        this.checkIn = checkIn;
    }

    public void setVaccinationList(List<Vaccination> vaccinationList) {
        this.vaccinationList = vaccinationList;
    }

    private String checkIn;//Not Checked in=0, Checked in=1, NoShow=2

    @ManyToOne
    @JoinColumn(name = "user")
    @JsonIgnoreProperties({"appointments", "verificationCode","password","verified", "number", "clinic", "street","zipCode","city","state","country","phone","firstName","lastName","birthDate","middleName"})
    private User user;

    private String appointmentDate;



    @ManyToMany (targetEntity = Vaccination.class, cascade = CascadeType.DETACH)
    @JoinTable( joinColumns = @JoinColumn(name = "appointmentID"), inverseJoinColumns = @JoinColumn(name = "vaccinationID"))
    @JsonIgnoreProperties({"manufacturer", "numberOfShots","shotInternalVal","disease"})
    private List<Vaccination> vaccinationList;
    public Appointment(){
    }
    public Appointment( List<Vaccination> vaccinations,String appointmentDate,Clinic clinic, User user) {
        this.appointmentDate = appointmentDate;
        this.vaccinationList = vaccinations;
        this.clinic=clinic;
        this.user=user;
        this.checkIn="0";
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

    public List<Vaccination> getVaccinationList() {
        return vaccinationList;
    }

    public void addVaccinations(Vaccination vaccination) {
        this.vaccinationList.add(vaccination);
    }
    public Clinic getClinic() {
        return clinic;
    }

    public void setClinic(Clinic clinic) {
        this.clinic = clinic;
    }

    public User getUser() {
        return user;
    }

    public void setUser(User user) {
        this.user = user;
    }
}


