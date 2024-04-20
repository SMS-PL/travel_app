package com.sms.travelapp.dto.Achievement;

import com.sms.travelapp.model.Country;
import jakarta.persistence.*;
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
    private int level;
    private Long userCount;
    private int type;
    private Country country;
    private Timestamp createdAt;
}
