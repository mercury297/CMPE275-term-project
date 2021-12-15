package com.example.vaccineresevationsystem.handler;
import javax.xml.bind.annotation.XmlElement;
public class BadRequest {
    @XmlElement
    String code;

    @XmlElement
    String msg;

    BadRequest() {

    }

    public BadRequest(String code, String msg) {
        this.code = code;
        this.msg = msg;
    }

    public String getCode() {
        return code;
    }

    public String getMessage() {
        return msg;
    }
}
