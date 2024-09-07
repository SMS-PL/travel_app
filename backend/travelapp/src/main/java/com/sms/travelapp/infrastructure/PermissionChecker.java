package com.sms.travelapp.infrastructure;

import com.sms.travelapp.model.Role;
import com.sms.travelapp.service.UserService;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
@RequiredArgsConstructor
public class PermissionChecker {
    private final UserService userService;

    public boolean isAdmin(Long userId){
        List<String> roleNames = userService.getUserById(userId).getRoles().stream()
                .map(Role::getName)
                .toList();
        return roleNames.contains("ROLE_ADMIN");
    }


}
