package com.sms.travelapp.service.serviceImpl;

import com.sms.travelapp.dto.Auth.UserResponseDto;
import com.sms.travelapp.exception.UserNotFound;
import com.sms.travelapp.mapper.UserMapper;
import com.sms.travelapp.model.UserEntity;
import com.sms.travelapp.repository.UserRepository;
import com.sms.travelapp.service.UserService;
import lombok.RequiredArgsConstructor;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageImpl;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Sort;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.stereotype.Service;

import java.util.stream.Collectors;

@Service
@RequiredArgsConstructor
public class UserServiceImpl implements UserService {

    private final UserRepository userRepository;

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
}
