package com.sms.travelapp.controller;


import com.sms.travelapp.dto.Auth.UserResponseDto;
import com.sms.travelapp.service.UserService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/v1/users")
@RequiredArgsConstructor
@CrossOrigin("*")
public class UserController {

    private final UserService userService;

    @GetMapping("/{id}")
    public ResponseEntity<UserResponseDto> getUserById(@PathVariable Long id){
        UserResponseDto user = userService.getUserProfileById(id);
        return ResponseEntity.status(HttpStatus.OK).body(user);
    }


}
