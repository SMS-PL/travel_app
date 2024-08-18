package com.sms.travelapp.service;

import com.sms.travelapp.dto.ContentTypeGroupKey;
import com.sms.travelapp.dto.Notification.NotificationResponseDto;
import com.sms.travelapp.model.Notification;
import org.springframework.data.domain.Page;
import org.springframework.http.ResponseEntity;

import java.util.List;
import java.util.Map;

public interface NotificationService {

    Notification createNotification(int type, Long userId,Long receiverId, Long contentId);

    Page<Map<String, Object>> getNotifications(int pageSize, int pageNumber);
}
