package com.sms.travelapp.controller;


import com.sms.travelapp.dto.Achievement.AchievementResponseDto;
import com.sms.travelapp.dto.Achievement.UserAchievementResponseDto;
import com.sms.travelapp.service.AchievementService;
import com.sms.travelapp.service.UserAchievementService;
import lombok.RequiredArgsConstructor;
import org.springframework.data.domain.Page;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/v1/achievements")
@RequiredArgsConstructor
@CrossOrigin("*")
public class AchievementController {

    private final UserAchievementService userAchievementService;
    private final AchievementService achievementService;

    @GetMapping("/{userId}")
    public ResponseEntity<Page<UserAchievementResponseDto>> getUserAchievements(@PathVariable Long userId,
                                                                                @RequestParam int pageSize,
                                                                                @RequestParam int pageNumber){
        Page<UserAchievementResponseDto> res = userAchievementService.getUserAchievements(userId,pageSize,pageNumber);
        return ResponseEntity.status(HttpStatus.OK).body(res);
    }

    @GetMapping("/")
    public ResponseEntity<Page<AchievementResponseDto>> getAllAchievementsByLevel(@RequestParam int level,
                                                                            @RequestParam int pageSize,
                                                                            @RequestParam int pageNumber){
        Page<AchievementResponseDto> res = achievementService.getAllAchievementsByLevel(level,pageSize,pageNumber);
        return ResponseEntity.status(HttpStatus.OK).body(res);
    }
}
