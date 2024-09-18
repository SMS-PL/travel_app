package com.sms.travelapp.mapper;

import com.sms.travelapp.dto.Auth.UserResponseDto;
import com.sms.travelapp.model.UserEntity;
import com.sms.travelapp.repository.FriendshipRepository;
import com.sms.travelapp.repository.PinRepository;
import com.sms.travelapp.repository.UserAchievementRepository;
import com.sms.travelapp.repository.UserCountryRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

@Service
@RequiredArgsConstructor
public class UserMapper {
    private final UserCountryRepository userCountryRepository;
    private final UserAchievementRepository userAchievementRepository;
    private final FriendshipRepository friendshipRepository;
    private final PinRepository pinRepository;

    public  UserResponseDto mapToUserResponseDto(UserEntity userEntity){

        int visitedCountriesCount = userCountryRepository.countAllByUserIdAndCountNotNull(userEntity.getId());
        int achievementsCount = userAchievementRepository.countAllByUserId(userEntity.getId());
        int friendsCount = friendshipRepository.countFriends(userEntity);
        int pinCount = pinRepository.countAllByAuthor(userEntity);

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
                .friendStatus(null)
                .pinsCount(pinCount)
                .build();
    }
}
