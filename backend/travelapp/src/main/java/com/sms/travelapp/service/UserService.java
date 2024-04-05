package com.sms.travelapp.service;

import com.sms.travelapp.dto.Auth.UserResponseDto;

public interface UserService {

    Long getUserId();

    UserResponseDto getUserProfileById(Long userId);

    Boolean checkUsernameAvailability(String username);

    Boolean checkEmailAvailability(String email);

}
