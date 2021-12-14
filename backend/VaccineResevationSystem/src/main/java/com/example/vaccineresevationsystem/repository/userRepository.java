package com.example.vaccineresevationsystem.repository;
import com.example.vaccineresevationsystem.model.User;
import org.springframework.boot.autoconfigure.security.SecurityProperties;
import org.springframework.data.repository.CrudRepository;

public interface  userRepository extends CrudRepository<User, Integer> {
}
