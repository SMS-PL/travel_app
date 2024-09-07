package com.sms.travelapp.dto.Auth;

import com.sms.travelapp.model.Role;
import lombok.Builder;
import lombok.Data;

import java.sql.Timestamp;
import java.util.List;

@Data
@Builder
public class UserResponseDto {
    private Long id;
    private String firstName;
    private String lastName;
    private String username;
    private String email;
    private String about;
    private String photoUrl;
    private String backgroundUrl;
    private Timestamp createdAt;
    private boolean isBanned;
    private Timestamp bannedTo;
    private List<Role> roles;
}
