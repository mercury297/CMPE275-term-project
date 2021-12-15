package com.example.vaccineresevationsystem.model;
import javax.persistence.*;
import org.hibernate.annotations.GenericGenerator;
import com.fasterxml.jackson.annotation.JsonIgnoreProperties;
import org.hibernate.annotations.GenericGenerator;


import java.util.*;

@Entity
@Table(name="User")
public class User {
    @Id
    @GeneratedValue(generator = "uuid")
    @GenericGenerator(name = "uuid", strategy = "uuid2")
    private String MRN;
    @Column(nullable = false, unique = true, length = 45)
    private String email;
    private String firstName;
    private String lastName;
    private String middleName;
    private String password;
    private Date birthDate;
    private String street;
    private String number;
    private String zipCode;
    private String state;
    private String city;
    private String gender;
    private Boolean admin;
    private Boolean verified;

    private boolean enabled;
    @OneToMany(cascade=CascadeType.ALL)
    @JoinTable( joinColumns = @JoinColumn(name = "App"), inverseJoinColumns = @JoinColumn(name = "appointmentID"))
    @JsonIgnoreProperties({"Vaccination"})
    private List<Appointment> appointments;


    @Column(name = "verification_code", length = 64)
    private String verificationCode;


    public User() {
    }
    public User(String email, String password, String firstName, String lastName) {
        this.email = email;
        this.password = password;
        this.firstName = firstName;
        this.lastName = lastName;

    }
    public User(String email, String password, String firstName, String lastName, String middleName , Date birthDate, String street, String number,String city,String state, String zipCode, String gender){
        this.email = email;
        this.password = password;
        this.firstName = firstName;
        this.lastName = lastName;
        this.middleName = middleName;
        this.birthDate = birthDate;
        this.street = street;
        this.number = number;
        this.city = city;
        this.state = state;
        this.zipCode = zipCode;
        this.gender = gender;
    }
    public String getEmail() {
        return email;
    }

    public void setEmail(String email) {
        this.email = email;
    }

    public String getFirstName() {
        return firstName;
    }

    public void setFirstName(String firstName) {
        this.firstName = firstName;
    }

    public String getLastName() {
        return lastName;
    }

    public void setLastName(String lastName) {
        this.lastName = lastName;
    }

    public String getMiddleName() {
        return middleName;
    }

    public void setMiddleName(String middleName) {
        this.middleName = middleName;
    }

    public String getPassword() {
        return password;
    }

    public void setPassword(String password) {
        this.password = password;
    }

    public Date getBirthDate() {
        return birthDate;
    }

    public void setBirthDate(Date birthDate) {
        this.birthDate = birthDate;
    }

    public String getStreet() {
        return street;
    }

    public void setStreet(String street) {
        this.street = street;
    }

    public String getNumber() {
        return number;
    }

    public void setNumber(String number) {
        this.number = number;
    }

    public String getZipCode() {
        return zipCode;
    }

    public void setZipCode(String zipCode) {
        this.zipCode = zipCode;
    }

    public String getGender() {
        return gender;
    }

    public String getVerificationCode() {
        return verificationCode;
    }

    public void setVerificationCode(String verificationCode) {
        this.verificationCode = verificationCode;
    }

    public Boolean isVerified() {
        return verified;
    }

    public void  setVerified(Boolean verified) {
        this.verified = verified;
    }
    public void setAdmin(Boolean admin) {
        this.admin = admin;
    }

    public Boolean getAdmin() {
        return admin;
    }
    public List<Appointment> getAppointments() {
        return appointments;
    }
    public void setAppointments(List<Appointment> appointments) {
        this.appointments = appointments;
    }

}

