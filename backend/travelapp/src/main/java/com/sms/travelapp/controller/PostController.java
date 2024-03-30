package com.sms.travelapp.controller;

import com.sms.travelapp.dto.PostRequestDto;
import com.sms.travelapp.dto.PostResponseDto;
import com.sms.travelapp.mapper.StringResponseMapper;
import com.sms.travelapp.service.PostService;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.HashMap;
import java.util.List;
import java.util.Map;

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

    @PostMapping("/")
    public ResponseEntity<Map<String,String>> createPost(@Valid @RequestBody PostRequestDto postDto){
        String res = postService.createPost(postDto);
        return ResponseEntity.status(HttpStatus.CREATED)
                .body(StringResponseMapper.mapToMap(res));
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Map<String,String>> deletePost(@PathVariable Long id){
        String res = postService.deletePost(id);
        return ResponseEntity.status(HttpStatus.OK)
                .body(StringResponseMapper.mapToMap(res));
    }
}
