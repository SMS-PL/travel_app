package com.sms.travelapp.service.serviceImpl;

import com.sms.travelapp.dto.Achievement.AchievementResponseDto;
import com.sms.travelapp.mapper.UserAchievementMapper;
import com.sms.travelapp.model.UserAchievement;
import com.sms.travelapp.repository.UserAchievementRepository;
import com.sms.travelapp.service.UserAchievementService;
import lombok.RequiredArgsConstructor;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageImpl;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Sort;
import org.springframework.stereotype.Service;

import java.util.Objects;
import java.util.stream.Collectors;

@Service
@RequiredArgsConstructor
public class UserAchievementServiceImpl implements UserAchievementService {

    private final UserAchievementRepository userAchievementRepository;
    private final UserAchievementMapper userAchievementMapper;
    @Override
    public Page<AchievementResponseDto> getUserAchievements(Long userId, int pageSize, int pageNumber) {
        Sort sort = Sort.by("createdAt").descending();


        Page<UserAchievement> userAchievements = userAchievementRepository.findAllByUserId(userId, PageRequest.of(pageNumber,pageSize,sort));

        return new PageImpl<>(
                userAchievements
                        .stream()
                        .map(userAchievementMapper::mapToAchievementResponseDto).collect(Collectors.toList()),
                                PageRequest.of(pageNumber,pageSize,sort),
                                userAchievements.getTotalElements()
                        );
    }
}
