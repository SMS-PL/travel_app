package com.sms.travelapp.exception;


import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.ResponseStatus;

@ResponseStatus(HttpStatus.FORBIDDEN)
public class SelfFriendRequest extends RuntimeException{
    public SelfFriendRequest(String message){
        super(message);
    }
}
