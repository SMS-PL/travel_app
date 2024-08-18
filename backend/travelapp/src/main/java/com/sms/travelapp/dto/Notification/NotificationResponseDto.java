package com.sms.travelapp.dto.Notification;


import com.sms.travelapp.dto.Auth.UserResponseDto;
import com.sms.travelapp.model.UserEntity;
import jakarta.persistence.Column;
import lombok.Builder;
import lombok.Data;
import org.hibernate.annotations.CreationTimestamp;

import java.sql.Timestamp;

@Data
@Builder
public class NotificationResponseDto {

    private Long id;
    private Long authorId;
    private Long receiverId;
    private int type;
    private Long contentId;
    private boolean isRead;
    private Timestamp createdAt;
}
