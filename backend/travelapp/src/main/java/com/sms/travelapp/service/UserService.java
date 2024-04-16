package com.sms.travelapp.service;

import com.sms.travelapp.dto.Auth.UserResponseDto;
import org.springframework.data.domain.Page;

import java.util.List;

public interface UserService {

    Long getUserId();

    UserResponseDto getUserProfileById(Long userId);

    Boolean checkUsernameAvailability(String username);

    Boolean checkEmailAvailability(String email);

    List<UserResponseDto> getFriendList();

    Page<UserResponseDto> searchForUser(String query, int pageNumber, int pageSize);

    void giveHeart();

    boolean checkIfHeartAvailable();
}
