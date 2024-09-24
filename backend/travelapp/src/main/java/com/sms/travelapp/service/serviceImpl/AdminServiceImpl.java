package com.sms.travelapp.service.serviceImpl;

import com.sms.travelapp.dto.Admin.StatsDto;
import com.sms.travelapp.dto.Auth.UserResponseDto;
import com.sms.travelapp.mapper.UserMapper;
import com.sms.travelapp.model.UserEntity;
import com.sms.travelapp.repository.PinRepository;
import com.sms.travelapp.repository.PostRepository;
import com.sms.travelapp.repository.UserRepository;
import com.sms.travelapp.service.AdminService;
import com.sms.travelapp.service.UserService;
import lombok.RequiredArgsConstructor;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageImpl;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Sort;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;

import java.util.stream.Collectors;


@Service
@RequiredArgsConstructor
public class AdminServiceImpl implements AdminService {
    private final UserRepository userRepository;
    private final PostRepository postRepository;
    private final PinRepository pinRepository;
    private final UserMapper userMapper;

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

    @Override
    public Page<UserResponseDto> getAdmins(String query, int pageNumber, int pageSize) {

        if(query.contains("-")){
            query = query.replace("-", " ");
        }

        String[] words = query.split(" ");

        PageRequest pageRequest = PageRequest.of(
                pageNumber,
                pageSize,
                Sort.by("firstName").ascending()
        );

        Page<UserEntity> users;
        if (words.length > 1) {
            users = userRepository.findAdminsByMultipleWords(words[0], words[1], pageRequest);
        } else {
            users = userRepository.findAdminsByMultipleWords(words[0], words[0], pageRequest);
        }

        return new PageImpl<>(
                users.getContent().stream().map(userMapper::mapToUserResponseDto).collect(Collectors.toList()),
                pageRequest,
                users.getTotalElements()
        );

    }
}
