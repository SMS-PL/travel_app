package com.sms.travelapp.dto.Achievement;


import jakarta.persistence.Column;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import lombok.Builder;
import lombok.Data;
import org.hibernate.annotations.CreationTimestamp;
import org.hibernate.annotations.UpdateTimestamp;

import java.sql.Timestamp;

@Data
@Builder
public class AchievementResponseDto {

    private Long id;
    private String title;
    private String description;
    private String icon;
    private Long count;
    private int type;
    private int level;
    private Timestamp grantedAt;
}
