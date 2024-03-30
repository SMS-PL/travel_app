package com.sms.travelapp.exception;

import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.ResponseStatus;

@ResponseStatus(value = HttpStatus.NOT_FOUND)
public class CountryNotFound extends RuntimeException{

    public CountryNotFound(String message){super(message);}
}
