package com.example.vaccineresevationsystem.repository;

import com.example.vaccineresevationsystem.model.Disease;
import org.springframework.data.repository.CrudRepository;

import java.util.List;

public interface DiseaseRepository extends CrudRepository<Disease, Integer> {

    List<Disease> findAll();
    Disease findDiseaseByName(String diseasName);

}
