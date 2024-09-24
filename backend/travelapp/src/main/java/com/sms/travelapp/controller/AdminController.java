package com.sms.travelapp.controller;


import com.sms.travelapp.dto.Admin.StatsDto;
import com.sms.travelapp.service.AdminService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/api/v1/admin")
@RequiredArgsConstructor
@CrossOrigin("*")
public class AdminController {
    private final AdminService adminService;

    @PreAuthorize("hasRole('ROLE_ADMIN')")
    @GetMapping("/dashboard-stats")
    public ResponseEntity<StatsDto> getDashboardStats(){
        return ResponseEntity.status(HttpStatus.OK).body(adminService.getDashboardStats());
    }
}
