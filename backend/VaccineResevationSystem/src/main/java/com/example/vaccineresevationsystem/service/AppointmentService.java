package com.example.vaccineresevationsystem.service;
import com.example.vaccineresevationsystem.handler.ErrorHandler;
import com.example.vaccineresevationsystem.handler.SuccessHandler;
import com.example.vaccineresevationsystem.model.Clinic;
import com.example.vaccineresevationsystem.model.Appointment;
import com.example.vaccineresevationsystem.model.User;
import com.example.vaccineresevationsystem.model.Vaccination;
import com.example.vaccineresevationsystem.repository.AppointmentRepository;
import com.example.vaccineresevationsystem.repository.ClinicRepository;
import com.example.vaccineresevationsystem.repository.UserRepository;
import com.example.vaccineresevationsystem.repository.VaccinationRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.mail.javamail.JavaMailSender;
import org.springframework.mail.javamail.MimeMessageHelper;
import org.springframework.stereotype.Service;


import javax.mail.MessagingException;
import javax.mail.internet.MimeMessage;
import java.io.UnsupportedEncodingException;
import java.text.DateFormat;
import java.text.ParseException;
import java.text.SimpleDateFormat;
import java.util.ArrayList;
import java.util.Date;
import java.util.List;
import java.util.Optional;

@Service
public class AppointmentService {
    @Autowired
    final AppointmentRepository appointmentRepository;
    @Autowired
    final ClinicRepository clinicRepository;
    @Autowired
    final UserRepository userRepository;
    @Autowired
    final VaccinationRepository vaccinationRepository;

    @Autowired
    private JavaMailSender mailSender;


    public AppointmentService (AppointmentRepository appointmentRepository, ClinicRepository clinicRepository, UserRepository userRepository, VaccinationRepository vaccinationRepository) {
        this.appointmentRepository = appointmentRepository;
        this.clinicRepository = clinicRepository;
        this.userRepository = userRepository;
        this.vaccinationRepository = vaccinationRepository;
    }


