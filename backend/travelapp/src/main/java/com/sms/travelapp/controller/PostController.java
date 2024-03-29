package com.sms.travelapp.controller;

import com.sms.travelapp.dto.PostResponseDto;
import com.sms.travelapp.service.PostService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;

@RestController
@RequestMapping("/api/v1/posts")
@RequiredArgsConstructor
@CrossOrigin("*")
public class PostController {

    private final PostService postService;

    @GetMapping("/")
    public ResponseEntity<List<PostResponseDto>> getAllPosts(){
        System.out.println("Hello");
        List<PostResponseDto> posts = postService.getAllPosts();
        return ResponseEntity.status(HttpStatus.OK).body(posts);
    }
}
