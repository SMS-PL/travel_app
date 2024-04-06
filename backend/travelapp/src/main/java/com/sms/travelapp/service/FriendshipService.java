package com.sms.travelapp.service;

import com.sms.travelapp.dto.Auth.UserResponseDto;

import java.util.HashMap;
import java.util.List;

public interface FriendshipService {
    List<UserResponseDto> getFriendsOfUser(Long userId);

    String sendFriendRequest(Long friendId);

    String getStatusWithGivenUser(Long userId);

    List<UserResponseDto> getSentFriendRequest();

    List<UserResponseDto> getReceivedFriendRequest();

    String removeFriend(Long friendId);
}
