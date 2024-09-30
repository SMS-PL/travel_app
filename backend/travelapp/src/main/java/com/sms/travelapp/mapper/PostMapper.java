package com.sms.travelapp.mapper;


import com.sms.travelapp.dto.Post.PostResponseDto;
import com.sms.travelapp.model.Country;
import com.sms.travelapp.model.Post;
import com.sms.travelapp.model.PostReaction;
import com.sms.travelapp.model.UserEntity;
import com.sms.travelapp.repository.CommentRepository;
import com.sms.travelapp.repository.CountryRepository;
import com.sms.travelapp.repository.PostReactionRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

@Service
@RequiredArgsConstructor
public class PostMapper {
    private final CountryRepository countryRepository;
    private final CommentRepository commentRepository;
    private final PostReactionRepository postReactionRepository;

    public  PostResponseDto mapToPostResponseDto(Post post){

        Country country = countryRepository.findById(post.getCountryId()).orElseThrow();
        Long commentsCount = commentRepository.countByPost_Id(post.getId());

        return PostResponseDto.builder()
                .id(post.getId())
                .authorId(post.getAuthorId())
                .countryId(post.getCountryId())
                .imageUrl(post.getImageUrl())
                .countryIso(country.getIso())
                .countryName(country.getName())
                .commentsCount(commentsCount)
                .likes(post.getLikeCount())
                .hearts(post.getHeartCount())
                .content(post.getContent())
                .createdAt(post.getCreatedAt())
                .lastUpdated(post.getLastUpdated())
                .build();
    }

    public  PostResponseDto mapToPostResponseDto(Post post, UserEntity loggedInUser){

        boolean isLiked = false;
        boolean isHearted = false;
        PostReaction postReaction = postReactionRepository.findByAuthorAndPost(loggedInUser, post);
        if (postReaction != null) {
            isLiked = postReaction.getReactionType() == 0;
            isHearted = postReaction.getReactionType() == 1;
        }

        PostResponseDto postResponseDto = mapToPostResponseDto(post);
        postResponseDto.setHearted(isHearted);
        postResponseDto.setLiked(isLiked);

        return postResponseDto;

    }

}
