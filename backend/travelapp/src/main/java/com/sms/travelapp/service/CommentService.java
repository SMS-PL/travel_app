package com.sms.travelapp.service;

import com.sms.travelapp.dto.Comment.CommentRequestDto;
import com.sms.travelapp.dto.Comment.CommentResponseDto;
import org.springframework.data.domain.Page;

public interface CommentService {
    Page<CommentResponseDto> getCommentsByPostId(Long postId, int pageSize, int pageNumber, String sortBy);

    CommentResponseDto addComment(Long postId, CommentRequestDto commentRequestDto);
}
