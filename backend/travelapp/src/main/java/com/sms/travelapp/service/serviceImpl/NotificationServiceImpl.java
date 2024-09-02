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

import java.sql.Timestamp;
import java.time.Instant;
import java.util.*;
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
        if(authorId.equals(receiverId)) return null;

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
        List<Notification> allNotifications = notificationRepository.findAllByReceiverIdOrderByCreatedAtDesc(user.getId());

        Map<ContentTypeGroupKey, List<NotificationResponseDto>> groupedNotifications = allNotifications.stream()
                .map(notificationMapper::mapToNotificationResponseDto)
                .collect(Collectors.groupingBy(
                        notification -> new ContentTypeGroupKey(notification.getContentId(), notification.getType())
                ));

        List<Map<String, Object>> result = groupedNotifications.entrySet().stream()
                .map(entry -> {
                    Map<String, Object> groupMap = new LinkedHashMap<>();
                    ContentTypeGroupKey key = entry.getKey();
                    groupMap.put("contentId", key.getContentId());
                    groupMap.put("type", key.getType());
                    groupMap.put("notifications", entry.getValue());

                    Timestamp latestCreatedAt = entry.getValue().stream()
                            .map(NotificationResponseDto::getCreatedAt)
                            .max(Comparator.naturalOrder())
                            .orElse(Timestamp.from(Instant.MIN));

                    groupMap.put("latestCreatedAt", latestCreatedAt);
                    return groupMap;
                })
                .sorted((group1, group2) -> {
                    Timestamp createdAt1 = (Timestamp) group1.get("latestCreatedAt");
                    Timestamp createdAt2 = (Timestamp) group2.get("latestCreatedAt");
                    return createdAt2.compareTo(createdAt1);
                })
                .collect(Collectors.toList());

        int start = pageNumber * pageSize;
        if (start >= result.size()) {
            return new PageImpl<>(
                    Collections.emptyList(),
                    PageRequest.of(pageNumber, pageSize),
                    result.size()
            );
        }
        int end = Math.min(start + pageSize, result.size());
        List<Map<String, Object>> paginatedResult = result.subList(start, end);

        return new PageImpl<>(
                paginatedResult,
                PageRequest.of(pageNumber, pageSize),
                result.size()
        );
    }






//    @Override
//    public Page<Map<String, Object>> getNotifications(int pageSize, int pageNumber) {
//        UserEntity user = authService.getLoggedUser();
//        Page<Notification> notificationPage = notificationRepository.findAllByReceiverIdOrderByCreatedAtDesc(user.getId(), PageRequest.of(pageNumber, pageSize));
//
//        // Grupowanie powiadomień według contentId i type
//        Map<ContentTypeGroupKey, List<NotificationResponseDto>> groupedNotifications = notificationPage.stream()
//                .map(notificationMapper::mapToNotificationResponseDto)
//                .collect(Collectors.groupingBy(
//                        notification -> new ContentTypeGroupKey(notification.getContentId(), notification.getType())
//                ));
//
//        // Przekształcenie na mapę na listę obiektów z czytelnym formatem JSON
//        List<Map<String, Object>> result = groupedNotifications.entrySet().stream()
//                .map(entry -> {
//                    Map<String, Object> groupMap = new LinkedHashMap<>();
//                    ContentTypeGroupKey key = entry.getKey();
//                    groupMap.put("contentId", key.getContentId());
//                    groupMap.put("type", key.getType());
//                    groupMap.put("notifications", entry.getValue());
//
//                    // Znalezienie najnowszej daty "createdAt" dla tej grupy
//                    Timestamp latestCreatedAt = entry.getValue().stream()
//                            .map(NotificationResponseDto::getCreatedAt)
//                            .max(Comparator.naturalOrder())
//                            .orElse(Timestamp.from(Instant.MIN));
//
//                    groupMap.put("latestCreatedAt", latestCreatedAt);
//                    return groupMap;
//                })
//                // Sortowanie według najnowszej daty "createdAt"
//                .sorted((group1, group2) -> {
//                    Timestamp createdAt1 = (Timestamp) group1.get("latestCreatedAt");
//                    Timestamp createdAt2 = (Timestamp) group2.get("latestCreatedAt");
//                    return createdAt2.compareTo(createdAt1);
//                })
//                .collect(Collectors.toList());
//
//        return new PageImpl<>(
//                result,
//                PageRequest.of(pageNumber, pageSize),
//                notificationPage.getTotalElements()
//        );
//    }


}

