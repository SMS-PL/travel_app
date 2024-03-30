package com.sms.travelapp.service.serviceImpl;

import com.sms.travelapp.model.UserEntity;
import com.sms.travelapp.repository.UserRepository;
import com.sms.travelapp.service.AuthService;
import lombok.RequiredArgsConstructor;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.stereotype.Service;

@Service
@RequiredArgsConstructor
public class AuthServiceImpl implements AuthService {

    private final UserRepository userRepository;
    @Override
    public UserEntity getLoggedUser() {
        String username =
                SecurityContextHolder.getContext().getAuthentication().getName();
        UserEntity user = userRepository.findByUsername(username).orElseThrow(
                ()-> new UsernameNotFoundException("User not found"));
        return user;
    }
}
