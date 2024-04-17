package com.sms.travelapp.controller;


import com.sms.travelapp.dto.Achievement.AchievementResponseDto;
import com.sms.travelapp.dto.Comment.CommentResponseDto;
import com.sms.travelapp.service.UserAchievementService;
import jakarta.annotation.Nullable;
import lombok.RequiredArgsConstructor;
import org.springframework.data.domain.Page;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/v1/achievements")
@RequiredArgsConstructor
@CrossOrigin("*")
public class UserAchievementController {

    private final UserAchievementService userAchievementService;

    @GetMapping("/{userId}")
    public ResponseEntity<Page<AchievementResponseDto>> getUserAchievements(@PathVariable Long userId,
                                                                            @RequestParam int pageSize,
                                                                            @RequestParam int pageNumber){
        Page<AchievementResponseDto> res = userAchievementService.getUserAchievements(userId,pageSize,pageNumber);
        return ResponseEntity.status(HttpStatus.OK).body(res);
    }
}
