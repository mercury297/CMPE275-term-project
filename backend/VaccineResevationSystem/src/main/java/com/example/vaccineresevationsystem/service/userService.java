package com.example.vaccineresevationsystem.service;
import com.example.vaccineresevationsystem.model.User;
import com.example.vaccineresevationsystem.repository.userRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;
import org.springframework.web.bind.annotation.RequestParam;

import javax.transaction.Transactional;
import java.text.DateFormat;
import java.text.ParseException;
import java.util.*;

@Service
public class userService {
    final  userRepository userRepository;
    @Autowired
    public userService(userRepository userRepository){
        this.userRepository=userRepository;
    }
    public  ResponseEntity<?> createUser(@RequestParam String email, @RequestParam String firstName,@RequestParam String lastName) {
        User user = new User(email,firstName,lastName);
        userRepository.save(user);

        return ResponseEntity.of(Optional.of(user));
    }
}
