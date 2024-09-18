package com.sms.travelapp.mapper;


import com.sms.travelapp.dto.Comment.CommentReactionCountResponseDto;
import com.sms.travelapp.dto.Comment.CommentResponseDto;
import com.sms.travelapp.model.Comment;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

@Service
@RequiredArgsConstructor
public class CommentMapper {
    private final UserMapper userMapper;

    public  CommentResponseDto MapToCommentResponseDto(Comment comment){
        return CommentResponseDto.builder()
                .id(comment.getId())
                .author(userMapper.mapToUserResponseDto(comment.getAuthor()))
                .content(comment.getContent())
                .reactionCount(comment.getReactionCount()==null ? 0L : comment.getReactionCount())
                .createdAt(comment.getCreatedAt())
                .lastUpdated(comment.getLastUpdated())
                .build();
    }

    public static CommentReactionCountResponseDto MapToCommentReactionCountResponseDto(Comment comment){
        return CommentReactionCountResponseDto.builder()
                .reactionCount(comment.getReactionCount())
                .build();
    }


}
