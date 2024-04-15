package com.sms.travelapp.exception;

import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.ResponseStatus;

@ResponseStatus(value = HttpStatus.BAD_REQUEST)
public class HeartAlreadyUsed extends RuntimeException{
    public HeartAlreadyUsed(String message){
        super(message);
    }
}
