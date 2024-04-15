package com.sms.travelapp.service.serviceImpl;

import com.sms.travelapp.dto.Auth.UserResponseDto;
import com.sms.travelapp.exception.UserNotFound;
import com.sms.travelapp.mapper.UserMapper;
import com.sms.travelapp.model.UserEntity;
import com.sms.travelapp.repository.UserRepository;
import com.sms.travelapp.service.AuthService;
import com.sms.travelapp.service.UserService;
import lombok.RequiredArgsConstructor;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageImpl;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Sort;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.stereotype.Service;

import java.sql.Time;
import java.sql.Timestamp;
import java.time.Instant;
import java.time.LocalDate;
import java.time.ZoneId;
import java.time.ZonedDateTime;
import java.util.stream.Collectors;

@Service
@RequiredArgsConstructor
public class UserServiceImpl implements UserService {

    private final UserRepository userRepository;
    private final AuthService authService;

    @Override
    public Long getUserId() {
        String username = SecurityContextHolder.getContext().getAuthentication().getName();
        UserEntity user = userRepository.findByUsername(username).orElse(null);
        return user.getId();
    }

    @Override
    public UserResponseDto getUserProfileById(Long userId) {
        return UserMapper.mapToUserResponseDto(userRepository.findById(userId).orElseThrow(
                ()-> new UserNotFound("User Not found!"))
        );
    }

    @Override
    public Boolean checkUsernameAvailability(String username) {
        return !userRepository.existsByUsername(username);
    }

    @Override
    public Boolean checkEmailAvailability(String email) {
        return !userRepository.existsByEmail(email);
    }

    @Override
    public Page<UserResponseDto> searchForUser(String query, int pageNumber, int pageSize) {
        Page<UserEntity> users = userRepository.findByUsernameOrFirstNameOrLastNameContaining(query,
                PageRequest.of(
                        pageNumber,
                        pageSize,
                        Sort.by("firstName").ascending()
                ));

        return new PageImpl<>(
                users.getContent().stream().map(UserMapper::mapToUserResponseDto).collect(Collectors.toList()),
                PageRequest.of(pageNumber,pageSize),
                users.getTotalElements()
        );
    }

    @Override
    public void giveHeart() {
        UserEntity user = authService.getLoggedUser();
        user.setLastGivenHeart(Timestamp.from(Instant.now()));
    }

    @Override
    public boolean checkIfHeartAvailable() {
        UserEntity user = authService.getLoggedUser();
        Timestamp now = Timestamp.from(Instant.now());
        Timestamp lastGivenHeart = user.getLastGivenHeart();
        if(lastGivenHeart == null) lastGivenHeart =Timestamp.from(Instant.ofEpochMilli(0));

        ZonedDateTime nowZdt = now.toInstant().atZone(ZoneId.systemDefault());
        ZonedDateTime lastGivenHeartZdt = lastGivenHeart.toInstant().atZone(ZoneId.systemDefault());

        LocalDate nowDate = nowZdt.toLocalDate();
        LocalDate lastGivenHeartDate = lastGivenHeartZdt.toLocalDate();

        // the same day?
        return !nowDate.equals(lastGivenHeartDate);
    }
}
