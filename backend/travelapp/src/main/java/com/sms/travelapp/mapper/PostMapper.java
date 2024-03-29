package com.sms.travelapp.mapper;


import com.sms.travelapp.dto.PostResponseDto;
import com.sms.travelapp.model.Post;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

@Service
@RequiredArgsConstructor
public class PostMapper {

    public static PostResponseDto mapToPostResponseDto(Post post){
        return PostResponseDto.builder()
                .id(post.getId())
                .authorId(post.getAuthorId())
                .countryId(post.getCountryId())
                .imageUrl(post.getImageUrl())
                .description(post.getContent())
                .createdAt(post.getCreatedAt())
                .lastUpdated(post.getLastUpdated())
                .build();
    }

}
