package com.sms.travelapp.mapper;


import com.sms.travelapp.dto.Comment.CommentResponseDto;
import com.sms.travelapp.model.Comment;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

@Service
@RequiredArgsConstructor
public class CommentMapper {

    public static CommentResponseDto MapToCommentResponseDto(Comment comment){
        return CommentResponseDto.builder()
                .id(comment.getId())
                .author(UserMapper.mapToUserResponseDto(comment.getAuthor()))
                .content(comment.getContent())
                .createdAt(comment.getCreatedAt())
                .lastUpdated(comment.getLastUpdated())
                .build();
    }


}
