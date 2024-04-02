package com.sms.travelapp.config.security;


import com.sms.travelapp.exception.EmailNotFound;
import com.sms.travelapp.model.Role;
import com.sms.travelapp.model.UserEntity;
import com.sms.travelapp.repository.UserRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.security.core.GrantedAuthority;
import org.springframework.security.core.authority.SimpleGrantedAuthority;
import org.springframework.security.core.userdetails.User;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.stereotype.Service;

import java.util.Collection;
import java.util.List;
import java.util.stream.Collectors;

@Service
@RequiredArgsConstructor
public class CustomUserDetailsService implements UserDetailsService {

    private final UserRepository userRepository;
    @Override
    public UserDetails loadUserByUsername(String email) throws EmailNotFound {
        UserEntity userEntity = userRepository.findByEmail(email).orElseThrow(
                () -> new EmailNotFound("Email not found")
        );
        return new User(userEntity.getEmail(),
                userEntity.getPassword(),
                mapRolesToAuthorities(userEntity.getRoles())
        );
    }

    private Collection<GrantedAuthority> mapRolesToAuthorities(List<Role> roles){
        return roles.stream().map(role -> new SimpleGrantedAuthority(role.getName())).collect(Collectors.toList());
    }
}
