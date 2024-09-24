package com.sms.travelapp.controller;


import com.sms.travelapp.dto.Admin.StatsDto;
import com.sms.travelapp.dto.Auth.UserResponseDto;
import com.sms.travelapp.model.UserEntity;
import com.sms.travelapp.service.AdminService;
import lombok.RequiredArgsConstructor;
import org.springframework.data.domain.Page;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.*;

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

    @PreAuthorize("hasRole('ROLE_ADMIN')")
    @GetMapping("/admins")
    public ResponseEntity<Page<UserResponseDto>> getAdmins(@RequestParam String query,
                                                           @RequestParam int pageNumber, @RequestParam int pageSize){
        return ResponseEntity.status(HttpStatus.OK).body(adminService.getAdmins(query,pageNumber,pageSize));
    }
}
