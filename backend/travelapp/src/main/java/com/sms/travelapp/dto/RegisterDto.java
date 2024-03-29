package com.sms.travelapp.dto;

import lombok.Data;

@Data
public class RegisterDto {
    private String username;
    private String password;
    private String passwordRepeated;
    private String firstName;
    private String lastName;
}

