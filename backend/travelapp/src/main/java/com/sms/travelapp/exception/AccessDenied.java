package com.sms.travelapp.exception;

import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.ResponseStatus;

@ResponseStatus(value = HttpStatus.UNAUTHORIZED)
public class AccessDenied extends RuntimeException{
    public AccessDenied(String message){
        super(message);
    }
}
