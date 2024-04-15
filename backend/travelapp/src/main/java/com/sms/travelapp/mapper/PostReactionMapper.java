package com.sms.travelapp.mapper;

import com.sms.travelapp.dto.Post.PostReactionCountResponseDto;
import com.sms.travelapp.model.Post;
import com.sms.travelapp.model.PostReaction;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

@Service
@RequiredArgsConstructor
public class PostReactionMapper {

    public static PostReactionCountResponseDto mapToPostReactionCountResponseDto(PostReaction postReaction){
        return PostReactionCountResponseDto.builder()
                .like(postReaction.getPost().getLikeCount())
                .love(postReaction.getPost().getHeartCount())
                .build();
    }
}
