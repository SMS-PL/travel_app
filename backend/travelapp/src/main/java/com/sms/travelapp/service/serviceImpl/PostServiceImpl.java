package com.sms.travelapp.service.serviceImpl;

import com.sms.travelapp.dto.PostResponseDto;
import com.sms.travelapp.mapper.PostMapper;
import com.sms.travelapp.repository.PostRepository;
import com.sms.travelapp.service.PostService;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.stream.Collectors;

@Service
@RequiredArgsConstructor
public class PostServiceImpl implements PostService {

    private final PostRepository postRepository;

    @Override
    public List<PostResponseDto> getAllPosts() {
        return postRepository.findAll().stream().map(
                PostMapper::mapToPostResponseDto
        ).collect(Collectors.toList());
    }
}
