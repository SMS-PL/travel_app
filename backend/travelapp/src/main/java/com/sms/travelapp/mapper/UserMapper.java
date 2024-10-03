package com.sms.travelapp.mapper;

import com.sms.travelapp.dto.Auth.UserResponseDto;
import com.sms.travelapp.exception.UserNotFound;
import com.sms.travelapp.model.UserEntity;
import com.sms.travelapp.repository.*;
import com.sms.travelapp.service.AuthService;
import com.sms.travelapp.service.FriendshipService;
import lombok.RequiredArgsConstructor;
import org.springframework.context.annotation.Lazy;
import org.springframework.stereotype.Service;

@Service
@RequiredArgsConstructor
public class UserMapper {
    private final UserCountryRepository userCountryRepository;
    private final UserAchievementRepository userAchievementRepository;
    private final FriendshipRepository friendshipRepository;
    private final PinRepository pinRepository;
    private final AuthService authService;
    private final UserRepository userRepository;

    public  UserResponseDto mapToUserResponseDto(UserEntity userEntity){

        int visitedCountriesCount = userCountryRepository.countAllByUserIdAndCountNotNull(userEntity.getId());
        int achievementsCount = userAchievementRepository.countAllByUserId(userEntity.getId());
        int friendsCount = friendshipRepository.countFriends(userEntity);
        int pinCount = pinRepository.countAllByAuthor(userEntity);
        String status = getStatusWithGivenUser(userEntity.getId());

        return UserResponseDto.builder()
                .id(userEntity.getId())
                .firstName(userEntity.getFirstName())
                .lastName(userEntity.getLastName())
                .username(userEntity.getUsername())
                .email(userEntity.getEmail())
                .about(userEntity.getAbout())
                .photoUrl(userEntity.getProfileImage())
                .backgroundUrl(userEntity.getBackgroundImage())
                .createdAt(userEntity.getCreatedAt())
                .roles(userEntity.getRoles())
                .isBanned(userEntity.getIsBanned())
                .bannedTo(userEntity.getBannedTo())
                .visitedCountriesCount(visitedCountriesCount)
                .achievementsCount(achievementsCount)
                .friendsCount(friendsCount)
                .friendStatus(status)
                .pinsCount(pinCount)
                .build();
    }

    private String getStatusWithGivenUser(Long friendId){
        UserEntity user = authService.getLoggedUser();
        UserEntity potentialFriend = userRepository.findById(friendId).orElseThrow(
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
