package com.example.vaccineresevationsystem.handler;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.mail.javamail.*;
import javax.mail.internet.MimeMessage;
import java.io.UnsupportedEncodingException;
import javax.mail.MessagingException;
public class EmailHandler {
    @Autowired
    private JavaMailSender mailSender;

    public EmailHandler(){
        this.mailSender = new JavaMailSenderImpl();
    }
    public void sendEmail(String toAddress, String body, String subject) throws MessagingException, UnsupportedEncodingException {
        String fromAddress = "kasle36pratik@gmail.com";
        String senderName = "Vaccine Reservation System";

        MimeMessage message = mailSender.createMimeMessage();
        MimeMessageHelper helper = new MimeMessageHelper(message);

        helper.setFrom(fromAddress, senderName);
        helper.setTo(toAddress);
        helper.setSubject(subject);
        helper.setText(body,true);
        System.out.println(message);
        mailSender.send(message);

    };
}
