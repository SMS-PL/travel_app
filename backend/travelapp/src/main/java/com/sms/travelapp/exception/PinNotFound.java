package com.sms.travelapp.exception;

import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.ResponseStatus;

@ResponseStatus(value = HttpStatus.NOT_FOUND)
public class PinNotFound extends RuntimeException{
    public PinNotFound(String message){
        super(message);
    }
}
