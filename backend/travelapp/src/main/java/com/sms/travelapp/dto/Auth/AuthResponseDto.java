package com.sms.travelapp.dto.Auth;

import com.sms.travelapp.model.UserEntity;
import lombok.Data;

@Data
public class AuthResponseDto {
    private String accessToken;
    private String tokenType="Bearer ";
    private UserResponseDto user;

    public AuthResponseDto(String accessToken){
        this.accessToken = accessToken;
    }
}
