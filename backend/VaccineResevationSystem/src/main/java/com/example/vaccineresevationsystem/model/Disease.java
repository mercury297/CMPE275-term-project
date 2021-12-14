package com.example.vaccineresevationsystem.model;

import org.hibernate.annotations.GenericGenerator;

import javax.persistence.*;

@Entity
@Table(name="Disease")
public class Disease {

    @Column(unique = true)
    private String name;
    @Id
    @GeneratedValue(generator="system-uuid")
    @GenericGenerator(name="system-uuid", strategy = "uuid")
    private String ID;
    private String description;

    public Disease(String name, String description) {
        this.description = description;
        this.name = name;
    }


    public Disease() {

    }

    public String getName() {
        return name;
    }

    public String getID() {
        return ID;
    }

    public String getDescription() {
        return description;
    }

    public void setName(String name) {
        this.name = name;
    }

    public void setID(String ID) {
        this.ID = ID;
    }

    public void setDescription(String description) {
        this.description = description;
    }


}
