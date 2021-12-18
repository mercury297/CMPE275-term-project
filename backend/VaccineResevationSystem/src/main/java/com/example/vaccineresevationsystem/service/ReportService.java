package com.example.vaccineresevationsystem.service;


import com.example.vaccineresevationsystem.handler.SuccessHandler;
import com.example.vaccineresevationsystem.model.Appointment;
import com.example.vaccineresevationsystem.model.Clinic;
import com.example.vaccineresevationsystem.model.User;
import com.example.vaccineresevationsystem.repository.AppointmentRepository;
import com.example.vaccineresevationsystem.repository.ClinicRepository;
import com.example.vaccineresevationsystem.repository.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;

import java.text.DateFormat;
import java.text.ParseException;
import java.text.SimpleDateFormat;
import java.util.Date;
import java.util.HashMap;
import java.util.List;

@Service
public class ReportService {
    @Autowired
    final AppointmentRepository appointmentRepository;
    @Autowired
    final UserRepository userRepository ;
    @Autowired
    final ClinicRepository clinicRepository ;

    public ReportService(AppointmentRepository appointmentRepository, UserRepository userRepository, ClinicRepository clinicRepository) {
        this.appointmentRepository = appointmentRepository;
        this.userRepository = userRepository;
        this.clinicRepository = clinicRepository;
    }
    public ResponseEntity<?> getPatientReport(String MRN,String startDate,String endDate, String currentTime) throws ParseException {

        DateFormat dateFormat = new SimpleDateFormat("yyyy-MM-dd-HH-mm");
        Date newStartDate = dateFormat.parse(startDate);
        Date newEndDate = dateFormat.parse(startDate);
        Date newCurrentTime = dateFormat.parse(currentTime);
        if (newStartDate.compareTo(newEndDate)>0){
            return SuccessHandler.successMessage(HttpStatus.OK, "Start date cannot be greater than end date");
        }
        if (newEndDate.compareTo(getDateAfter12Months(currentTime))>0 ||getDateAfter12Months(startDate).compareTo(newCurrentTime)<0){
//            System.out.println("1 comparater"+getDateAfter12Months(currentTime).compareTo(newEndDate));
//            System.out.println("2 comparater"+getDateAfter12Months(startDate).compareTo(newCurrentTime));
//            System.out.println("end time"+newEndDate);
//            System.out.println("Current time after 12"+getDateAfter12Months(currentTime));
//            System.out.println("end time"+newEndDate);
//            System.out.println("start  time after 12"+getDateAfter12Months(startDate));
            return SuccessHandler.successMessage(HttpStatus.OK, "You cannot view reports for dates before or after 12 months");
        };
        User user = userRepository.findByMRN(MRN);
        List<Appointment> appointments = user.getAppointments() ;
        setUpNoshow(MRN,newCurrentTime);
        int noShowCount = 0;
        for (Appointment appointment: appointments){
            if (appointment.getCheckIn().equals("2") && dateFormat.parse(appointment.getAppointmentDate()).compareTo(newStartDate)>=0 && dateFormat.parse(appointment.getAppointmentDate()).compareTo(newEndDate)<=0){
                noShowCount++;
            }
        }
        HashMap<String,Integer> patientReport = new HashMap<>();
        patientReport.put("noShow",noShowCount);
        patientReport.put("totalAppointments", user.getAppointments().size());
        Integer noShowRate = (noShowCount/user.getAppointments().size())*100;
        patientReport.put("noShowRate", noShowRate);
        return ResponseEntity.ok(patientReport);
    }

    public ResponseEntity<?> getClinicReport(String startDate,String endDate, String currentTime, String clinicId) throws ParseException {
        DateFormat dateFormat = new SimpleDateFormat("yyyy-MM-dd-HH-mm");
        Date newStartDate = dateFormat.parse(startDate);
        Date newEndDate = dateFormat.parse(endDate);
        Date newCurrentTime = dateFormat.parse(currentTime);
        if (newStartDate.compareTo(newEndDate)>0){
            return SuccessHandler.successMessage(HttpStatus.OK, "Start date cannot be greater than end date");
        }
        if (newEndDate.compareTo(getDateAfter12Months(currentTime))>0 ||getDateAfter12Months(startDate).compareTo(newCurrentTime)<0){
            return SuccessHandler.successMessage(HttpStatus.OK, "You cannot view reports for dates before or after 12 months");
        }
        Clinic clinic =  clinicRepository.findById(clinicId);
        List<Appointment>appointments;
        HashMap<String,String> clinincNoShowRate = new HashMap<>();
        int noShowCount = 0;
        appointments = clinic.getAppointments();
        for (Appointment appointment: appointments){
            System.out.println(appointment.getCheckIn());
            setUpNoshow(appointment.getUser().getMRN(),newCurrentTime);
            if (appointment.getCheckIn().equals("2")){
                String appointmentTime = appointment.getAppointmentDate();
                if (dateFormat.parse(appointmentTime).compareTo(newStartDate)>=0) {
                    if (dateFormat.parse(appointmentTime).compareTo(newEndDate)<=0){
                        noShowCount++;
                    }
                }
            }
        }
        clinincNoShowRate.put("noShow", String.valueOf(noShowCount));
        clinincNoShowRate.put("totalAppointments", String.valueOf(clinic.getAppointments().size()));
        float noShowRate = (float) noShowCount/clinic.getAppointments().size()*100;
        System.out.println(noShowRate);
        clinincNoShowRate.put("noShowRate", String.valueOf(noShowRate));
        clinincNoShowRate.put("clinicName", clinic.getName());

        if (clinic.getAppointments().size()==0){
            return SuccessHandler.successMessage(HttpStatus.OK, "No clinic appointments for the given range found");
        }
        return ResponseEntity.ok(clinincNoShowRate);


    }
    public Date getDateAfter12Months(String currentTime) throws ParseException {
        DateFormat dateFormat = new SimpleDateFormat("yyyy-MM-dd-HH-mm");
//        System.out.println("inside the func " + futureYear);
        String currentTimeCopy = currentTime;
        String [] currentTimes = currentTimeCopy.split("-");
//        System.out.println(currentTimes[0] + " " + currentTimes[1]);
        currentTimes[0] = Integer.toString(Integer.parseInt(currentTimes[0]) + 1);
//        System.out.println(currentTimes[0]);

        String futureTime = "";

        for(String val: currentTimes){
            futureTime += val;
            futureTime += "-";
        }

        futureTime = futureTime.substring(0, futureTime.length() - 1);
//        System.out.println(futureTime);

        Date futureDate = dateFormat.parse(futureTime);
        return futureDate;
    }
    public  void setUpNoshow(String MRN, Date currentTime) throws ParseException {
        DateFormat dateFormat = new SimpleDateFormat("yyyy-MM-dd-HH-mm");
        for (Appointment appointment: userRepository.findByMRN(MRN).getAppointments()){
            if (dateFormat.parse(appointment.getAppointmentDate()).compareTo(currentTime)<0 && appointment.getCheckIn().equals("0")){
                appointment.setCheckIn("2");
                appointmentRepository.save(appointment);
            }
        }
    }




}