    public ResponseEntity<?> createAppointment(String MRN, List<String> vaccinationIds, String ClinicId , String date, String currentTime) throws ParseException, MessagingException, UnsupportedEncodingException {

        Clinic clinic = clinicRepository.findById(ClinicId);
        DateFormat dateFormat = new SimpleDateFormat("yyyy-MM-dd-HH-mm");
        Date newDate = dateFormat.parse(date);
        if(clinic==null){
            return ErrorHandler.badRequest(HttpStatus.BAD_REQUEST, "Clinic not found");
        }
        if(newDate.compareTo(getDateAfter12Months(currentTime))>0){
            return ErrorHandler.badRequest(HttpStatus.BAD_REQUEST, "Appointment cannot be booked for 12 months");
        }
        User user = userRepository.findByMRN(MRN);
        if (user==null){
            return ErrorHandler.badRequest(HttpStatus.BAD_REQUEST, "User not found");
        }
        if (vaccinationIds.size()>4){
            return ErrorHandler.badRequest(HttpStatus.BAD_REQUEST, "Maximum 4 vaccinations can be booked at a time");
        }

        List<Vaccination> vaccinations;
        vaccinations = getAllVaccinations(vaccinationIds);
        if (checkAppointmentClashInClinic(date,clinic)){
            return ErrorHandler.badRequest(HttpStatus.BAD_REQUEST, "Appointment clash in clinic");
        }
        if (checkAppointmentClashWithUser(date, MRN)) {
            return ErrorHandler.badRequest(HttpStatus.BAD_REQUEST, "Appointment clash with users previous appointments");
        }
        System.out.println("vaccination id for this appointment"+vaccinationIds);
        Appointment appointment = new Appointment(vaccinations,date,clinic,user);
        List<Appointment>  clinicAppointments;
        clinicAppointments = clinic.getAppointments();
        clinicAppointments.add(appointment);
        clinic.setAppointment(clinicAppointments);

        List<Appointment>  userAppointments;
        userAppointments = user.getAppointments();
        userAppointments.add(appointment);
        user.setAppointments(userAppointments);

        userRepository.save(user);
        clinicRepository.save(clinic);

        sendEmail(user.getEmail(),"Appointment Booked","Your appointment has been booked for "+date,user);
        return ResponseEntity.of(Optional.of(appointment));

    }


//    public void sortDates(List<String> Dates) throws ParseException {
//        int n = Dates.size();
//        String temp;
//        for(int i=0; i < n; i++){
//            for(int j=1; j < (n-i); j++){
//                if(ifDateGreater(Dates.get(j-1), Dates.get(j-1))){
//                    //swap elements
//                    temp = Dates.get(j-1);
//                    Dates.set(j-1, Dates.get(j));
//                    Dates.set(j, temp);
//                }
//            }
//        }
//    }
public ResponseEntity<?> checkInAppointment(String appointmentId, String currentTime) throws ParseException, MessagingException, UnsupportedEncodingException {
    Appointment appointment = appointmentRepository.findByappointmentID(appointmentId);
    if (appointment==null){
        return ErrorHandler.badRequest(HttpStatus.BAD_REQUEST, "Appointment not found");
    }
    if (appointment.getCheckIn().equals("1")){
        return ErrorHandler.badRequest(HttpStatus.BAD_REQUEST, "Appointment already checked in");
    }
    DateFormat dateFormat = new SimpleDateFormat("yyyy-MM-dd-HH-mm");
    Date appointmentDate = dateFormat.parse(appointment.getAppointmentDate());
    Date currentDate = dateFormat.parse(currentTime);
    System.out.println("current date"+currentDate);
    if (appointmentDate.compareTo(currentDate)<0){
        return ErrorHandler.badRequest(HttpStatus.BAD_REQUEST, "Current time is after the appointment time");
    }

    if (appointmentDate.compareTo(getTimeAfter24Hrs(currentTime))>0){
        return ErrorHandler.badRequest(HttpStatus.BAD_REQUEST, "Appointment cannot be checked in before 24 hrs");
    }

    appointment.setCheckIn("1");
    appointmentRepository.save(appointment);
    sendEmail(appointment.getUser().getEmail(),"Appointment Checked In","Your appointment has been checked in",appointment.getUser());
    return ResponseEntity.of(Optional.of(appointment));
}
public Date getTimeAfter24Hrs(String currentTime) throws ParseException {
        System.out.println("current time"+currentTime);
        String[] arrOfStr = currentTime.split("-");
        currentTime.split("-") ;
        arrOfStr[2]=Integer.toString(Integer.parseInt(arrOfStr[2])+1);
        String newTime = arrOfStr[0]+"-"+arrOfStr[1]+"-"+arrOfStr[2]+"-"+arrOfStr[3]+"-"+arrOfStr[4];
        System.out.println("after 1 day"+newTime);
        DateFormat dateFormat = new SimpleDateFormat("yyyy-MM-dd-HH-mm");
        Date timeAfter24 = dateFormat.parse(newTime);
        System.out.println("after 24 hrs current time"+currentTime);
        return timeAfter24;

}
    public boolean ifDateGreater(String Date1, String Date2) throws ParseException {
        DateFormat dateFormat = new SimpleDateFormat("yyyy-MM-dd-HH-mm");
        Date date1 = dateFormat.parse(Date1);
        Date date2 = dateFormat.parse(Date2);
        return date2.getTime() - date1.getTime() > 0;
    }
    public ResponseEntity<?> getPastAppointments(String MRN,String currentTime) throws ParseException {
        User user = userRepository.findByMRN(MRN);
        if (user==null){
            return ErrorHandler.badRequest(HttpStatus.BAD_REQUEST, "User not found");
        }
        List<Appointment> appointments = user.getAppointments();
        List<Appointment> pastAppointments = new ArrayList<>();
        for (Appointment appointment:appointments){
            DateFormat dateFormat = new SimpleDateFormat("yyyy-MM-dd-HH-mm");
            Date appointmentDate = dateFormat.parse(appointment.getAppointmentDate());
            Date currentTimeDate = dateFormat.parse(currentTime);
            if (appointmentDate.compareTo(currentTimeDate)<0){
                pastAppointments.add(appointment);
            }
        }

        if (pastAppointments.size()==0){
            return SuccessHandler.successMessage(HttpStatus.OK, "No past appointments");
        }
        return ResponseEntity.of(Optional.of(pastAppointments));
    }

    public ResponseEntity<?> getFutureAppointments(String MRN, String currentTime) throws ParseException {
        User user = userRepository.findByMRN(MRN);
        if (user==null){
            return ErrorHandler.badRequest(HttpStatus.BAD_REQUEST, "User not found");
        }
        List<Appointment> appointments = user.getAppointments();
        List<Appointment> futureAppointments = new ArrayList<>();
//        System.out.println();
        for (Appointment appointment:appointments){
            System.out.println("appointment date"+appointment.getAppointmentDate());
            DateFormat dateFormat = new SimpleDateFormat("yyyy-MM-dd-HH-mm");
            Date appointmentDate = dateFormat.parse(appointment.getAppointmentDate());
            Date currentTimeDate = dateFormat.parse(currentTime);
            if (appointmentDate.compareTo(currentTimeDate)>0){
                futureAppointments.add(appointment);
            }

        }

        if (futureAppointments.size()==0){
            return SuccessHandler.successMessage(HttpStatus.OK, "No future appointments");
        }

        return ResponseEntity.of(Optional.of(futureAppointments));
    }

