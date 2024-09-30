package com.sms.travelapp.mapper;


import com.sms.travelapp.dto.Comment.CommentReactionCountResponseDto;
import com.sms.travelapp.dto.Comment.CommentResponseDto;
import com.sms.travelapp.model.Comment;
import com.sms.travelapp.model.UserEntity;
import com.sms.travelapp.repository.CommentReactionRepository;
import com.sms.travelapp.service.AuthService;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

@Service
@RequiredArgsConstructor
public class CommentMapper {
    private final UserMapper userMapper;
    private final CommentReactionRepository commentReactionRepository;
    private final AuthService authService;

    public  CommentResponseDto MapToCommentResponseDto(Comment comment){
        UserEntity loggedUser = authService.getLoggedUser();
        boolean reacted = commentReactionRepository.existsByAuthorAndComment(loggedUser,comment);
        return CommentResponseDto.builder()
                .id(comment.getId())
                .author(userMapper.mapToUserResponseDto(comment.getAuthor()))
                .content(comment.getContent())
                .reactionCount(comment.getReactionCount()==null ? 0L : comment.getReactionCount())
                .createdAt(comment.getCreatedAt())
                .reacted(reacted)
                .lastUpdated(comment.getLastUpdated())
                .build();
    }

    public static CommentReactionCountResponseDto MapToCommentReactionCountResponseDto(Comment comment){
        return CommentReactionCountResponseDto.builder()
                .reactionCount(comment.getReactionCount())
                .build();
    }


}
