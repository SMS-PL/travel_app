package com.sms.travelapp.service;

import com.sms.travelapp.dto.Achievement.UserAchievementResponseDto;
import org.springframework.data.domain.Page;

public interface UserAchievementService {
    Page<UserAchievementResponseDto> getUserAchievements(Long userId, int pageSize, int pageNumber);
}