    public ResponseEntity<?> cancelAppointment(String appointmentId,String currentTime) throws MessagingException, UnsupportedEncodingException, ParseException {
        Appointment appointment = appointmentRepository.findByappointmentID(appointmentId);
        DateFormat dateFormat = new SimpleDateFormat("yyyy-MM-dd-HH-mm");
        Date appointmentDate = dateFormat.parse(appointment.getAppointmentDate());
        Date currentTimeDate = dateFormat.parse(currentTime);

        if (appointment==null){
            return ErrorHandler.badRequest(HttpStatus.BAD_REQUEST, "Appointment not found");
        }
        if (appointment.getCheckIn().equals("1")){
            return ErrorHandler.badRequest(HttpStatus.BAD_REQUEST, "Appointment already checked in");
        }
        if (appointmentDate.compareTo(currentTimeDate)<0){
            return ErrorHandler.badRequest(HttpStatus.BAD_REQUEST, "Appointment already past");
        }
        Clinic clinic =  removeAppointmentFromClinic(appointment);
        User user = removeAppointmentFromUser(appointment);
        appointmentRepository.delete(appointment);
        sendEmail(user.getEmail(),"Appointment Cancelled","Your appointment has been cancelled",user);
        return ResponseEntity.of(Optional.of(clinic));
    }
    public Clinic removeAppointmentFromClinic(Appointment appointmentId){
        Clinic clinic = appointmentId.getClinic();
        List<Appointment> appointments = clinic.getAppointments();
        appointments.remove(appointmentId);
        clinic.setAppointment(appointments);
        clinicRepository.save(clinic);
        return clinic;
    }
    public User removeAppointmentFromUser(Appointment appointmentId){
        User user = appointmentId.getUser();
        List<Appointment> appointments = user.getAppointments();
        appointments.remove(appointmentId);
        user.setAppointments(appointments);
        userRepository.save(user);
        return user;
    }



        public List<Vaccination>getAllVaccinations(List<String> vaccinations){

        List<Vaccination> vaccinnations = new ArrayList<>();
        for(String vaccinationId : vaccinations){
            Vaccination vaccination = vaccinationRepository.findById(vaccinationId);
            vaccinnations.add(vaccination);
        }
        return vaccinnations;

    }
    public Boolean checkAppointmentClashInClinic(String date, Clinic clinic) throws ParseException {
        int count = 0;
        for(Appointment appointment:clinic.getAppointments()){
            System.out.println("Previous appointment "+appointment.getAppointmentDate()+"current appointment"+date);
            if(appointment.getAppointmentDate().equals(date)){
                count++;
            }
        };
        if(count==clinic.getNumberOfPhysicians()){
            return true;
        }
        return false;
    }
   public void sendEmail(String email, String subject, String message, User user) throws MessagingException, UnsupportedEncodingException {
       String toAddress = email;
       String content = message;
       String fromAddress = "kasle36pratik@gmail.com";
       String senderName = "Vaccine Reservation System";
       MimeMessage mail = mailSender.createMimeMessage();
       MimeMessageHelper helper = new MimeMessageHelper(mail);
       helper.setFrom(fromAddress, senderName);
       helper.setTo(toAddress);
       helper.setSubject(subject);
       helper.setText(content,true);
       System.out.println(mail);
       mailSender.send(mail);

   }
    public Boolean checkAppointmentClashWithUser(String date, String MRN) throws ParseException {
        User user = getUser(MRN);
        System.out.println("inside checkAppointmentClashWithUser");
//        DateFormat dateFormat = new SimpleDateFormat("yyyy-MM-dd-HH");
//        Date departure = dateFormat.parse(date);
        for(Appointment appointment:user.getAppointments()){
            System.out.println("Previous appointment "+appointment.getAppointmentDate()+"current appointment"+date);
            if(appointment.getAppointmentDate().equals(date)){
                return true;
            }
        };
        return false;
    }
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
    public User getUser(String MRN){
        return userRepository.findByMRN(MRN);
    }



}