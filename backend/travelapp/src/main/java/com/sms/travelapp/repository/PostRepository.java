package com.sms.travelapp.repository;

import com.sms.travelapp.model.Post;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface PostRepository extends JpaRepository<Post,Long> {

    List<Post> findAllByAuthorId(Long authorId);


}
