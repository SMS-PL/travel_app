package com.sms.travelapp.service.serviceImpl;

import com.sms.travelapp.dto.PostRequestDto;
import com.sms.travelapp.dto.PostResponseDto;
import com.sms.travelapp.mapper.PostMapper;
import com.sms.travelapp.model.Post;
import com.sms.travelapp.model.UserEntity;
import com.sms.travelapp.repository.PostRepository;
import com.sms.travelapp.repository.UserRepository;
import com.sms.travelapp.service.PostService;
import lombok.RequiredArgsConstructor;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.stream.Collectors;

@Service
@RequiredArgsConstructor
public class PostServiceImpl implements PostService {

    private final PostRepository postRepository;
    private final UserRepository userRepository;
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

        String username =
                SecurityContextHolder.getContext().getAuthentication().getName();
        UserEntity user = userRepository.findByUsername(username).orElseThrow(
                ()-> new UsernameNotFoundException("User not found"));

        post.setAuthorId(user.getId());
        postRepository.save(post);

        return "Post Created!";
    }
}
