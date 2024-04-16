package com.sms.travelapp.repository;

import com.sms.travelapp.model.Post;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

import java.util.List;

public interface PostRepository extends JpaRepository<Post,Long> {

    List<Post> findAllByAuthorId(Long authorId);

    @Query("SELECT p FROM Post p WHERE p.authorId IN :friendIds")
    Page<Post> findAllByUserEntity_IdIn(List<Long> friendIds, Pageable pageable);
}
