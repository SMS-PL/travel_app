package com.sms.travelapp.controller;

import com.sms.travelapp.dto.PostRequestDto;
import com.sms.travelapp.dto.PostResponseDto;
import com.sms.travelapp.mapper.StringResponseMapper;
import com.sms.travelapp.service.PostService;
import jakarta.validation.Valid;
import jakarta.websocket.MessageHandler;
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
        List<PostResponseDto> posts = postService.getAllPosts();
        return ResponseEntity.status(HttpStatus.OK).body(posts);
    }

    @GetMapping("/{id}")
    public ResponseEntity<PostResponseDto> getPostById(@PathVariable Long id){
        PostResponseDto res = postService.getPostById(id);
        return ResponseEntity.status(HttpStatus.OK).body(res);
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

    @PatchMapping("/{id}")
    public ResponseEntity<PostResponseDto> updatePost(@PathVariable Long id,
                                                      @RequestBody PostRequestDto postRequestDto){
        PostResponseDto updatedPost = postService.updatePost(id,postRequestDto);
        return ResponseEntity.status(HttpStatus.OK).body(updatedPost);
    }

}
