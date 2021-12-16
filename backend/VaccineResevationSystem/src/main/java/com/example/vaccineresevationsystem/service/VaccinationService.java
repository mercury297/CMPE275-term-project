package com.example.vaccineresevationsystem.service;

import com.example.vaccineresevationsystem.model.Disease;
import com.example.vaccineresevationsystem.model.Vaccination;
import com.example.vaccineresevationsystem.repository.DiseaseRepository;
import com.example.vaccineresevationsystem.repository.VaccinationRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;
import org.springframework.web.bind.annotation.RequestParam;

import java.util.*;

@Service
public class VaccinationService {
    final VaccinationRepository vaccinationRepository;

    @Autowired
    private DiseaseRepository diseaseRepository;

    @Autowired
    public VaccinationService(VaccinationRepository vaccinationRepository) { this.vaccinationRepository = vaccinationRepository; }

    public ResponseEntity<?> createVaccination( String name,List<String> diseases, String manufacturer, int numberOfShots, int shotInternalVal, int duration) {
        Vaccination vaccination = new Vaccination();

        // setting all the fields of vaccination
        vaccination.setName(name);
        vaccination.setDuration(duration);
        vaccination.setManufacturer(manufacturer);
        vaccination.setNumberOfShots(numberOfShots);
        vaccination.setShotInternalVal(shotInternalVal);
        vaccination.setDiseases(getDiseases(diseases));

        //saving vaccination
        vaccinationRepository.save(vaccination);

        return ResponseEntity.of(Optional.of(vaccination));
    }

    public ResponseEntity<?> getAllVaccination(String MRN)
    {
        List<Vaccination> vaccinations = (List<Vaccination>) vaccinationRepository.findAll();
        return ResponseEntity.of(Optional.of(vaccinations));

    }

    public Set<Disease> getDiseases(List<String> diseaseNames) {
        Set<Disease> diseases = new HashSet<>();
        for(String diseaseName : diseaseNames)
        {
            Disease disease = diseaseRepository.findDiseaseByName(diseaseName);
            diseases.add(disease);
        }
        return diseases;
    }
}

