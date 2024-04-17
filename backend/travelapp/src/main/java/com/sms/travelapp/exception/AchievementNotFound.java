package com.sms.travelapp.exception;

import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.ResponseStatus;

@ResponseStatus(value = HttpStatus.NOT_FOUND)
public class AchievementNotFound extends RuntimeException{
    public AchievementNotFound(String message){
        super(message);
    }
}
