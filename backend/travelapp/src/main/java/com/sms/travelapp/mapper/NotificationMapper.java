package com.sms.travelapp.mapper;


import com.sms.travelapp.dto.Notification.NotificationResponseDto;
import com.sms.travelapp.model.Notification;
import com.sms.travelapp.model.UserEntity;
import com.sms.travelapp.repository.UserRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

@Service
@RequiredArgsConstructor
public class NotificationMapper {
    private final UserRepository userRepository;

    public  NotificationResponseDto mapToNotificationResponseDto(Notification notification){

        UserEntity author = userRepository.findById(notification.getAuthorId()).orElseThrow();
        UserEntity receiver = userRepository.findById(notification.getReceiverId()).orElseThrow();

        return NotificationResponseDto.builder()
                .id(notification.getId())
                .type(notification.getType())
                .authorId(author.getId())
                .receiverId(receiver.getId())
                .contentId(notification.getContentId())
                .createdAt(notification.getCreatedAt())
                .build();
    }
}
