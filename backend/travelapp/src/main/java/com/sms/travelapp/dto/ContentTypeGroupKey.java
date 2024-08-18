package com.sms.travelapp.dto;

import com.sms.travelapp.dto.Notification.NotificationResponseDto;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.util.List;

@Data
@AllArgsConstructor
@NoArgsConstructor
public class ContentTypeGroupKey {
    private Long contentId;
    private int type;
}