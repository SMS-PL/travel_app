package com.sms.travelapp.exception;

public class PlaceNotFound extends RuntimeException {
    public PlaceNotFound(String message) {
        super(message);
    }

    public PlaceNotFound(String message, Throwable cause) {
        super(message, cause);
    }
}
