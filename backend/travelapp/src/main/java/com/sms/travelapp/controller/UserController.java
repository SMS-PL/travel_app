package com.sms.travelapp.controller;


import com.sms.travelapp.dto.Auth.UserResponseDto;
import com.sms.travelapp.dto.User.UserRequestPayload;
import com.sms.travelapp.service.UserService;
import lombok.RequiredArgsConstructor;
import org.apache.catalina.User;
import org.springframework.data.domain.Page;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
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

    @GetMapping("/search/{query}")
    public ResponseEntity<Page<UserResponseDto>> searchForUsers(@PathVariable String query,
                                                                       @RequestParam int pageNumber, @RequestParam int pageSize){
        Page<UserResponseDto> res = userService.searchForUser(query,pageNumber,pageSize);
        return ResponseEntity.status(HttpStatus.OK).body(res);
    }

    @PatchMapping("/{id}")
    public ResponseEntity<UserResponseDto> updateUser(@PathVariable Long id, @RequestBody UserRequestPayload userRequestPayload){
        UserResponseDto updatedUser = userService.updateUser(id, userRequestPayload);
        return ResponseEntity.status(HttpStatus.OK).body(updatedUser);
    }


    @PreAuthorize("hasRole('ADMIN')")
    @PostMapping("/{id}/ban/{days}")
    public ResponseEntity<UserResponseDto> banUser(@PathVariable Long id, @PathVariable int days){
        UserResponseDto bannedUser = userService.banUser(id,days);
        return ResponseEntity.status(HttpStatus.OK).body(bannedUser);
    }

    @PreAuthorize("hasRole('ADMIN')")
    @PostMapping("/{id}/unban")
    public ResponseEntity<UserResponseDto> unbanUser(@PathVariable Long id){
        UserResponseDto bannedUser = userService.unbanUser(id);
        return ResponseEntity.status(HttpStatus.OK).body(bannedUser);
    }


}
