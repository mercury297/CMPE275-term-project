package com.example.vaccineresevationsystem.model;

import org.hibernate.annotations.GenericGenerator;

import javax.persistence.*;
import javax.validation.constraints.Min;
import javax.validation.constraints.Size;
import java.util.Set;

@Entity
@Table(name = "Vaccination")
public class Vaccination {

    @Id
    @GeneratedValue(generator="system-uuid")
    @GenericGenerator(name="system-uuid", strategy = "uuid")
    private String vaccinationID;
    @Column(unique = true)
    private String name;
    @Size(min = 3)
    private String Manufacturer;
    // min = 1 --> figure out later
    private int NumberOfShots;
    private int ShotInternalVal;
    //@Min(value = 0, message = "")
    private int duration;
    @ManyToMany
    @JoinTable( joinColumns = @JoinColumn(name = "vaccinationID"), inverseJoinColumns = @JoinColumn(name = "ID"))
    private Set<Disease> diseases;

    public Vaccination()
    {
        //constructor
    }

    public String getVaccinationID() {
        return vaccinationID;
    }

    public void setVaccinationID(String vaccinationID) {
        this.vaccinationID = vaccinationID;
    }

    public String getName() {
        return name;
    }

    public void setName(String name) {
        this.name = name;
    }

    public String getManufacturer() {
        return Manufacturer;
    }

    public void setManufacturer(String manufacturer) {
        Manufacturer = manufacturer;
    }

    public int getNumberOfShots() {
        return NumberOfShots;
    }

    public void setNumberOfShots(int numberOfShots) {
        NumberOfShots = numberOfShots;
    }

    public int getShotInternalVal() {
        return ShotInternalVal;
    }

    public void setShotInternalVal(int shotInternalVal) {
        ShotInternalVal = shotInternalVal;
    }

    public int getDuration() {
        return duration;
    }

    public void setDuration(int duration) {
        this.duration = duration;
    }

    public Set<Disease> getDiseases() {
        return diseases;
    }

    public void setDiseases(Set<Disease> diseases) {
        this.diseases = diseases;
    }

}
