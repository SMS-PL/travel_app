package com.sms.travelapp.dto;

import lombok.Data;

import java.sql.Timestamp;

@Data
public class PostRequestDto {
    private String content;
    private Long countryId;
    private String imageUrl;
    private Long authorId;
}
