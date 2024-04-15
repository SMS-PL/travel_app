package com.sms.travelapp.repository;

import com.sms.travelapp.model.Post;
import com.sms.travelapp.model.PostReaction;
import com.sms.travelapp.model.UserEntity;
import org.springframework.data.jpa.repository.JpaRepository;

public interface PostReactionRepository extends JpaRepository<PostReaction,Long> {
    Long countByReactionTypeAndPost_Id(int type, Long id);
    Boolean existsByAuthorAndPost(UserEntity author, Post post);
    PostReaction findByAuthorAndPost(UserEntity author, Post post);
}
