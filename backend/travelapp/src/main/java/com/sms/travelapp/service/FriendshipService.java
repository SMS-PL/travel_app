package com.sms.travelapp.service;

import com.sms.travelapp.dto.Auth.UserResponseDto;
import org.springframework.data.domain.Page;

import java.util.HashMap;
import java.util.List;

public interface FriendshipService {

    public List<UserResponseDto> getFriendsOfUser(Long userId);
    Page<UserResponseDto> getFriendsOfUserPaginated(Long userId, int pageNumber, int pageSize);

    String sendFriendRequest(Long friendId);

    String getStatusWithGivenUser(Long userId);

    List<UserResponseDto> getSentFriendRequest();

    Page<UserResponseDto> getReceivedFriendRequest(int pageNumber, int pageSize);

    String removeFriend(Long friendId);
}
