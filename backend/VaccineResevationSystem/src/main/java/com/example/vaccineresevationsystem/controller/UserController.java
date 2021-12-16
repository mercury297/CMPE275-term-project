package com.example.vaccineresevationsystem.controller;
import com.example.vaccineresevationsystem.handler.ErrorHandler;
import com.example.vaccineresevationsystem.handler.SuccessHandler;
import com.example.vaccineresevationsystem.service.UserService;
import org.springframework.data.repository.query.Param;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.bind.annotation.PostMapping;

import javax.mail.MessagingException;
import javax.servlet.http.HttpServletRequest;
import java.io.UnsupportedEncodingException;
import java.util.Optional;


@Controller // This means that this class is a Controller
@RequestMapping(path="/user") // This means URL's start with /demo (after Application path)
public class UserController {
    @Autowired
    private UserService userService;


//    @PostMapping(path="login")
//    public @ResponseBody
//    ResponseEntity<?> loginUser(@RequestParam String email, @RequestParam String firstName, @RequestParam String lastName) {
//
//        return userService.createUser(email,firstName,lastName);
//    }
    @GetMapping(path="register")
    public @ResponseBody
    ResponseEntity<?> createUser(@RequestParam String email, @RequestParam String password, @RequestParam String firstName, @RequestParam String lastName, HttpServletRequest request) throws MessagingException, UnsupportedEncodingException {
        return userService.createUser(email,password,firstName,lastName, getSiteURL(request));
    }

    @GetMapping(path="login")
    public @ResponseBody
    ResponseEntity<?> createUser(@RequestParam String email, @RequestParam String password) {
        System.out.println("email: " + email);
        System.out.println("password: " + password);
        return userService.loginUser(email,password);
    }

    @GetMapping(path="loginOnlyEmail")
    public @ResponseBody
    ResponseEntity<?> createUser(@RequestParam String email) {
        System.out.println("email: " + email);
        return userService.loginOnlyUser(email);
    }
    private String getSiteURL(HttpServletRequest request) {
        String siteURL = request.getRequestURL().toString();
        return siteURL.replace(request.getServletPath(), "");
    }

    @GetMapping("verify")
    public ResponseEntity<?> verifyUser(@Param("code") String code) {
        System.out.println("code: " + code);
        if (userService.verify(code)) {

            return SuccessHandler.successMessage(HttpStatus.OK, "Verification sucessfull");
        } else {
            return  ErrorHandler.badRequest(HttpStatus.BAD_REQUEST, "Verification failed");

        }
    }
}

