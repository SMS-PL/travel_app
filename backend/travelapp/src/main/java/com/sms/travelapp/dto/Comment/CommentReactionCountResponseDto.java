package com.sms.travelapp.dto.Comment;

import lombok.Builder;
import lombok.Data;

@Data
@Builder
public class CommentReactionCountResponseDto {

    private Long reactionCount;
}
