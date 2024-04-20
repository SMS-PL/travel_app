package com.sms.travelapp.dto.Achievement;


import lombok.Builder;
import lombok.Data;

import java.sql.Timestamp;

@Data
@Builder
public class UserAchievementResponseDto {

    private Long id;
    private String title;
    private String description;
    private String icon;
    private Long count;
    private int type;
    private int level;
    private Timestamp grantedAt;
}
