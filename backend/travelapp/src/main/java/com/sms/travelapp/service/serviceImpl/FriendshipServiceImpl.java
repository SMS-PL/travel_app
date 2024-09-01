package com.sms.travelapp.service.serviceImpl;

import com.sms.travelapp.dto.Auth.UserResponseDto;
import com.sms.travelapp.exception.SelfFriendRequest;
import com.sms.travelapp.exception.UserNotFound;
import com.sms.travelapp.mapper.StringResponseMapper;
import com.sms.travelapp.mapper.UserMapper;
import com.sms.travelapp.model.Friendship;
import com.sms.travelapp.model.UserEntity;
import com.sms.travelapp.repository.FriendshipRepository;
import com.sms.travelapp.repository.UserRepository;
import com.sms.travelapp.service.AuthService;
import com.sms.travelapp.service.FriendshipService;
import lombok.RequiredArgsConstructor;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageImpl;
import org.springframework.data.domain.PageRequest;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.stereotype.Service;
import org.springframework.web.client.HttpClientErrorException;

import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import java.util.stream.Collectors;

@Service
@RequiredArgsConstructor
public class FriendshipServiceImpl implements FriendshipService {

    private final FriendshipRepository friendshipRepository;
    private final UserRepository userRepository;
    private final AuthService authService;


    @Override
    public List<UserResponseDto> getFriendsOfUser(Long userId) {
        UserEntity user = userRepository.findById(userId).orElseThrow(
                ()-> new UserNotFound("User Not found!")
        );


        List<UserResponseDto> friends = new ArrayList<>();

        for (Friendship f :
                friendshipRepository.findAllByUser(user)) {
            if(friendshipRepository.existsByUserAndFriend(f.getFriend(),user)){
                if(friendshipRepository.existsByUserAndFriend(user,f.getFriend())){
                    friends.add(UserMapper.mapToUserResponseDto(f.getFriend()));
                }
            }
        }


        return friends;
    }
    @Override
    public Page<UserResponseDto> getFriendsOfUserPaginated(Long userId, int pageNumber, int pageSize) {
        UserEntity user = userRepository.findById(userId).orElseThrow(
                () -> new UserNotFound("User Not found!")
        );

       
        PageRequest pageRequest = PageRequest.of(pageNumber, pageSize);


        Page<Friendship> friendshipsPage = friendshipRepository.findAllByUser(user, pageRequest);


        List<UserResponseDto> friends = new ArrayList<>();
        for (Friendship f : friendshipsPage) {
                friends.add(UserMapper.mapToUserResponseDto(f.getFriend()));
        }


        return new PageImpl<>(friends, pageRequest, friendshipsPage.getTotalElements());
    }

    @Override
    public String sendFriendRequest(Long friendId) {
        UserEntity user = authService.getLoggedUser();
        UserEntity friend = userRepository.findById(friendId).orElseThrow(
                ()-> new UserNotFound("User you sent request to not found!")
        );
        if(user==friend){
            throw new SelfFriendRequest("You can't send a friend request to yourself!");
        }


        if(!friendshipRepository.existsByUserAndFriend(user,friend)){
            Friendship friendship = new Friendship();
            friendship.setUser(user);
            friendship.setFriend(friend);
            friendshipRepository.save(friendship);

            return "Success";
        }else{
            return "Request already sent";
        }
    }

    @Override
    public String removeFriend(Long friendId) {
        UserEntity user = authService.getLoggedUser();
        UserEntity friend = userRepository.findById(friendId).orElseThrow(
                ()-> new UserNotFound("User you sent request to not found!")
        );

        if(friendshipRepository.existsByUserAndFriend(user,friend)){
            Friendship friendship = friendshipRepository.findByUserAndFriend(user,friend);
            Friendship friendshipReverse = friendshipRepository.findByUserAndFriend(friend,user);

            friendshipRepository.delete(friendship);
            friendshipRepository.delete(friendshipReverse);

            return "Friendship with user -"+friend.getUsername()+" has been removed";

        } else if (friendshipRepository.existsByUserAndFriend(friend,user)) {
            Friendship friendship = friendshipRepository.findByUserAndFriend(friend,user);
            friendshipRepository.delete(friendship);

            return "Friend Request Rejected";
        }

        return "Friendship does not exist!";
    }


    @Override
    public List<UserResponseDto> getSentFriendRequest() {
        UserEntity user = authService.getLoggedUser();

        List<UserResponseDto> sentRequests = new ArrayList<>();

        for (Friendship f:
                friendshipRepository.findAllByUser(user)) {
            if(!friendshipRepository.existsByUserAndFriend(f.getFriend(),user)){
                sentRequests.add(UserMapper.mapToUserResponseDto(f.getFriend()));
            }
        }

        return sentRequests;
    }


    @Override
    public List<UserResponseDto> getReceivedFriendRequest() {
        UserEntity user = authService.getLoggedUser();

        List<UserResponseDto> receivedRequests = new ArrayList<>();

        for (Friendship f:
                friendshipRepository.findAllByFriend(user)) {
            if(!friendshipRepository.existsByUserAndFriend(user,f.getUser())){
                receivedRequests.add(UserMapper.mapToUserResponseDto(f.getUser()));
            }
        }

        return receivedRequests;
    }


    @Override
    public String getStatusWithGivenUser(Long userId) {
        UserEntity user = authService.getLoggedUser();
        UserEntity potentialFriend = userRepository.findById(userId).orElseThrow(
                ()-> new UserNotFound("User you want get status of not found!")
        );

        if(friendshipRepository.existsByUserAndFriend(user,potentialFriend)){
            if(friendshipRepository.existsByUserAndFriend(potentialFriend,user)){
                return "FRIEND";
            }
            else{
                return "SENT";
            }
        }else{
            if(friendshipRepository.existsByUserAndFriend(potentialFriend,user)){
                return "RECEIVED";
            }
            else{
                return "STRANGER";
            }
        }
    }
}
