package com.example.vaccineresevationsystem.aspect;

import org.aspectj.lang.JoinPoint;
import org.aspectj.lang.ProceedingJoinPoint;
import org.aspectj.lang.annotation.Aspect;
import org.aspectj.lang.annotation.Before;
import org.springframework.stereotype.Component;

@Aspect
@Component
public class AuthorizableAspect {

    @Before("@annotation(Authorizable)")
    public void Authorize(JoinPoint joinPoint){
        String MRN = (String) joinPoint.getArgs()[0];
        /*check if MRN belongs to an admin
        * then change this to return a response entity with 401
        * **/
        System.out.println(MRN);
    }

}
