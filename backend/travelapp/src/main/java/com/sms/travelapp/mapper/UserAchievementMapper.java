package com.sms.travelapp.mapper;

import com.sms.travelapp.dto.Achievement.AchievementResponseDto;
import com.sms.travelapp.exception.AchievementNotFound;
import com.sms.travelapp.model.Achievement;
import com.sms.travelapp.model.UserAchievement;
import com.sms.travelapp.repository.AchievementRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.List;

@Service
@RequiredArgsConstructor
public class UserAchievementMapper {

    private final AchievementRepository achievementRepository;

    public AchievementResponseDto mapToAchievementResponseDto(UserAchievement userAchievement){
        Achievement achievement = achievementRepository.findById(userAchievement.getAchievementId()).orElseThrow(
                ()-> new AchievementNotFound("Achievement id- " + userAchievement.getAchievementId() + " not found!")
        );



        return AchievementResponseDto.builder()
                .id(achievement.getId())
                .description(achievement.getDescription())
                .title(achievement.getTitle())
                .level(achievement.getLevel())
                .count(userAchievement.getUserOrder())
                .type(achievement.getType())
                .icon(achievement.getIcon())
                .grantedAt(userAchievement.getCreatedAt())
                .build();
    }
}
