package com.sms.travelapp.service;

import com.sms.travelapp.dto.Achievement.AchievementResponseDto;
import org.springframework.data.domain.Page;

public interface UserAchievementService {
    Page<AchievementResponseDto> getUserAchievements(Long userId, int pageSize, int pageNumber);
}
