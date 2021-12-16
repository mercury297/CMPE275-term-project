package com.example.vaccineresevationsystem.repository;

import com.example.vaccineresevationsystem.model.Vaccination;
import org.springframework.data.repository.CrudRepository;
import org.springframework.data.jpa.repository.Query;
import com.example.vaccineresevationsystem.model.Clinic;
public interface VaccinationRepository extends CrudRepository<Vaccination, Integer> {
    @Query("SELECT v FROM Vaccination v WHERE v.vaccinationID = ?1")
    public Vaccination findById(String ID);

    public Vaccination findByName(String name);
}
