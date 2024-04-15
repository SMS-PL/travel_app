package com.sms.travelapp.dto.Post;

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
    private String content;
    private Long countryId;
    private String imageUrl;
    private Long authorId;
    private Long likes;
    private Long hearts;
    private Timestamp createdAt;
    private Timestamp lastUpdated;
}
