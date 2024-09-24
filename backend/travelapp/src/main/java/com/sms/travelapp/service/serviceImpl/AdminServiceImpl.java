package com.sms.travelapp.service.serviceImpl;

import com.sms.travelapp.dto.Admin.StatsDto;
import com.sms.travelapp.repository.PinRepository;
import com.sms.travelapp.repository.PostRepository;
import com.sms.travelapp.repository.UserRepository;
import com.sms.travelapp.service.AdminService;
import com.sms.travelapp.service.UserService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;


@Service
@RequiredArgsConstructor
public class AdminServiceImpl implements AdminService {
    private final UserRepository userRepository;
    private final PostRepository postRepository;
    private final PinRepository pinRepository;

    @Override
    public StatsDto getDashboardStats() {
        Long userCount = userRepository.count();
        Long bannedUserCount = userRepository.countByIsBannedTrue();
        Long postCount = postRepository.count();
        Long pinCount = pinRepository.count();

        return StatsDto.builder()
                .userCount(userCount)
                .bannedUserCount(bannedUserCount)
                .postCount(postCount)
                .pinCount(pinCount)
                .build();
    }
}
