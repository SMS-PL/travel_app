package com.sms.travelapp.repository;

import com.sms.travelapp.model.*;
import jakarta.transaction.Transactional;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Modifying;
import org.springframework.data.jpa.repository.Query;

public interface CommentReactionRepository extends JpaRepository<CommentReaction,Long> {

    Boolean existsByAuthorAndComment(UserEntity author,Comment comment);
    CommentReaction findByAuthorAndComment(UserEntity author, Comment comment);

    @Modifying
    @Transactional
    @Query("DELETE FROM CommentReaction cr WHERE cr.comment.id = :commentId")
    void deleteByCommentId(Long commentId);

    @Modifying
    @Transactional
    @Query("DELETE FROM CommentReaction cr WHERE cr.comment.post.id = :postId")
    void deleteAllByComment_Post_Id(Long postId);
}
