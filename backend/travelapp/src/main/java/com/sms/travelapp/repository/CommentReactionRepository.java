package com.sms.travelapp.repository;

import com.sms.travelapp.model.*;
import org.springframework.data.jpa.repository.JpaRepository;

public interface CommentReactionRepository extends JpaRepository<CommentReaction,Long> {

    Boolean existsByAuthorAndComment(UserEntity author,Comment comment);
    CommentReaction findByAuthorAndComment(UserEntity author, Comment comment);
}
