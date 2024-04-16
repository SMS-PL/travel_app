package com.sms.travelapp.controller;


import com.sms.travelapp.dto.Comment.CommentRequestDto;
import com.sms.travelapp.dto.Comment.CommentResponseDto;
import com.sms.travelapp.service.CommentService;
import jakarta.annotation.Nullable;
import lombok.RequiredArgsConstructor;
import org.springframework.data.domain.Page;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.Map;

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
        Page<CommentResponseDto> res = commentService.getCommentsByPostId(postId,pageSize,pageNumber,sortBy);
        return ResponseEntity.status(HttpStatus.OK).body(res);
    }

    @PostMapping("/{postId}")
    public ResponseEntity<CommentResponseDto> addComment(@PathVariable Long postId, @RequestBody CommentRequestDto commentRequestDto){
        CommentResponseDto res = commentService.addComment(postId, commentRequestDto);

        return ResponseEntity.status(HttpStatus.OK).body(res);
    }

    @DeleteMapping("/{commentId}")
    public ResponseEntity<Map<String,String>> removeComment(@PathVariable Long commentId){
        Map<String,String> res = commentService.removeComment(commentId);

        return ResponseEntity.status(HttpStatus.OK).body(res);
    }

}
