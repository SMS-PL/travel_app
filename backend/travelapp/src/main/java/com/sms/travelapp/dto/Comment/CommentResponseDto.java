package com.sms.travelapp.dto.Comment;

import com.sms.travelapp.dto.Auth.UserResponseDto;
import com.sms.travelapp.model.Comment;
import com.sms.travelapp.model.UserEntity;
import lombok.Builder;
import lombok.Data;

import java.sql.Timestamp;
import java.util.List;

@Data
@Builder
public class CommentResponseDto {
    private Long id;
    private String content;
    private UserResponseDto author;
    private Long reactionCount;
    private Timestamp createdAt;
    private Timestamp lastUpdated;
    private boolean reacted;
}