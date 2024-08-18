package com.sms.travelapp.dto.User;


import jakarta.persistence.Column;
import lombok.Data;

@Data
public class UserRequestPayload {

    private String firstName;
    private String lastName;
    private String username;
    private String email;
    private String password;
    private String about;
    private String profileImage;
    private String backgroundImage;
}
