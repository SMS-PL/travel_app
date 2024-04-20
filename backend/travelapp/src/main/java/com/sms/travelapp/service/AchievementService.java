package com.sms.travelapp.service;

import com.sms.travelapp.dto.Achievement.AchievementResponseDto;
import com.sms.travelapp.model.UserCountry;
import org.springframework.data.domain.Page;

public interface AchievementService {
    void checkForNewAchievements(UserCountry userCountry);

    Page<AchievementResponseDto> getAllAchievementsByLevel(int level, int pageSize, int pageNumber);
}
