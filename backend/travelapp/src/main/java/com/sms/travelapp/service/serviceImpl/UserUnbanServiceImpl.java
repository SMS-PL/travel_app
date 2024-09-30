package com.sms.travelapp.service.serviceImpl;

import com.sms.travelapp.model.UserEntity;
import com.sms.travelapp.repository.UserRepository;
import com.sms.travelapp.service.UserUnbanService;
import lombok.RequiredArgsConstructor;
import org.springframework.scheduling.annotation.Scheduled;
import org.springframework.stereotype.Service;

import java.sql.Timestamp;
import java.util.List;

@Service
@RequiredArgsConstructor
public class UserUnbanServiceImpl implements UserUnbanService {
    private final UserRepository userRepository;

    @Scheduled(fixedRate = 100000)  // Uruchamiane co 100 sekund
    public void unbanExpiredUsers() {
        Timestamp currentTime = new Timestamp(System.currentTimeMillis());

        List<UserEntity> usersToUnban = userRepository.findUsersToUnban(currentTime);

        for (UserEntity user : usersToUnban) {
            System.out.println("Unbanning user: " + user.getUsername());
            user.setIsBanned(false);
            user.setBannedAt(null);
            user.setBannedTo(null);
            userRepository.save(user);
        }
    }
}
