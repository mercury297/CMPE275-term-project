package com.example.vaccineresevationsystem.handler;
import javax.xml.bind.annotation.XmlElement;
public class SuccessMessage {
    @XmlElement
    String code;

    @XmlElement
    String msg;

    SuccessMessage() {

    }

    public SuccessMessage(String code, String msg) {
        this.code = code;
        this.msg = msg;
    }

    public String getCode() { return code; }

    public String getMessage() { return msg; }
}
