package com.example.vaccineresevationsystem.service;
import com.example.vaccineresevationsystem.model.Disease;
import com.example.vaccineresevationsystem.repository.DiseaseRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.RequestParam;

import javax.transaction.Transactional;
import java.text.DateFormat;
import java.text.ParseException;
import java.util.*;

@Service
public class DiseaseService {
    final DiseaseRepository diseaseRepository;
    @Autowired
    public DiseaseService(DiseaseRepository diseaseRepository){
        this.diseaseRepository=diseaseRepository;
    }

    public  ResponseEntity<?> createDisease(@RequestParam String name, @RequestParam String description) {
        Disease disease = new Disease(name, description);
        diseaseRepository.save(disease);

        return ResponseEntity.of(Optional.of(disease));
    }

    public ResponseEntity<?> getAllDiseases(){
        List<Disease> diseases  = diseaseRepository.findAll();
        return ResponseEntity.of(Optional.of(diseases));
    }
}
