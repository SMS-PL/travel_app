package com.sms.travelapp.infrastructure;

import com.sms.travelapp.model.Role;
import com.sms.travelapp.model.UserEntity;
import com.sms.travelapp.service.UserService;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
@RequiredArgsConstructor
public class PermissionChecker {
    private final UserService userService;

    public boolean isAdmin(Long userId){
        UserEntity loggedUser = userService.getUserById(userId);
        return loggedUser.getRoles()
                .stream()
                .anyMatch(role -> role.getName().equals("ROLE_ADMIN"));
    }


}
