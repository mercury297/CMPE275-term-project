package com.example.vaccineresevationsystem.service;

import com.example.vaccineresevationsystem.handler.SuccessHandler;
import com.example.vaccineresevationsystem.model.Appointment;
import com.example.vaccineresevationsystem.model.User;
import com.example.vaccineresevationsystem.model.Vaccination;
import com.example.vaccineresevationsystem.repository.AppointmentRepository;
import com.example.vaccineresevationsystem.repository.UserRepository;
import com.example.vaccineresevationsystem.repository.VaccinationRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;

import java.text.DateFormat;
import java.text.ParseException;
import java.text.SimpleDateFormat;
import java.util.*;

@Service
public class DashboardService {
    @Autowired
    private UserRepository userRepository;
    @Autowired
    private AppointmentRepository appointmentRepository;
    @Autowired
    private VaccinationRepository vaccinationRepository;

    @Autowired
    public DashboardService(UserRepository userRepository, AppointmentRepository appointmentRepository) {
        this.userRepository = userRepository;
        this.appointmentRepository = appointmentRepository;
    }

    public ResponseEntity<?> getVaccinationsDue(String currentTime, String MRN) throws ParseException {
        User user = userRepository.findByMRN(MRN);
        Date futureDate = getDateAfter12Months(currentTime);
        System.out.println(futureDate);
        List<Appointment> userAppointments = user.getAppointments();
        List<Appointment> checkedInAppointments = getAllCheckedInAppointments(userAppointments);
        HashMap<String, ArrayList<String>> vaccineMap = getVaccineMap(checkedInAppointments);
        sortVaccineMap(vaccineMap);
        List<VaccinationsDue> vaccinationsDues = getVaccinationsDue(vaccineMap);
        filterBasedOnCurrentTime(vaccinationsDues, currentTime);
        return ResponseEntity.of(Optional.of(vaccinationsDues));
    }

    public void filterBasedOnCurrentTime(List<VaccinationsDue> vaccinationsDues, String currentTime) throws ParseException {
        for(VaccinationsDue vaccinationsDue: vaccinationsDues){
            if(!ifDateGreater(currentTime,vaccinationsDue.dueDate)){
                vaccinationsDues.remove(vaccinationsDue);
            }
        }
    }

    /**
     * get date 12 months from current date
     * */
    public Date getDateAfter12Months(String currentTime) throws ParseException {
        DateFormat dateFormat = new SimpleDateFormat("yyyy-MM-dd-HH-mm");

//        System.out.println("inside the func " + futureYear);
        String currentTimeCopy = currentTime;
        String [] currentTimes = currentTimeCopy.split("-");
        System.out.println(currentTimes[0] + " " + currentTimes[1]);
        currentTimes[0] = Integer.toString(Integer.parseInt(currentTimes[0]) + 1);
        System.out.println(currentTimes[0]);

        String futureTime = "";

        for(String val: currentTimes){
            futureTime += val;
            futureTime += "-";
        }

        futureTime = futureTime.substring(0, futureTime.length() - 1);
        System.out.println(futureTime);

        Date futureDate = dateFormat.parse(futureTime);
        return futureDate;
    }


    public List<Appointment> getAllCheckedInAppointments(List<Appointment> appointments){
       List<Appointment> checkedInAppointments = new ArrayList<>();

        for(Appointment appointment: appointments){
            if(appointment.getCheckIn().equals("1")){
                checkedInAppointments.add(appointment);
            }
        }
        return checkedInAppointments;
    }

    public HashMap<String, ArrayList<String>> getVaccineMap(List<Appointment> checkedInAppointments)
    {
        HashMap<String, ArrayList<String>> vaccineMap = new HashMap<>();

        for(Appointment appointment: checkedInAppointments){
            for(Vaccination vaccination: appointment.getVaccinationList()){

                List<String> vaccineDates = vaccineMap.getOrDefault(vaccination.getName(), new ArrayList<>());
                vaccineDates.add(appointment.getAppointmentDate());
                vaccineMap.put(vaccination.getName(), (ArrayList<String>) vaccineDates);

            }
        }
        return vaccineMap;
    }

    public List<VaccinationsDue> getVaccinationsDue(HashMap<String, ArrayList<String>> vaccineMap) throws ParseException {
        List<VaccinationsDue> vaccinationsDues = new ArrayList<>();

        for(String vaccineName: vaccineMap.keySet()){
            ArrayList<String> vaccineDates = vaccineMap.get(vaccineName);

            int numberOfShots = vaccinationRepository.findByName(vaccineName).getNumberOfShots();
            int shotInternalVal = vaccinationRepository.findByName(vaccineName).getShotInternalVal();
            int duration = vaccinationRepository.findByName(vaccineName).getDuration();
            String mostRecentDate = vaccineMap.get(vaccineName).get(vaccineMap.get(vaccineName).size() - 1);

            if(vaccineDates.size() == numberOfShots){
                // complete so show according to duration

                vaccinationsDues.add(new VaccinationsDue(vaccineName, numberOfShots, addDaysToDate(mostRecentDate, duration)));
            }
            else if(vaccineDates.size() < numberOfShots) {
                // partial so show according to ShotInternalVal
                vaccinationsDues.add(new VaccinationsDue(vaccineName, numberOfShots - vaccineDates.size(), addDaysToDate(mostRecentDate, shotInternalVal)));
            }
        }

        return vaccinationsDues;

    }

    public class VaccinationsDue {
        public String name;
        public int numberOfShotsDue;
        public String dueDate;


        public VaccinationsDue(String name, int numberOfShotsDue, String dueDate) {
            this.name = name;
            this.numberOfShotsDue = numberOfShotsDue;
            this.dueDate = dueDate;
        }
    }

    public String addDaysToDate(String date, int days) throws ParseException {
        DateFormat dateFormat = new SimpleDateFormat("yyyy-MM-dd-HH-mm");
        Date currentDate = dateFormat.parse(date);
//        String [] currentTimes = currentDate.split("-");
        System.out.println(currentDate);
        long daysInSeconds = days*24*60*60*1000L;
        System.out.println(currentDate.getTime());
        long dueDateInSeconds = daysInSeconds + currentDate.getTime();
        System.out.println(dueDateInSeconds);
        Date dueDate = new Date(dueDateInSeconds);
        System.out.println(dueDate);
        return dateFormat.format(dueDate);

    }

    public void sortVaccineMap(HashMap<String, ArrayList<String>> vaccineMap) throws ParseException {
        for(String vaccine: vaccineMap.keySet()){
            vaccineMap.put(vaccine, (ArrayList<String>) sortVaccinationDates(vaccineMap.get(vaccine)));
        }
    }

    public List<String> sortVaccinationDates(List<String> Dates) throws ParseException {
        int n = Dates.size();
        String temp;
        for(int i=0; i < n; i++){
            for(int j=1; j < (n-i); j++){
                if(ifDateGreater(Dates.get(j-1), Dates.get(j-1))){
                    //swap elements
                    temp = Dates.get(j-1);
                    Dates.set(j-1, Dates.get(j));
                    Dates.set(j, temp);
                }
            }
        }
        return Dates;
    }

    public boolean ifDateGreater(String Date1, String Date2) throws ParseException {
        DateFormat dateFormat = new SimpleDateFormat("yyyy-MM-dd-HH-mm");
        Date date1 = dateFormat.parse(Date1);
        Date date2 = dateFormat.parse(Date2);
        return date2.getTime() - date1.getTime() > 0;
    }

}
