package com.sms.travelapp.service;

import com.sms.travelapp.dto.Post.PostReactionCountResponseDto;
import com.sms.travelapp.dto.Post.PostRequestDto;
import com.sms.travelapp.dto.Post.PostResponseDto;

import java.util.List;

public interface PostService {

    List<PostResponseDto> getAllPosts();

    String createPost(PostRequestDto postDto);

    String deletePost(Long id);

    PostResponseDto updatePost(Long id,PostRequestDto postResponseDto);

    PostResponseDto getPostById(Long id);

    PostReactionCountResponseDto reactToPost(Long id, int reactionType);
}
