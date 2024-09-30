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
    private Integer countryId;
    private String countryIso;
    private String countryName;
    private Long commentsCount;
    private boolean isLiked;
    private boolean isHearted;
    private String imageUrl;
    private Long authorId;
    private Long likes;
    private Long hearts;
    private Timestamp createdAt;
    private Timestamp lastUpdated;


}
