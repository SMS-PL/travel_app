package com.sms.travelapp.dto;

import jakarta.persistence.Column;
import lombok.Builder;
import lombok.Data;
import org.hibernate.annotations.CreationTimestamp;
import org.hibernate.annotations.UpdateTimestamp;

import java.sql.Timestamp;

@Data
@Builder
public class PostResponseDto {
    private Long id;
    private String description;
    private Long countryId;
    private String imageUrl;
    private Long authorId;
    private Timestamp createdAt;
    private Timestamp lastUpdated;
}
