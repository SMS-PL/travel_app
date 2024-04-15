package com.sms.travelapp.service.serviceImpl;

import com.sms.travelapp.dto.Comment.CommentResponseDto;
import com.sms.travelapp.mapper.CommentMapper;
import com.sms.travelapp.model.Comment;
import com.sms.travelapp.repository.CommentRepository;
import com.sms.travelapp.service.CommentService;
import lombok.RequiredArgsConstructor;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageImpl;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Sort;
import org.springframework.stereotype.Service;

import java.util.Objects;
import java.util.stream.Collectors;


@Service
@RequiredArgsConstructor
public class CommentServiceImpl implements CommentService {

    private final CommentRepository commentRepository;

    @Override
    public Page<CommentResponseDto> getCommentsByPostId(Long postId, int pageSize, int pageNumber, String sortBy) {
        Sort sort = Sort.by("createdAt").descending();
        if(Objects.equals(sortBy, "dateAsc")){
            sort = Sort.by("createdAt").ascending();
        }else if(Objects.equals(sortBy, "reactionAsc")){
            sort = Sort.by("reactionCount").ascending();
        } else if (Objects.equals(sortBy, "reactionDesc")) {
            sort = Sort.by("reactionCount").descending();
        }

        Page<Comment> commentPage = commentRepository.findAllByPost_Id(postId, PageRequest.of(pageNumber,pageSize,sort));

        return new PageImpl<>(
                commentPage
                        .stream()
                        .map(CommentMapper::MapToCommentResponseDto)
                        .collect(Collectors.toList()),PageRequest.of(pageNumber,pageSize,sort),
                commentPage.getTotalElements()
        );

    }
}
