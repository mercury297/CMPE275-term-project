package com.example.vaccineresevationsystem.repository;

import com.example.vaccineresevationsystem.model.Clinic;
import org.springframework.data.repository.CrudRepository;
import com.example.vaccineresevationsystem.model.User;
import org.springframework.data.jpa.repository.Query;

public interface ClinicRepository extends CrudRepository<Clinic, Integer> {
    @Query("SELECT c FROM Clinic c WHERE c.ID = ?1")
    public Clinic findById(String ID);
    @Query("SELECT c FROM Clinic c WHERE c.name = ?1")
    public Clinic findByName(String name);
}
