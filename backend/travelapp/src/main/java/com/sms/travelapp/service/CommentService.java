package com.sms.travelapp.service;

import com.sms.travelapp.dto.Comment.CommentRequestDto;
import com.sms.travelapp.dto.Comment.CommentResponseDto;
import org.springframework.data.domain.Page;

import java.util.Map;

public interface CommentService {
    Page<CommentResponseDto> getCommentsByPostId(Long postId, int pageSize, int pageNumber, String sortBy);

    CommentResponseDto addComment(Long postId, CommentRequestDto commentRequestDto);

    Map<String, String> removeComment(Long commentId);

    CommentResponseDto editComment(Long commentId, CommentRequestDto commentRequestDto);
}
