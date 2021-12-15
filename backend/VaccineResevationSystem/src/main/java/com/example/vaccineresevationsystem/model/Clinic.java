package com.example.vaccineresevationsystem.model;

import org.hibernate.annotations.GenericGenerator;

import javax.persistence.*;

@Entity
@Table(name = "Clinic")
public class Clinic {
    @Id
    @GeneratedValue(generator="system-uuid")
    @GenericGenerator(name="system-uuid", strategy = "uuid")
    private String ID;
    @Column(unique = true)
    private String name;
    private String street;
    private String number;
    private String city;
    private String state;
    private String zipCode;
    private String bussinessHours;
    private int numberOfPhysicians;

    public Clinic() {
        //empty constructor
    }

    public String getName() {
        return name;
    }

    public void setName(String name) {
        this.name = name;
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

    public String getCity() {
        return city;
    }

    public void setCity(String city) {
        this.city = city;
    }

    public String getState() {
        return state;
    }

    public void setState(String state) {
        this.state = state;
    }

    public String getZipCode() {
        return zipCode;
    }

    public void setZipCode(String zipCode) {
        this.zipCode = zipCode;
    }

    public String getBussinessHours() {
        return bussinessHours;
    }

    public void setBussinessHours(String bussinessHours) {
        this.bussinessHours = bussinessHours;
    }

    public int getNumberOfPhysicians() {
        return numberOfPhysicians;
    }

    public void setNumberOfPhysicians(int numberOfPhysicians) {
        this.numberOfPhysicians = numberOfPhysicians;
    }
}
