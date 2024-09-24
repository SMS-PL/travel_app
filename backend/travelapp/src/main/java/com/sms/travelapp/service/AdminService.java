package com.sms.travelapp.service;

import com.sms.travelapp.dto.Admin.StatsDto;
import com.sms.travelapp.dto.Auth.UserResponseDto;
import com.sms.travelapp.model.UserEntity;
import org.springframework.data.domain.Page;
import org.springframework.http.ResponseEntity;

public interface AdminService {
    StatsDto getDashboardStats();

    Page<UserResponseDto> getAdmins(String query, int pageNumber, int pageSize);
}
