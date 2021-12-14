package com.example.vaccineresevationsystem.model;
import javax.persistence.*;
import org.hibernate.annotations.GenericGenerator;
import com.fasterxml.jackson.annotation.JsonIgnoreProperties;
import org.hibernate.annotations.GenericGenerator;
import java.util.Date;

@Entity
@Table(name="User")
public class User {
    @Id
    private String email;
    private String firstName;
    private String lastName;
    private String middleName;
    private String password;
    private Date birthDate;
    private String street;
    private String number;
    private String zipCode;
    private String MRN;
    private String gender;
    private Boolean admin;
    private Boolean verified;

    public User() {
    }
    public User(String email, String firstName, String lastName) {
        this.email = email;
        this.firstName = firstName;
        this.lastName = lastName;

    }




}
