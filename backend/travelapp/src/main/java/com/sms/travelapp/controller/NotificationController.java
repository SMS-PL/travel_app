package com.sms.travelapp.controller;


import com.sms.travelapp.dto.ContentTypeGroupKey;
import com.sms.travelapp.dto.Notification.NotificationResponseDto;
import com.sms.travelapp.service.NotificationService;
import lombok.RequiredArgsConstructor;
import org.springframework.data.domain.Page;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Map;

@RestController
@RequestMapping("/api/v1/notifications")
@RequiredArgsConstructor
@CrossOrigin("*")
public class NotificationController {

    private final NotificationService notificationService;

    @GetMapping("/")
    public ResponseEntity<Page<Map<String, Object>>> getNotifications(@RequestParam int pageSize,
                                                                                                          @RequestParam int pageNumber){
        return ResponseEntity.ok(notificationService.getNotifications(pageSize,pageNumber));
    }
}
