package com.sms.travelapp.repository;

import com.sms.travelapp.model.Post;
import com.sms.travelapp.model.PostReaction;
import com.sms.travelapp.model.UserEntity;
import jakarta.transaction.Transactional;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Modifying;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

public interface PostReactionRepository extends JpaRepository<PostReaction,Long> {
    Long countByReactionTypeAndPost_Id(int type, Long id);
    Boolean existsByAuthorAndPost(UserEntity author, Post post);
    PostReaction findByAuthorAndPost(UserEntity author, Post post);

    @Modifying
    @Transactional
    @Query("DELETE FROM PostReaction pr WHERE pr.post.id = :postId")
    void deleteByPostId(@Param("postId") Long postId);
}
