package com.example.vaccineresevationsystem.handler;
import com.fasterxml.jackson.annotation.JsonProperty;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;

import javax.xml.bind.annotation.XmlElement;
public class SuccessHandler {
    @XmlElement(name = "SuccessMessage")
    private SuccessMessage successMessage;

    SuccessHandler() {

    }
    private SuccessHandler(SuccessMessage successMessage){
        this.successMessage = successMessage;
    }

    public static ResponseEntity<SuccessHandler> successMessage(HttpStatus httpStatus, String msg, Object... args) {
        return new ResponseEntity<>(new SuccessHandler(new SuccessMessage(String.valueOf(httpStatus.value()),
                String.format(msg, args))), httpStatus);
    }

    @JsonProperty("SuccessMessage")
    public SuccessMessage getSuccessMessage() { return successMessage; }


}
