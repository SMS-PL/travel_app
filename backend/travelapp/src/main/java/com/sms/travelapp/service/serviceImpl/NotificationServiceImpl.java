package com.sms.travelapp.service.serviceImpl;

import com.sms.travelapp.dto.ContentTypeGroupKey;
import com.sms.travelapp.dto.Notification.NotificationResponseDto;
import com.sms.travelapp.mapper.NotificationMapper;
import com.sms.travelapp.model.Notification;
import com.sms.travelapp.model.UserEntity;
import com.sms.travelapp.repository.NotificationRepository;
import com.sms.travelapp.service.AuthService;
import com.sms.travelapp.service.NotificationService;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;
import lombok.RequiredArgsConstructor;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageImpl;
import org.springframework.data.domain.PageRequest;
import org.springframework.stereotype.Service;

import java.util.Collections;
import java.util.LinkedHashMap;
import java.util.List;
import java.util.Map;
import java.util.stream.Collectors;


@Service
@RequiredArgsConstructor
public class NotificationServiceImpl implements NotificationService {

    private final NotificationRepository notificationRepository;
    private final NotificationMapper notificationMapper;
    private final AuthService authService;

    @Override
    public Notification createNotification(int type, Long authorId, Long receiverId, Long contentId) {

        if(notificationRepository.existsByAuthorIdAndAndContentIdAndType(authorId, contentId, type)) return null;

        Notification notification = new Notification();
        notification.setType(type);
        notification.setAuthorId(authorId);
        notification.setReceiverId(receiverId);
        notification.setContentId(contentId);
        return notificationRepository.save(notification);
    }

    @Override
    public Page<Map<String, Object>> getNotifications(int pageSize, int pageNumber) {
        UserEntity user = authService.getLoggedUser();
        Page<Notification> notificationPage =
                notificationRepository.findAllByReceiverId(user.getId(), PageRequest.of(pageNumber, pageSize));

        // Grupowanie powiadomień według contentId i type
        Map<ContentTypeGroupKey, List<NotificationResponseDto>> groupedNotifications = notificationPage.stream()
                .map(notificationMapper::mapToNotificationResponseDto)
                .collect(Collectors.groupingBy(
                        notification -> new ContentTypeGroupKey(notification.getContentId(), notification.getType())
                ));

        // preszktalcenie na  mapę na listę obiektów z czytelnym formatem JSON
        List<Map<String, Object>> result = groupedNotifications.entrySet().stream()
                .map(entry -> {
                    Map<String, Object> groupMap = new LinkedHashMap<>();
                    ContentTypeGroupKey key = entry.getKey();
                    groupMap.put("contentId", key.getContentId());
                    groupMap.put("type", key.getType());
                    groupMap.put("notifications", entry.getValue());
                    return groupMap;
                })
                .collect(Collectors.toList());

        // Przekształć wynik na stronę (Page)
        return new PageImpl<>(
                result,
                PageRequest.of(pageNumber, pageSize),
                notificationPage.getTotalElements()
        );
    }
}

