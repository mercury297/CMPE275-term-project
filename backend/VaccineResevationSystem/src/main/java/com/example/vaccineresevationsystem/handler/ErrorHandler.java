package com.example.vaccineresevationsystem.handler;
import javax.xml.bind.annotation.XmlElement;
import com.fasterxml.jackson.annotation.JsonProperty;

import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;

public class ErrorHandler {

    @XmlElement(name = "BadRequest")
    private BadRequest badRequest;

    ErrorHandler() {

    }

    private ErrorHandler(BadRequest badRequest) {
        this.badRequest = badRequest;
    }

    public static ResponseEntity<ErrorHandler> badRequest(HttpStatus httpStatus, String msg, Object... args) {
        return new ResponseEntity<>(new ErrorHandler(new BadRequest(String.valueOf(httpStatus.value()),
                String.format(msg, args))), httpStatus);
    }

    @JsonProperty("BadRequest")
    public BadRequest getBadRequest() {
        return badRequest;
    }

}
