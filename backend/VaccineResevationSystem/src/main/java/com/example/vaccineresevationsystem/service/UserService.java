package com.example.vaccineresevationsystem.service;
import com.example.vaccineresevationsystem.handler.ErrorHandler;
import com.example.vaccineresevationsystem.handler.SuccessHandler;
import com.example.vaccineresevationsystem.model.User;
import com.example.vaccineresevationsystem.repository.UserRepository;
import net.bytebuddy.utility.RandomString;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.mail.javamail.*;
import org.springframework.stereotype.Service;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.RequestParam;
import com.example.vaccineresevationsystem.handler.EmailHandler;

import com.example.vaccineresevationsystem.handler.ErrorHandler;
import javax.mail.MessagingException;
import javax.mail.internet.MimeMessage;
import java.io.UnsupportedEncodingException;
import java.util.*;

@Service
public class UserService {
    @Autowired
    final UserRepository userRepository;

    @Autowired
    private JavaMailSender mailSender;

    @Autowired
    public UserService(UserRepository userRepository){
        this.userRepository=userRepository;
    }
    public  ResponseEntity<?> createUser(@RequestParam String email,@RequestParam String password, @RequestParam String firstName,@RequestParam String lastName,String siteURL) throws MessagingException, UnsupportedEncodingException {
        User user = new User(email,password, firstName,lastName);
        String randomCode = RandomString.make(64);
        user.setVerificationCode(randomCode);
        user.setVerified(false);
        userRepository.save(user);
        sendVerificationEmail(user, siteURL);
        return ResponseEntity.of(Optional.of(user));
    }
    public  ResponseEntity<?> loginUser(@RequestParam String email,@RequestParam String password) {
        User user = userRepository.findByEmail(email);

        if (user == null) {
            return ErrorHandler.badRequest(HttpStatus.BAD_REQUEST,"User not found");
        }
        else if(!user.isVerified().equals(true)){
            return ErrorHandler.badRequest(HttpStatus.BAD_REQUEST,"User not verified");

        }
        else if(user.getPassword().equals(password)){
            return ResponseEntity.of(Optional.of(user));
        }
        else{
            return ErrorHandler.badRequest(HttpStatus.BAD_REQUEST,"some error");
        }

    }
    public void sendVerificationEmail(User user, String siteURL) throws MessagingException, UnsupportedEncodingException {
        String toAddress = user.getEmail();
        String subject = "Please verify your registration";
        String content = "Dear [[name]],<br>"
                + "Please click the link below to verify your registration:<br>"
                + "<h3><a href=\"[[URL]]\" target=\"_self\">VERIFY</a></h3>"
                + "Thank you,<br>"
                + "Your company name.";
        String fromAddress = "kasle36pratik@gmail.com";
        String senderName = "Vaccine Reservation System";
        content = content.replace("[[name]]", user.getFirstName());
        String verifyURL = siteURL + "/verify?code=" + user.getVerificationCode();
        content = content.replace("[[URL]]", verifyURL);

        MimeMessage message = mailSender.createMimeMessage();
        MimeMessageHelper helper = new MimeMessageHelper(message);

        helper.setFrom(fromAddress, senderName);
        helper.setTo(toAddress);
        helper.setSubject(subject);
        helper.setText(content,true);
        System.out.println(message);
        mailSender.send(message);
//        emailHandler.sendEmail(toAddress, content, subject);

    }

    public boolean verify(String verificationCode) {
        User user = userRepository.findByVerificationCode(verificationCode);
        System.out.println("User"+ user);
        if (user == null || user.isVerified()) {
            System.out.println("User not found or already verified");
            return false;
        } else {
            System.out.println("User verified");
            user.setVerificationCode(null);
            user.setVerified(true);
            userRepository.save(user);
            return true;
        }

    }
}
