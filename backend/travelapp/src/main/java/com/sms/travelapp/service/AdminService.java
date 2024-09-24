package com.sms.travelapp.service;

import com.sms.travelapp.dto.Admin.StatsDto;
import org.springframework.http.ResponseEntity;

public interface AdminService {
    StatsDto getDashboardStats();
}
