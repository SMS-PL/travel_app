package com.sms.travelapp.controller;


import com.sms.travelapp.dto.Comment.CommentResponseDto;
import com.sms.travelapp.service.CommentService;
import jakarta.annotation.Nullable;
import lombok.RequiredArgsConstructor;
import org.springframework.data.domain.Page;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("api/v1/comments")
@RequiredArgsConstructor
@CrossOrigin("*")
public class CommentController {

    private final CommentService commentService;

    @GetMapping("/{postId}")
    public ResponseEntity<Page<CommentResponseDto>> getCommentsByPostId(@PathVariable Long postId,
                                                                        @RequestParam int pageSize,
                                                                        @RequestParam int pageNumber,
                                                                        @RequestParam @Nullable String sortBy){
        return ResponseEntity.status(HttpStatus.OK).body(commentService.getCommentsByPostId(postId,pageSize,pageNumber,sortBy));
    }

}
