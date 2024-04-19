package com.sms.travelapp.dto.Post;


import lombok.Builder;
import lombok.Data;

@Data
@Builder
public class PostReactionCountResponseDto {

    private Long like;
    private Long heart;
}
