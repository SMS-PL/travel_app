package com.sms.travelapp.service.serviceImpl;

import com.sms.travelapp.dto.PostRequestDto;
import com.sms.travelapp.dto.PostResponseDto;
import com.sms.travelapp.exception.PostNotFound;
import com.sms.travelapp.mapper.PostMapper;
import com.sms.travelapp.model.Post;
import com.sms.travelapp.model.UserEntity;
import com.sms.travelapp.repository.PostRepository;
import com.sms.travelapp.repository.UserRepository;
import com.sms.travelapp.service.AuthService;
import com.sms.travelapp.service.PostService;
import lombok.RequiredArgsConstructor;
import org.springframework.data.crossstore.ChangeSetPersister;
import org.springframework.security.access.AccessDeniedException;
import org.springframework.security.config.annotation.web.AuthorizeRequestsDsl;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Objects;
import java.util.stream.Collectors;

@Service
@RequiredArgsConstructor
public class PostServiceImpl implements PostService {

    private final PostRepository postRepository;
    private final UserRepository userRepository;
    private final AuthService authService;
    @Override
    public List<PostResponseDto> getAllPosts() {
        return postRepository.findAll().stream().map(
                PostMapper::mapToPostResponseDto
        ).collect(Collectors.toList());
    }

    @Override
    public String createPost(PostRequestDto postDto) {
        Post post = new Post();
        if (postDto.getContent() == null || postDto.getContent().trim().isEmpty()) {
            throw new IllegalArgumentException("Content cannot be empty");
        }
        if (postDto.getImageUrl() == null || postDto.getImageUrl().trim().isEmpty()) {
            throw new IllegalArgumentException("ImageUrl cannot be empty");
        }
        if (postDto.getCountryId() == null) {
            //TODO check if country with given id exists
            throw new IllegalArgumentException("Country id cannot be empty");
        }

        UserEntity user = authService.getLoggedUser();

        post.setContent(postDto.getContent());
        post.setImageUrl(postDto.getImageUrl());
        post.setCountryId(postDto.getCountryId());
        post.setAuthorId(user.getId());
        postRepository.save(post);

        return "Post Created!";
    }

    @Override
    public String deletePost(Long id) {
        Post post = postRepository.findById(id).orElseThrow(
                ()-> new PostNotFound("Post not found"));

        UserEntity user = authService.getLoggedUser();

        if(!Objects.equals(post.getAuthorId(), user.getId())){
            throw new AccessDeniedException("You are not authorized to delete this post");
        }
        postRepository.deleteById(post.getId());
        return "Post id-"+ id +" deleted";
    }

    @Override
    public PostResponseDto updatePost(Long id,PostRequestDto postRequestDto) {
       UserEntity user = authService.getLoggedUser();
       Post postDb = postRepository.findById(id).orElseThrow(
               ()-> new PostNotFound("Post not found")
       );
       if(!postDb.getAuthorId().equals(user.getId())){
           throw new AccessDeniedException("You are not authorized to update this post");
       }

       if(postRequestDto.getContent() != null){
           postDb.setContent(postRequestDto.getContent());
       }

       postRepository.save(postDb);

        return PostMapper.mapToPostResponseDto(postDb);
    }

    @Override
    public PostResponseDto getPostById(Long id) {
        Post post = postRepository.findById(id).orElseThrow(
                ()-> new PostNotFound("Post not found")
        );
        return PostMapper.mapToPostResponseDto(post);
    }
}
