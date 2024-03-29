package com.sms.travelapp.mapper;

import com.sms.travelapp.dto.UserResponseDto;
import com.sms.travelapp.model.UserEntity;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

@Service
@RequiredArgsConstructor
public class UserMapper {
    public static UserResponseDto mapToUserResponseDto(UserEntity userEntity){
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
                .build();
    }
}
