package com.sms.travelapp.dto.Comment;

import com.sms.travelapp.model.Post;
import com.sms.travelapp.model.UserEntity;
import jakarta.persistence.Column;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.ManyToOne;
import lombok.Data;
import org.hibernate.annotations.CreationTimestamp;
import org.hibernate.annotations.UpdateTimestamp;

import java.sql.Timestamp;

@Data
public class CommentRequestDto {
    private String content;
}
