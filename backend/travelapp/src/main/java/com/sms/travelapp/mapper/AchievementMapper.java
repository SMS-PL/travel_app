package com.sms.travelapp.mapper;


import com.sms.travelapp.dto.Achievement.AchievementResponseDto;
import com.sms.travelapp.model.Achievement;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

@Service
@RequiredArgsConstructor
public class AchievementMapper {

    public static AchievementResponseDto mapToAchievementResponseDto(Achievement achievement){
        return AchievementResponseDto.builder()
                .id(achievement.getId())
                .type(achievement.getType())
                .level(achievement.getLevel())
                .title(achievement.getTitle())
                .description(achievement.getDescription())
                .icon(achievement.getIcon())
                .country(achievement.getCountry())
                .createdAt(achievement.getCreatedAt())
                .userCount(achievement.getUserCount())
                .build();
    }
}
