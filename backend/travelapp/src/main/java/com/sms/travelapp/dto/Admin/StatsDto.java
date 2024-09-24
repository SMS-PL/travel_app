package com.sms.travelapp.dto.Admin;


import lombok.Builder;
import lombok.Data;

@Data
@Builder
public class StatsDto {

    private Long userCount;
    private Long postCount;
    private Long pinCount;
    private Long bannedUserCount;
}
