package com.sms.travelapp.service;

import com.sms.travelapp.dto.Auth.UserResponseDto;
import com.sms.travelapp.dto.User.UserRequestPayload;
import com.sms.travelapp.model.UserEntity;
import org.springframework.data.domain.Page;

import java.util.List;

public interface UserService {

    Long getUserId();


    UserEntity getUserById(Long userId);
    UserResponseDto getUserProfileById(Long userId);

    Boolean checkUsernameAvailability(String username);

    Boolean checkEmailAvailability(String email);

    List<UserResponseDto> getFriendList();

    Page<UserResponseDto> searchForUser(String query, int pageNumber, int pageSize);

    void giveHeart();

    boolean checkIfHeartAvailable();


    UserResponseDto updateUser(Long id, UserRequestPayload userRequestPayload);

    UserResponseDto banUser(Long id, int days);

    UserResponseDto unbanUser(Long id);
}
