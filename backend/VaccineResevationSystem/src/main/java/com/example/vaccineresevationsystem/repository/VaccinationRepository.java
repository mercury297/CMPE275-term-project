package com.example.vaccineresevationsystem.repository;

import com.example.vaccineresevationsystem.model.Vaccination;
import org.springframework.data.repository.CrudRepository;

public interface VaccinationRepository extends CrudRepository<Vaccination, Integer> {
}
