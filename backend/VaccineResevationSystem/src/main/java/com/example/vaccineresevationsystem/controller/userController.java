package com.example.vaccineresevationsystem.controller;
import  com.example.vaccineresevationsystem.service.userService;
import org.springframework.http.ResponseEntity;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.*;


@Controller // This means that this class is a Controller
@RequestMapping(path="/demo") // This means URL's start with /demo (after Application path)
public class userController {
    @Autowired
    private userService userService;

    @PostMapping(path="user")
    public @ResponseBody
    ResponseEntity<?> createUser(@RequestParam String email, @RequestParam String firstName, @RequestParam String lastName) {

        return userService.createUser(email,firstName,lastName);
    }
}

