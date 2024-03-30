package com.sms.travelapp.service;

import com.sms.travelapp.dto.PostRequestDto;
import com.sms.travelapp.dto.PostResponseDto;

import java.util.List;

public interface PostService {

    List<PostResponseDto> getAllPosts();

    String createPost(PostRequestDto postDto);

    String deletePost(Long id);

    PostResponseDto updatePost(Long id,PostRequestDto postResponseDto);
}
