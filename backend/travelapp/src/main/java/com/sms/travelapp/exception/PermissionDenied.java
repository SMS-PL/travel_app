package com.sms.travelapp.exception;

public class PermissionDenied extends RuntimeException{
    public PermissionDenied(String message){
        super(message);
    }
}
